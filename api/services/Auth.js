import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TokenService from './Token.js';
import { NotFound, Forbidden, Conflict } from '../utils/Errors.js';
import RefreshSessionsRepository from '../repositories/RefreshSessions.js';
import UserRepository from '../repositories/User.js';
import { ACCESS_TOKEN_EXPIRATION } from '../constants.js';

class AuthService {
  static async signIn({ userName, password, fingerprint }) {
    const userData = await UserRepository.getUserData(userName);

    if (!userData) {
      throw new NotFound('Пользователь не найден!');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      hashedPassword
    );

    if (!isPasswordValid) {
      throw new Forbidden('Неверный логин или пароль!');
    }

    const payload = { userName, role: userData.role, id: userData.id };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id: userData.id,
      refreshToken,
      fingerprint,
    });

    return {
      userId: userData.id,
      role: userData.role,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async signUp({ userName, password, fingerprint, role }) {
    const userData = await UserRepository.getUserData(userName);
    if (userData) {
      throw new Conflict('Пользователь с таким именем уже существует!');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const { id } = await UserRepository.createUser({
      userName,
      hashedPassword,
      role,
    });

    const payload = { userName, role, id };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    });

    return {
      userId: id,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }

  static async logOut(refreshToken) {
    await RefreshSessionsRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({ fingerprint, currentRefreshToken }) {
    const refreshSessions =
      await RefreshSessionsRepository.getRefreshSessions(currentRefreshToken);

    if (!refreshSessions.length) {
      throw new Forbidden();
    }

    if (refreshSessions[0].finger_print !== fingerprint.hash) {
      console.log('Несанкционированная попытка обновления токенов');
      throw new Forbidden();
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken);

    let payload;
    try {
      const { id, userName, role } = await jwt.verify(
        currentRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      payload = {
        id,
        userName,
        role,
      };
    } catch (error) {
      throw new Forbidden(error);
    }

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id: payload.id,
      refreshToken,
      fingerprint,
    });

    return {
      userId: payload.id,
      userName: payload.userName,
      role: payload.role,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }
}

export default AuthService;
