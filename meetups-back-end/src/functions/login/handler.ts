import { middyfy } from '@/libs/lambda';
import validation from '../../middleware/validation';
import { loginSchema } from '@/utils/validationSchema';
import { generateToken } from '@/utils/functions';
import UserModel from 'src/model/user';
import response, {
  ValidatedEventAPIGatewayProxyEvent,
} from '@/libs/api-gateway';
import schema from './schema';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { username, password } = event.body;
    const user = await UserModel.getUser(username);
    if (!user) {
      return response.error(404, `Username ${username} does not exist!`);
    }
    const isMatch = await UserModel.checkPassword(password, user.Password);
    if (!isMatch) {
      return response.error(400, `Password is incorrect!`);
    }

    const token = generateToken(user.SK);
    return response.success({
      message: 'Login in successfully!',
      token,
      username: user.SK,
    });
  } catch (error) {
    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(login).use(validation(loginSchema));
