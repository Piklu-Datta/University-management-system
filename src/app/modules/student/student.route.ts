import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getAllStudent,
);
router.get('/:studentTd', StudentController.getOneStudent);
router.patch(
  '/:studentTd',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentTd', StudentController.deleteStudent);

export const StudentsRoutes = router;
