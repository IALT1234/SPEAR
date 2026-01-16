using Microsoft.EntityFrameworkCore;
using StudyService.Models;

namespace StudyService.Data;

public class EfCoreStudyRepository : IStudyRepository
{
    private readonly StudyDbContext _context;

    public EfCoreStudyRepository(StudyDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(StudyAnswerRecord record)
    {
        _context.StudyAnswers.Add(record);
        await _context.SaveChangesAsync();
    }

    public async Task<List<StudyAnswerRecord>> GetAsync(DateTime startUtc, DateTime endUtc, int? userId = null, int? deckId = null)
    {
        var query = _context.StudyAnswers
            .Where(r => r.AnsweredAtUtc >= startUtc && r.AnsweredAtUtc < endUtc);

        if (userId.HasValue)
        {
            query = query.Where(r => r.UserId == userId.Value);
        }

        if (deckId.HasValue)
        {
            query = query.Where(r => r.DeckId == deckId.Value);
        }

        return await query.ToListAsync();
    }
}
