import { useState, useEffect } from "react";
import { getStats } from "../api";
import "../css/Account.css";

function Account({ onLogout }) {
  const [range, setRange] = useState("daily");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const data = await getStats(range);

        console.log("stats response:", data);
        console.log("decks:", data?.decks);

        setStats(Array.isArray(data?.decks) ? data.decks : []);
      } catch (err) {
        setError(err.message || "Failed to load stats");
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [range]);

  function calculatePercentage(correct, wrong) {
    const total = correct + wrong;
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }

  return (
    <div className="account-container">
      <div className="stats-panel">
        <div className="stats-header">
          <h2>User Stats</h2>
          <select
            className="range-selector"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {loading && <div className="stats-loading">Loading...</div>}
        
        {error && <div className="stats-error">Error: {error}</div>}
        
        {!loading && !error && (
          <div className="stats-list">
            {stats.length === 0 ? (
              <div className="stats-empty">No stats available</div>
            ) : (
              stats.map((item, idx) => {
                const deckName = item.deckTitle || item.deck_title || item.title || `Deck ${item.deckId || idx + 1}`;
                const correct = item.correct || 0;
                const wrong = item.wrong || 0;
                const percentage = calculatePercentage(correct, wrong);
                
                return (
                  <div key={item.deckId ?? idx} className="stats-row">
                    <span className="stats-deck-name">{deckName}</span>
                    <span className="stats-counts">
                      {correct}/{wrong}
                    </span>
                    <span className="stats-percentage">{percentage}%</span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <button className="logout-button" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default Account;