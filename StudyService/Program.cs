using StudyService.Models;
using StudyService.Services;
using StudyService.Data;
using StudyService.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

var isDevelopment = builder.Environment.IsDevelopment();

// Configure SQLite database with environment-based settings
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var enableSensitiveDataLogging = builder.Configuration.GetValue<bool>("Database:EnableSensitiveDataLogging", false);
var enableDetailedErrors = builder.Configuration.GetValue<bool>("Database:EnableDetailedErrors", false);

builder.Services.AddDbContext<StudyDbContext>(options =>
{
    options.UseSqlite(connectionString);
    
    if (enableSensitiveDataLogging)
    {
        options.EnableSensitiveDataLogging();
    }
    
    if (enableDetailedErrors)
    {
        options.EnableDetailedErrors();
    }
});

// CORS configuration for local dev and production
builder.Services.AddCors(options =>
{
    if (isDevelopment)
    {
        // Local development: allow any origin for flexibility
        options.AddPolicy("AllowLocal", policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    }
    else
    {
        // Production: restrict to specific origins
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? Array.Empty<string>();
        
        options.AddPolicy("AllowProduction", policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    }
});

// DI
builder.Services.AddScoped<IStudyRepository, EfCoreStudyRepository>();
builder.Services.AddScoped<IStudyService, StudyService.Services.StudyService>();

var app = builder.Build();

// Log database configuration (development only)
if (isDevelopment)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    var dbPath = connectionString.Replace("Data Source=", "");
    logger.LogInformation("Database connection configured: SQLite at {Path}", dbPath);
}

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<StudyDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        
        logger.LogInformation("Applying database migrations...");
        dbContext.Database.Migrate();
        logger.LogInformation("Database migrations applied successfully.");
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Failed to apply database migrations. The application will continue but database operations may fail.");
        // Don't throw - allow the app to start even if migrations fail
        // This allows for manual intervention or retry
    }
}

// Apply CORS based on environment
if (isDevelopment)
{
    app.UseCors("AllowLocal");
}
else
{
    app.UseCors("AllowProduction");
}

// Health check
app.MapGet("/health", () => Results.Ok(new { ok = true }));

// Record an answer (correct/incorrect) with validation
app.MapPost("/study/answer", async (StudyAnswerRequest req, IStudyService studyService) =>
{
    // Validate IDs are positive (required fields)
    if (req.userId <= 0)
    {
        return Results.BadRequest(new { error = "UserId must be a positive integer" });
    }
    
    if (req.deckId <= 0)
    {
        return Results.BadRequest(new { error = "DeckId must be a positive integer" });
    }
    
    if (req.cardId <= 0)
    {
        return Results.BadRequest(new { error = "CardId must be a positive integer" });
    }

    // Normalize answeredAtUtc to UTC (convert if needed, default to UtcNow if null)
    var normalizedRequest = req with 
    { 
        answeredAtUtc = DateTimeHelper.NormalizeToUtc(req.answeredAtUtc)
    };

    var result = await studyService.RecordAnswerAsync(normalizedRequest);
    return Results.Ok(result);
});

// Get stats (daily/weekly/monthly) with validation
app.MapGet("/study/stats", async (string range, bool? includeTotals, int? userId, int? deckId, IStudyService studyService) =>
{
    // Strictly validate range parameter
    var validRanges = new[] { "daily", "weekly", "monthly" };
    if (string.IsNullOrWhiteSpace(range) || 
        !validRanges.Contains(range.ToLowerInvariant()))
    {
        return Results.BadRequest(new 
        { 
            error = "Invalid range parameter", 
            validRanges = validRanges 
        });
    }

    // Validate userId if provided
    if (userId.HasValue && userId.Value <= 0)
    {
        return Results.BadRequest(new { error = "UserId must be a positive integer" });
    }

    // Validate deckId if provided
    if (deckId.HasValue && deckId.Value <= 0)
    {
        return Results.BadRequest(new { error = "DeckId must be a positive integer" });
    }

    // deckId requires userId
    if (deckId.HasValue && !userId.HasValue)
    {
        return Results.BadRequest(new { error = "DeckId filter requires userId to be specified" });
    }

    // Use appropriate overload based on provided parameters
    StatsResponse stats;
    if (userId.HasValue)
    {
        stats = await studyService.GetStatsAsync(range, userId.Value, deckId, includeTotals ?? false);
    }
    else
    {
        stats = await studyService.GetStatsAsync(range, includeTotals ?? false);
    }

    return Results.Ok(stats);
});

app.Run();
