import jwt from 'jsonwebtoken';
import { Payload } from '../Types/express.js';


export interface Jwtsign {
  payload: Payload;
  JWT_SECRET: string;
}

export interface Jwtverify {
  token: string;
  JWT_SECRET: string;
}


export const sign = ({ payload, JWT_SECRET }: Jwtsign): string => {

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return token;
};



export const jwtverify = ({ token, JWT_SECRET }: Jwtverify): Payload | null => {
  try {

    const decodedPayload = jwt.verify(token, JWT_SECRET) as Payload;
    return decodedPayload;
  } catch (error) {
    
    console.error("Invalid token:", error);
    return null;
  }
};