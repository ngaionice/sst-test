import handler from "./util/handler";
import dynamo from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamo.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
