using StudyService.Models;

namespace StudyService.Data;

public interface IStudyRepository
{
    Task AddAsync(StudyAnswerRecord record);
    Task<List<StudyAnswerRecord>> GetAsync(DateTime startUtc, DateTime endUtc, int? userId = null, int? deckId = null);
}
