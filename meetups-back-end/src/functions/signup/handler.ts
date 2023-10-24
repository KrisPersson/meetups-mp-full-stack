import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import response from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import validation from '../../middleware/validation'
import { saveUser } from './model';
import { loginSchema } from '@utils/validationSchema';

const signup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { username, password } = event.body;

    await saveUser(username, password);
    return response.success({ message: 'Signup successfully!' });
  } catch (error) {
    console.log(error);
    if (error.code === 'ConditionalCheckFailedException') {
      error.message = 'Username already exists!';
    }

    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(signup).use(
  validation(loginSchema)
);