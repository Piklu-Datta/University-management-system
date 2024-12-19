import AppError from '../../error/appError';
import { AcademicSemester } from '../academicSemister/academicSemister.model';
import { TSemesterRegistration } from './semesterRegestration.interface';
import httpStatus from 'http-status';
import { SemesterRegister } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  //check if there any upComing or ongoing semester
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegister.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status}  registered semester`,
    );
  }

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }
  //check if the semester is already exist
  const isSemesterRegistrationExist = await SemesterRegister.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is already registered',
    );
  }
  const result = await SemesterRegister.create(payload);
  return result;
};

const getAllSemesterRegistrationIntoDb = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegister.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationIntoDb = async (id: string) => {
  const result = await SemesterRegister.findById(id);
  return result;
};
const UpdateSemesterRegistrationIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegister.findById(id);
  //if the requested semester registration is ended we will not updated this
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.OK,
      `This semester is already ${currentSemesterStatus}`,
    );
  }
  const requestedSemesterStatus = payload?.status;
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedSemesterStatus === RegistrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  const result = await SemesterRegister.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationIntoDb,
  getSingleSemesterRegistrationIntoDb,
  UpdateSemesterRegistrationIntoDb,
};
