import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app) {
  const storage = new StorageStack(app, "storage");

  new ApiStack(app, "api", {
    table: storage.table,
  });
}
// {"userId":"123","noteId":"d086e9b0-4350-11ec-b9cd-df27de4a3a86","content":"Hello World","attachment":"hello.jpg","createdAt":1636677491659}
