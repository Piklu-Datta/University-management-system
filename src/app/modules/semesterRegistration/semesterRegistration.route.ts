import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { semesterRegisterValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegisterValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    semesterRegisterValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoute = router;
