const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function priorityScore(notification) {
  const weight = TYPE_WEIGHT[notification.Type] || 0;
  const timestamp = new Date(notification.Timestamp).getTime();

  return weight * 1000000000000 + timestamp;
}

export function getTopNotifications(notifications = []) {

  if (!Array.isArray(notifications)) {
    return [];
  }

  return [...notifications]
    .sort((a, b) => priorityScore(b) - priorityScore(a))
    .slice(0, 10);
}