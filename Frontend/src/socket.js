// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_API_URL, {
//   withCredentials: true,
// });

// export default socket;



import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;

