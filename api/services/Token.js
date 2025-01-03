import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Forbidden, Unauthorized } from '../utils/Errors.js';

dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
  }

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
  }

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return next(new Unauthorized());
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err, user);

      if (err) {
        return next(new Forbidden());
      } 

      req.user = user;
      next();
    });
  }
}

export default TokenService;
