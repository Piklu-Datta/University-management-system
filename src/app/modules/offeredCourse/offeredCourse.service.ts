import AppError from '../../error/appError';
import { AcademicDepartment } from '../academicFaculty/academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegister } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import httpStatus from 'http-status';
const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
  } = payload;
  //check if the semester registration id is exist
  const isSemesterRegistrationExist =
    await SemesterRegister.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  //check if the department is belong to the faculty
  const isDepartmentBelongToTheFaculty = await AcademicDepartment.findById({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToTheFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicFacultyExist.name} is not belong to this ${isAcademicFacultyExist.name}`,
    );
  }
  // check if the same offered course same section in same registered semester exist
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (!isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `offered course with same section is already exist`,
    );
  }
  const academicSemester = isSemesterRegistrationExist.academicSemester;
  //get the schedule of the faculty
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
  }).select('days startTime endTime');
  console.log(assignedSchedules);
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDb,
};
