import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import response from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getUser } from './model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validation from '../../middleware/validation'
import { loginSchema } from '@utils/validationSchema';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { username, password } = event.body;
    const user = await getUser(username);
    if (!user) {
      return response.error(400, `Username ${username} does not exist!`);
    }
    const isMatch = await bcryptjs.compare(password, user.Password);
    if (!isMatch) {
      return response.error(400, `Password is incorrect!`);
    }

    const token = jwt.sign(
      {
        PK: user.PK,
        SK: user.SK,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    return response.success({
      message: 'Sign in successfully!',
      token,
    });
  } catch (error) {
    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(login).use(validation(loginSchema));
