
# Notification System Design

## Objective
 our objective was Fetch notifications from the API and display the top 10 notifications.

## Priority Order
1. Placement
2. Result
3. Event

If two notifications have the same type, the latest notification is displayed first.

## Algorithm
- Fetch notifications from the API.
- Assign priority:
  - Placement = 3
  - Result = 2
  - Event = 1
- Sort by priority.
- If priorities are equal, sort by timestamp in descending order.
- Display the first 10 notifications.

## Future Improvements
- Read/Unread filtering
- Search
- Pagination
- Real-time notifications
