import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './authController';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidation.changePasswordValidation),
  AuthController.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRouter = router;
