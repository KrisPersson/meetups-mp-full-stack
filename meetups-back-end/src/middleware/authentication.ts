import response from '@libs/api-gateway';
import { verifyToken } from '@utils/functions';

const checkToken = {
  before: async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return response.error(400, 'Missing authentication token');
    }

    try {
      const decoded = await verifyToken(token);

      // check if user is existing

      // check if user is attended to meetup

      return req.response;
    } catch (error) {
      return response.error(
        401,
        'Do not have permission to access this resource'
      );
    }
  },
};

export default checkToken;
