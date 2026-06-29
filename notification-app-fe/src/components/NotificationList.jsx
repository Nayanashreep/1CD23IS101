import NotificationCard from "./NotificationCard";

function NotificationList({ notifications }) {

  return (
    <>
      {notifications.map((item) => (
        <NotificationCard
          key={item.id}
          notification={item}
        />
      ))}
    </>
  );

}

export default NotificationList;