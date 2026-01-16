using StudyService.Data;
using StudyService.Models;
using StudyService.Helpers;

namespace StudyService.Services;

public class StudyService : IStudyService
{
    private readonly IStudyRepository _repo;

    public StudyService(IStudyRepository repo)
    {
        _repo = repo;
    }

    public async Task<StudyAnswerResponse> RecordAnswerAsync(StudyAnswerRequest req)
    {
        // answeredAtUtc should already be normalized by the endpoint, but ensure it's UTC
        var answeredAtUtc = DateTimeHelper.NormalizeAndEnsureUtc(req.answeredAtUtc);
        
        var record = new StudyAnswerRecord
        {
            UserId = req.userId,
            DeckId = req.deckId,
            CardId = req.cardId,
            IsCorrect = req.isCorrect,
            AnsweredAtUtc = answeredAtUtc
        };

        await _repo.AddAsync(record);

        return new StudyAnswerResponse
        {
            Success = true,
            RecordedAtUtc = answeredAtUtc,
            UserId = req.userId,
            DeckId = req.deckId,
            CardId = req.cardId,
            IsCorrect = req.isCorrect
        };
    }

    // Overload: No filters
    public async Task<StatsResponse> GetStatsAsync(string range, bool includeTotals = false)
    {
        return await GetStatsAsyncInternal(range, null, null, includeTotals);
    }

    // Overload: Filter by userId only
    public async Task<StatsResponse> GetStatsAsync(string range, int userId, bool includeTotals = false)
    {
        return await GetStatsAsyncInternal(range, userId, null, includeTotals);
    }

    // Overload: Filter by userId and optionally deckId
    public async Task<StatsResponse> GetStatsAsync(string range, int userId, int? deckId, bool includeTotals = false)
    {
        return await GetStatsAsyncInternal(range, userId, deckId, includeTotals);
    }

    private async Task<StatsResponse> GetStatsAsyncInternal(string range, int? userId, int? deckId, bool includeTotals)
    {
        // Compute time window with calendar boundaries
        var (startUtc, endUtc) = ComputeRange(range);

        var records = await _repo.GetAsync(startUtc, endUtc, userId, deckId);

        // Group by deck
        var byDeck = records.GroupBy(r => r.DeckId);

        var resp = new StatsResponse { Range = range };
        foreach (var g in byDeck)
        {
            resp.Decks.Add(new StatsResponse.DeckStats
            {
                DeckId = g.Key,
                Correct = g.Count(x => x.IsCorrect),
                Wrong = g.Count(x => !x.IsCorrect)
            });
        }

        // Optionally calculate totals across all decks
        if (includeTotals)
        {
            resp.Total = new StatsResponse.TotalStats
            {
                Correct = records.Count(x => x.IsCorrect),
                Wrong = records.Count(x => !x.IsCorrect)
            };
        }

        return resp;
    }

    /// <summary>
    /// Computes the time range based on calendar boundaries (UTC).
    /// - daily: from start of current UTC day to start of next UTC day
    /// - weekly: from start of current UTC week (Monday) to start of next UTC week
    /// - monthly: from start of current UTC month to start of next UTC month
    /// </summary>
    private static (DateTime startUtc, DateTime endUtc) ComputeRange(string range)
    {
        var nowUtc = DateTimeHelper.UtcNow;

        return range.ToLowerInvariant() switch
        {
            "daily" => ComputeDailyRange(nowUtc),
            "weekly" => ComputeWeeklyRange(nowUtc),
            "monthly" => ComputeMonthlyRange(nowUtc),
            _ => throw new ArgumentException($"Invalid range: {range}. Must be one of: daily, weekly, monthly", nameof(range))
        };
    }

    private static (DateTime startUtc, DateTime endUtc) ComputeDailyRange(DateTime nowUtc)
    {
        // Start of current UTC day (00:00:00)
        var startUtc = new DateTime(nowUtc.Year, nowUtc.Month, nowUtc.Day, 0, 0, 0, DateTimeKind.Utc);
        // Start of next UTC day (exclusive)
        var endUtc = startUtc.AddDays(1);
        return (startUtc, endUtc);
    }

    private static (DateTime startUtc, DateTime endUtc) ComputeWeeklyRange(DateTime nowUtc)
    {
        // Start of current UTC week (Monday 00:00:00)
        var daysSinceMonday = ((int)nowUtc.DayOfWeek - (int)DayOfWeek.Monday + 7) % 7;
        var startUtc = new DateTime(nowUtc.Year, nowUtc.Month, nowUtc.Day, 0, 0, 0, DateTimeKind.Utc)
            .AddDays(-daysSinceMonday);
        // Start of next UTC week (exclusive)
        var endUtc = startUtc.AddDays(7);
        return (startUtc, endUtc);
    }

    private static (DateTime startUtc, DateTime endUtc) ComputeMonthlyRange(DateTime nowUtc)
    {
        // Start of current UTC month (1st day, 00:00:00)
        var startUtc = new DateTime(nowUtc.Year, nowUtc.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        // Start of next UTC month (exclusive)
        var endUtc = startUtc.AddMonths(1);
        return (startUtc, endUtc);
    }
}
