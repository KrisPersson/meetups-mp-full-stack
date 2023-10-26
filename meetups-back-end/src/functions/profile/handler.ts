import { middyfy } from '@/libs/lambda';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import checkToken from '@/middleware/authentication';
import schema from './schema';

const profile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return response.success();
};

export const main = middyfy(profile).use(checkToken());
