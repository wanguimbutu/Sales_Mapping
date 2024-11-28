import { io } from "socket.io-client";

const socket = io("https://erpnext-181781-0.cloudclusters.net");

export const subscribeToChannel = (channel, callback) => {
  socket.on(channel, callback);
};

export const unsubscribeFromChannel = (channel) => {
  socket.off(channel);
};
