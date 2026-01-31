import { useEffect, useState } from "react";
import { createSocket } from "../sockets/socket";

function UserDashboard() {
  const [status, setStatus] = useState("WAITING");
  const [waitTime, setWaitTime] = useState(null);

  useEffect(() => {
    const socket = createSocket("user", "U1");

    socket.on("USER_ASSIGNED", (data) => {
      setStatus("ASSIGNED");
      setWaitTime(0);
    });

    socket.on("WAIT_TIME_UPDATED", (metrics) => {
      if (metrics.status === "OK") {
        setWaitTime(Math.round(metrics.estimatedWaitTime / 60000));
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Status: {status}</p>
      <p>Estimated Wait: {waitTime ?? "Calculating..."} minutes</p>
    </div>
  );
}

export default UserDashboard;
