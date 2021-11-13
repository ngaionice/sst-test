import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";

export default function main(app) {
  const storageStack = new StorageStack(app, "storage");

  const apiStack = new ApiStack(app, "api", {
    table: storageStack.table,
  });

  new AuthStack(app, "auth", {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
}
// {"userId":"123","noteId":"d086e9b0-4350-11ec-b9cd-df27de4a3a86","content":"Hello World","attachment":"hello.jpg","createdAt":1636677491659}
