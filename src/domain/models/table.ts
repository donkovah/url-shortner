import DynamoDB from "aws-sdk/clients/dynamodb";
import { Table } from "dynamodb-toolbox";
import { config } from "../../config";

const tableName = config.dbName;
const endPoint = config.dbUrl;

export const createLocalUrlTable = async (): Promise<void> => {
  const db = new DynamoDB({ endpoint: endPoint, region: "eu-central-1" });

  const { TableNames } = await db.listTables().promise();
  if (!TableNames.includes(tableName)) {
    await db
      .createTable({
        TableName: tableName,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" },
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
      .promise();
  }
};

export const createUrlTable = (): Table<"Name", "PartitionKey", "SortKey"> =>
  new Table({
    name: tableName,
    partitionKey: "PK",
    sortKey: "SK",
    DocumentClient: new DynamoDB.DocumentClient({
      endpoint: endPoint,
      region: "us-east-1",
    }),
  });
