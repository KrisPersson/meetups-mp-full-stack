import jwt from 'jsonwebtoken';
export const generateToken = (PK: string) => {
  return jwt.sign({ username: PK }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const generateMeetUpId = (length: number = 10) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * length));
  }

  return id;
};
