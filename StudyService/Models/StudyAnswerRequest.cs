using System.ComponentModel.DataAnnotations;

namespace StudyService.Models;

public record StudyAnswerRequest(
    [Range(1, int.MaxValue, ErrorMessage = "UserId must be a positive integer")]
    int userId,
    [Range(1, int.MaxValue, ErrorMessage = "DeckId must be a positive integer")]
    int deckId,
    [Range(1, int.MaxValue, ErrorMessage = "CardId must be a positive integer")]
    int cardId,
    bool isCorrect,
    DateTime? answeredAtUtc
);