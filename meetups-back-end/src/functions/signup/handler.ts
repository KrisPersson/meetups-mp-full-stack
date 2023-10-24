import response from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import validation from '../../middleware/validation';
import { loginSchema } from '@utils/validationSchema';
import UserModel from 'src/model/user';

const signup = async (event) => {
  try {
    const { username, password } = event.body;

    await UserModel.saveUser(username, password);
    return response.success({
      message: 'Sign up successfully!',
    });
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      error.message = 'Username already exists!';
    }

    return response.error(error.statusCode, error.message);
  }
};

export const main = middyfy(signup).use(validation(loginSchema));
