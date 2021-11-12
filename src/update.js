import handler from "./util/handler";
import dynamo from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: "123",
      noteId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    UpdateExpression: "SET content = :content, attachment = :attachment",
    // 'ExpressionAttributeValues' defines the value in the update expression
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamo.update(params);

  return { status: true };
});
