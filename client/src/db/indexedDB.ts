import { openDB } from "idb";

export const db = await openDB("tidytag-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("products")) {
      db.createObjectStore("products", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("pendingActions")) {
      db.createObjectStore("pendingActions", { keyPath: "uuid" });
    }
  },
});
