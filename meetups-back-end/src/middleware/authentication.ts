import response, { APIGatewayProxyEventWithUsername } from '@/libs/api-gateway';
import middy from '@middy/core';
import { verifyToken } from '@/utils/functions';
import { APIGatewayProxyResult } from 'aws-lambda';
import UserModel from 'src/model/user';

const checkToken = () => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEventWithUsername,
    APIGatewayProxyResult
  > = async (req) => {
    const token = req.event.headers.authorization.split(' ')[1];
    if (!token) {
      return response.error(401, 'Missing authentication token');
    }

    try {
      const decoded = await verifyToken(token);

      console.log(decoded);
      const user = await UserModel.getUser(decoded.username);
      if (!user) {
        return response.error(401, 'Token is invalid');
      }

      req.event.username = decoded.username;

      return req.response;
    } catch (error) {
      return response.error(401, error.message);
    }
  };

  return {
    before,
  };
};

export default checkToken;
