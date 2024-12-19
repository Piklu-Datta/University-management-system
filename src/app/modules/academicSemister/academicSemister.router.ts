import express from 'express';
import { academicSemesterController } from './academicSemister.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidation } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchemas,
  ),
  academicSemesterController.createAcademicSemester,
);

router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);

router.get('/', academicSemesterController.getAllAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchemas,
  ),
  academicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
