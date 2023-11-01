import response from '@/libs/api-gateway';

const validation = (schema) => {
  const before = async (req) => {
    try {
      req.event.body = await schema.validate(req.event.body);
      return req.response;
    } catch (error) {
      return response.error(400, error.message);
    }
  };

  return {
    before,
  };
};

export default validation;
