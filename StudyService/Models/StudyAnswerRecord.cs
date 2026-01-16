namespace StudyService.Models;

public class StudyAnswerRecord
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DeckId { get; set; }
    public int CardId { get; set; }
    public bool IsCorrect { get; set; }
    public DateTime AnsweredAtUtc { get; set; }
}