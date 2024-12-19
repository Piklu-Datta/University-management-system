import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { CourseValidations } from './course.validation';
import { CoursesController } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CoursesController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CoursesController.updateCourse,
);
router.get('/', CoursesController.getAllCourses);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.assignFacultiesWithCourseValidationSchema),
  CoursesController.assignFaculties,
);

router.get('/:id', CoursesController.getSingleCourse);
router.delete('/:id', CoursesController.deletedCourse);

export const CourseRoutes = router;
