import db from '@libs/db';
import * as bcryptjs from 'bcryptjs';

const UserModel = {
  getUser: async (username: string) => {
    const data = await db
      .get({
        TableName: process.env.TABLE,
        Key: {
          PK: username,
          SK: username,
        },
      })
      .promise();

    return data.Item;
  },
  saveUser: async (username: string, password: string) => {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(password, salt);

    return await db
      .put({
        TableName: process.env.TABLE,
        Item: {
          PK: username,
          SK: username,
          Password: hash,
        },
        ConditionExpression: 'attribute_not_exists(PK)',
      })
      .promise();
  },
  checkPassword: async (password: string, hash: string) => {
    return await bcryptjs.compare(password, hash);
  },
};

export default UserModel;
