/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

import studentSearchableField from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';
const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // const excludedField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludedField.forEach((el) => delete queryObj[el]);
  // console.log({ query }, { queryObj });
  // //console.log(query, queryObj);
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = query.limit as number;
  // }
  // let page = 1;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const pageQuery = sortQuery.skip(skip);
  // const limitQuery = pageQuery.limit(limit);
  // //fields limiting
  // let fields = '-__V';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log(fields);
  // }
  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .pagination()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getOneStudentFromDb = async (id: string) => {
  // const result = Student.findOne({ id });
  // return result;

  const result = Student.findOne({ id });

  return result;
};
const updateStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  // const result = Student.findOne({ id });
  // return result;
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian${key}`] = value;
    }
  }

  const result = Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }

    const deleteUser = User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};
export const StudentServices = {
  getAllStudentFromDb,
  getOneStudentFromDb,
  deleteStudentFromDb,
  updateStudentFromDb,
};
