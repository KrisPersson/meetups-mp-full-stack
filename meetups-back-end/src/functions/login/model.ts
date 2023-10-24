import db from '@libs/db';

export const getUser = async (username: string) => {
  const data = await db
    .get({
      TableName: process.env.TABLE,
      Key: {
        PK: username,
        SK: username
      }
    })
    .promise();

  return data.Item;
};