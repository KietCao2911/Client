import * as signalR from "@microsoft/signalr";
import { BASE_URL } from "~/const";
let connection = new signalR.HubConnectionBuilder()

  .withUrl(BASE_URL + "/ChatRoom", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build();
export const start = async () => {
  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
};
// connection.onclose(async () => {
//   await start();
// });
// start();
export default connection;
