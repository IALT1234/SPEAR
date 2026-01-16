namespace StudyService.Helpers;

/// <summary>
/// Helper class for enforcing UTC timestamps and normalizing DateTime values.
/// </summary>
public static class DateTimeHelper
{
    /// <summary>
    /// Gets the current UTC time.
    /// </summary>
    public static DateTime UtcNow => DateTime.UtcNow;

    /// <summary>
    /// Normalizes a DateTime to UTC. If null, returns current UTC time.
    /// If the DateTime is not in UTC, converts it to UTC.
    /// </summary>
    /// <param name="dateTime">The DateTime to normalize, or null to use current UTC time.</param>
    /// <returns>A DateTime in UTC.</returns>
    public static DateTime NormalizeToUtc(DateTime? dateTime)
    {
        if (dateTime == null)
        {
            return UtcNow;
        }

        var dt = dateTime.Value;
        
        // If already UTC, return as-is
        if (dt.Kind == DateTimeKind.Utc)
        {
            return dt;
        }

        // If unspecified, assume UTC
        if (dt.Kind == DateTimeKind.Unspecified)
        {
            return DateTime.SpecifyKind(dt, DateTimeKind.Utc);
        }

        // If local, convert to UTC
        return dt.ToUniversalTime();
    }

    /// <summary>
    /// Ensures a DateTime is in UTC. Throws an exception if the DateTime is not in UTC.
    /// </summary>
    /// <param name="dateTime">The DateTime to validate.</param>
    /// <returns>The DateTime if it's in UTC.</returns>
    /// <exception cref="ArgumentException">Thrown if the DateTime is not in UTC.</exception>
    public static DateTime EnsureUtc(DateTime dateTime)
    {
        if (dateTime.Kind != DateTimeKind.Utc)
        {
            throw new ArgumentException(
                $"DateTime must be in UTC. Received DateTime with Kind: {dateTime.Kind}",
                nameof(dateTime));
        }

        return dateTime;
    }

    /// <summary>
    /// Normalizes a DateTime to UTC and ensures it's in UTC.
    /// </summary>
    /// <param name="dateTime">The DateTime to normalize, or null to use current UTC time.</param>
    /// <returns>A DateTime in UTC.</returns>
    public static DateTime NormalizeAndEnsureUtc(DateTime? dateTime)
    {
        var normalized = NormalizeToUtc(dateTime);
        return EnsureUtc(normalized);
    }
}
