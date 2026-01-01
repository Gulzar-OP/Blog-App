import { useEffect, useState } from "react";
import socket from "../socket";

function Notification() {
  const [notify, setNotify] = useState("");

  useEffect(() => {
    socket.on("notify-users", (msg) => {
      setNotify(msg);
    });

    return () => socket.off("notify-users");
  }, []);

  return (
    <div>
      {notify && <p>🔔 {notify}</p>}
    </div>
  );
}

export default Notification;
