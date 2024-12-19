import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { offeredCourseValidation } from './offeredCourse.validation';

import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse,
);

export const offeredCourseRouter = router;
