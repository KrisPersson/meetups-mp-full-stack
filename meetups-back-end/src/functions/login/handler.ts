import { middyfy } from '@libs/lambda';
import response from '@libs/api-gateway';
import { APIGatewayEvent } from 'aws-lambda';
import validation from '@middleware/validation';
import { loginSchema } from '@utils/validationSchema';

const login = async (event: APIGatewayEvent) => {
  return response.success('login');
};

export const main = middyfy(login).use(validation(loginSchema));
