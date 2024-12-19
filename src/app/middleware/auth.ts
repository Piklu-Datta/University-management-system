import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUSerRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRole: TUSerRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    //if token is sent from the client
    if (!accessToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }
    //check if the token is valid or not

    const decoded = jwt.verify(
      accessToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;
    // console.log(role, userId);
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }
    // // checking if the user is deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
    }
    //checking if the status is blocked or not
    const isStatus = user?.status;
    if (isStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssueBeforePasswordChanged(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized hi!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
