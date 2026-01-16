namespace StudyService.Models;

/// <summary>
/// Response model for recording a study answer.
/// </summary>
public class StudyAnswerResponse
{
    /// <summary>
    /// Indicates whether the answer was successfully recorded.
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// The UTC timestamp when the answer was recorded.
    /// </summary>
    public DateTime RecordedAtUtc { get; set; }

    /// <summary>
    /// The user ID associated with the recorded answer.
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// The deck ID associated with the recorded answer.
    /// </summary>
    public int DeckId { get; set; }

    /// <summary>
    /// The card ID associated with the recorded answer.
    /// </summary>
    public int CardId { get; set; }

    /// <summary>
    /// Whether the answer was correct.
    /// </summary>
    public bool IsCorrect { get; set; }
}
