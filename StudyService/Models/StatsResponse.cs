namespace StudyService.Models;

public class StatsResponse
{
    public string Range { get; set; } = "daily";

    // Per deck stats
    public List<DeckStats> Decks { get; set; } = new();

    // Optional totals across all decks (null if not calculated)
    public TotalStats? Total { get; set; }

    public class DeckStats
    {
        public int DeckId { get; set; }
        public int Correct { get; set; }
        public int Wrong { get; set; }

        // convenience
        public double CorrectRatio =>
            (Correct + Wrong) == 0 ? 0.0 : (double)Correct / (Correct + Wrong);

        // Readable percent field (e.g., "75.5%")
        public string CorrectPercent =>
            (Correct + Wrong) == 0 
                ? "0.0%" 
                : $"{CorrectRatio * 100:F1}%";
    }

    public class TotalStats
    {
        public int Correct { get; set; }
        public int Wrong { get; set; }

        // convenience
        public double CorrectRatio =>
            (Correct + Wrong) == 0 ? 0.0 : (double)Correct / (Correct + Wrong);

        // Readable percent field (e.g., "75.5%")
        public string CorrectPercent =>
            (Correct + Wrong) == 0 
                ? "0.0%" 
                : $"{CorrectRatio * 100:F1}%";
    }
}