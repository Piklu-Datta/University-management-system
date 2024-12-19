import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.createOfferedCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
};
