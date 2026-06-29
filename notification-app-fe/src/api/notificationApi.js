export async function getNotifications() {
  const token = import.meta.env.VITE_AUTH_TOKEN;

  console.log("Token:", token);

  const response = await fetch(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Status:", response.status);

  const text = await response.text();
  console.log("Response:", text);

  if (!response.ok) {
    throw new Error(`Failed to fetch notifications: ${response.status}`);
  }

  return JSON.parse(text);
}