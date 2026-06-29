function NotificationCard({ notification }) {

  return (
    <div className="card">

      <h3>{notification.title}</h3>

      <p>Type : {notification.type}</p>

      <p>
        Status :
        {notification.read ? " Read" : " Unread"}
      </p>

    </div>
  );

}

export default NotificationCard;