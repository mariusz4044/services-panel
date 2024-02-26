// @ts-ignore
import connectionDB from "./database/connection";
import { startServer } from "./controllers/routing";
connectionDB().then((res: boolean): void => {
  if (!res) {
    throw new Error("Error to connect to the database, please check the logs.");
  }

  startServer();
});
