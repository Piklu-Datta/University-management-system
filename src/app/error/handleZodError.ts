import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSource = err?.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSource,
  };
};

export default handleError;
