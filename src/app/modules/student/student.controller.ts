import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

//higher order function

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDb(req.query);
  //console.log(result);
  res.status(200).json({
    success: true,
    message: 'Student is retrieve successfully',
    data: result,
  });
});

const getOneStudent = catchAsync(async (req, res) => {
  const { studentTd } = req.params;
  const result = await StudentServices.getOneStudentFromDb(studentTd);

  res.status(200).json({
    success: true,
    message: 'Single student is retrieve successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentTd } = req.params;
  const result = await StudentServices.updateStudentFromDb(studentTd, req.body);

  res.status(200).json({
    success: true,
    message: 'student is updated successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentTd } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentTd);
  res.status(200).json({
    success: true,
    message: 'Single deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getOneStudent,
  deleteStudent,
  updateStudent,
};
