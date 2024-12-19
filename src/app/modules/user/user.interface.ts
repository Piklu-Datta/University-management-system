/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isDeleted(q: boolean): Promise<TUser>;
  isJWTIssueBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUSerRole = keyof typeof USER_ROLE;
