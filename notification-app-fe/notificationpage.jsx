// src/pages/NotificationsPage.jsx
import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notificationApi";
import { getTopN, TYPE_COLORS } from "../utils/priority";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const raw = await fetchNotifications();
      const top = getTopN(raw, topN);
      setNotifications(top);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadNotifications();
  }, [topN]);

  // Auto-refresh every 30 seconds to handle new incoming notifications
  useEffect(() => {
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [topN]);

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif", padding: "0 1rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>📬 Priority Inbox</h1>
          {lastUpdated && (
            <p style={{ margin: "0.25rem 0 0", color: "#888", fontSize: "0.8rem" }}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Top N selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label style={{ fontWeight: 600 }}>Show top:</label>
          <select
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
            style={{ padding: "0.3rem 0.5rem", borderRadius: 6, border: "1px solid #ccc", fontSize: "1rem" }}
          >
            {[5, 10, 15, 20, 25].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button
            onClick={loadNotifications}
            style={{
              padding: "0.3rem 0.8rem", borderRadius: 6,
              background: "#4f46e5", color: "#fff", border: "none",
              cursor: "pointer", fontWeight: 600
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Priority legend */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <span key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.85rem" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: color, display: "inline-block" }} />
            {type}
          </span>
        ))}
        <span style={{ fontSize: "0.85rem", color: "#888", marginLeft: "auto" }}>
          Priority: Placement &gt; Result &gt; Event, then by recency
        </span>
      </div>

      {/* States */}
      {loading && <p style={{ color: "#888" }}>Loading notifications…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Notification list */}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {notifications.map((n, i) => (
            <li
              key={n.ID}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.8rem",
                padding: "0.9rem 1rem",
                marginBottom: "0.6rem",
                borderRadius: 10,
                background: "#f9f9f9",
                borderLeft: `4px solid ${TYPE_COLORS[n.Type] || "#aaa"}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)"
              }}
            >
              {/* Rank badge */}
              <span style={{
                minWidth: 28, height: 28, borderRadius: "50%",
                background: i < 3 ? "#4f46e5" : "#e5e7eb",
                color: i < 3 ? "#fff" : "#555",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.8rem"
              }}>
                {i + 1}
              </span>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: 0.5,
                    color: TYPE_COLORS[n.Type] || "#888", textTransform: "uppercase"
                  }}>
                    {n.Type}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#aaa" }}>
                    {new Date(n.Timestamp).toLocaleString()}
                  </span>
                </div>
                <p style={{ margin: "0.3rem 0 0", fontWeight: 500 }}>{n.Message}</p>
                <p style={{ margin: "0.15rem 0 0", fontSize: "0.7rem", color: "#bbb" }}>ID: {n.ID}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
