import { db } from "./indexedDB";
import { v4 as uuid } from "uuid";

export async function queueAction(action: object) {
  return db.add("pendingActions", {
    uuid: uuid(), // identificador local
    timestamp: Date.now(),
    ...action,
  });
}

export async function getPendingActions() {
  return db.getAll("pendingActions");
}

export async function clearAction(id: string) {
  return db.delete("pendingActions", id);
}
