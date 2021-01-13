import monk from "monk";
import * as utils from "../utils";
import { RoomManager } from "./RoomManager";

export class ChatManager {
  public readonly rooms: RoomManager;

  constructor(hostName: string, dbName: string) {
    const db = monk(`${hostName}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.rooms = new RoomManager(db);

    this.seed();
  }

  private async seed() {
    const rooms = await this.rooms.all();

    if (rooms.length !== 0) {
      return;
    }

    this.rooms.add({
      id: "General",
      messages: [
        {
          sender: "Server",
          content: "Hi! Welcome to JB Chat!",
          id: utils.newUuid(),
        },
      ],
      participants: [],
    });
  }
}
