using Microsoft.EntityFrameworkCore;
using StudyService.Models;

namespace StudyService.Data;

public class StudyDbContext : DbContext
{
    public StudyDbContext(DbContextOptions<StudyDbContext> options)
        : base(options)
    {
    }

    public DbSet<StudyAnswerRecord> StudyAnswers { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<StudyAnswerRecord>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            
            entity.Property(e => e.UserId).IsRequired();
            entity.Property(e => e.DeckId).IsRequired();
            entity.Property(e => e.CardId).IsRequired();
            entity.Property(e => e.IsCorrect).IsRequired();
            entity.Property(e => e.AnsweredAtUtc).IsRequired();

            // Indexes for better query performance
            entity.HasIndex(e => e.AnsweredAtUtc);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => new { e.UserId, e.DeckId });
            entity.HasIndex(e => new { e.AnsweredAtUtc, e.UserId });
        });
    }
}
