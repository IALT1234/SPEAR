using StudyService.Models;

namespace StudyService.Services;

public interface IStudyService
{
    Task<StudyAnswerResponse> RecordAnswerAsync(StudyAnswerRequest req);
    
    // Overloads for different filtering scenarios
    Task<StatsResponse> GetStatsAsync(string range, bool includeTotals = false);
    Task<StatsResponse> GetStatsAsync(string range, int userId, bool includeTotals = false);
    Task<StatsResponse> GetStatsAsync(string range, int userId, int? deckId, bool includeTotals = false);
}