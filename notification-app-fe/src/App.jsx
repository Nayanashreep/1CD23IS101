import { useEffect, useState } from "react";
import { getNotifications } from "./api/notificationApi";
import { getTopNotifications } from "./utils/priority";

function App() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    async function loadNotifications() {

      try {

        const data = await getNotifications();

        console.log(data);
        console.log(Object.keys(data));

        const notifications = data.notifications || data;

        const top10 = getTopNotifications(notifications);

        console.log("Top 10 Notifications");
        console.table(top10);

        setNotifications(top10);

      } catch (error) {

        console.error(error);

      }

    }

    loadNotifications();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h1>Campus Notification System</h1>

      <h2>Top 10 Priority Notifications</h2>

      {notifications.map((item) => (

        <div
          key={item.ID}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >

          <h3>{item.Message}</h3>

          <p>
            <strong>Type:</strong> {item.Type}
          </p>

          <p>
            <strong>Timestamp:</strong> {item.Timestamp}
          </p>

        </div>

      ))}

    </div>

  );

}

export default App;