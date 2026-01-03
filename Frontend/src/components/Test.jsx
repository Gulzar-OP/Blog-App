import { useEffect } from "react";
import socket from "../socket";

function Test() {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 FRONTEND SOCKET CONNECTED:", socket.id);
    });

    socket.on("notify-users", (msg) => {
      console.log("🔔 NOTIFICATION:", msg);
      alert(msg);
    });

    return () => {
      socket.off("connect");
      socket.off("notify-users");
    };
  }, []);

  return (
    <button
      onClick={() =>
        socket.emit("new-post", { title: "TEST SOCKET" })
      }
    >
      Test Socket
    </button>
  );
}

export default Test;
