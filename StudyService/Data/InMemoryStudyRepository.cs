using StudyService.Models;

namespace StudyService.Data;

public class InMemoryStudyRepository : IStudyRepository
{
    private readonly List<StudyAnswerRecord> _records = new();
    private readonly object _lock = new();

    public Task AddAsync(StudyAnswerRecord record)
    {
        lock (_lock)
        {
            _records.Add(record);
        }
        return Task.CompletedTask;
    }

    public Task<List<StudyAnswerRecord>> GetAsync(DateTime startUtc, DateTime endUtc, int? userId = null, int? deckId = null)
    {
        List<StudyAnswerRecord> result;
        lock (_lock)
        {
            var query = _records
                .Where(r => r.AnsweredAtUtc >= startUtc && r.AnsweredAtUtc < endUtc);
            
            if (userId.HasValue)
            {
                query = query.Where(r => r.UserId == userId.Value);
            }
            
            if (deckId.HasValue)
            {
                query = query.Where(r => r.DeckId == deckId.Value);
            }
            
            result = query.ToList();
        }
        return Task.FromResult(result);
    }
}
