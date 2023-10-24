import response from '@libs/api-gateway';
import { verifyToken } from '@utils/functions';
import UserModel from 'src/model/user';

const checkToken = {
  before: async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return response.error(401, 'Missing authentication token');
    }

    try {
      const decoded = await verifyToken(token);

      const user = await UserModel.getUser(decoded.username);
      if (!user) {
        return response.error(401, 'Token is invalid');
      }

      req.event.username = decoded.username;

      return req.response;
    } catch (error) {
      return response.error(401, error.message);
    }
  },
};

export default checkToken;
