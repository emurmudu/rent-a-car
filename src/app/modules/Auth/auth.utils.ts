import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};


// export const accesstoken = (
//     jwtPayload: { email: string; role: string },
//     secret: string,
//     expiresIn: string
//   ) => {
//     return Jwt.sign(jwtPayload, secret, {
//       expiresIn: expiresIn,
//     });
//   };