// src/utils/priority.js
// Priority scoring: Placement > Result > Event, then by recency

export const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const TYPE_COLORS = {
  Placement: "#4f46e5", // indigo
  Result: "#0891b2",    // cyan
  Event: "#059669",     // green
};

/**
 * Compute priority score for a notification.
 * Type weight dominates; within same type, newer = higher score.
 */
export function priorityScore(notification) {
  const weight = TYPE_WEIGHT[notification.Type] ?? 0;
  const timestampMs = new Date(notification.Timestamp).getTime();
  return weight * 1e12 + timestampMs;
}

/**
 * Return the top N notifications sorted by priority score.
 * @param {Array} notifications - raw notifications from API
 * @param {number} n - how many to return
 */
export function getTopN(notifications, n = 10) {
  return [...notifications]
    .sort((a, b) => priorityScore(b) - priorityScore(a))
    .slice(0, n);
}