import { Router } from 'express';
import { StudentsRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemister.router';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicFaculty/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { CourseRoutes } from '../modules/course/course.route';
import { semesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRouter } from '../modules/offeredCourse/offeedCourse.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRouter } from '../modules/Auth/auth.route';

const router = Router();

const multiRoutes = [
  {
    path: '/students',
    route: StudentsRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoute,
  },
  {
    path: '/offered-course',
    route: offeredCourseRouter,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];

multiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
