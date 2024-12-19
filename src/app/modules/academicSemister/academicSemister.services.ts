import { AcademicSemeterNameMapCode } from './academicSemister.constant';
import { TAcademicSemester } from './academicSemister.interface';
import { AcademicSemester } from './academicSemister.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (AcademicSemeterNameMapCode[payload.name] !== payload.code) {
    throw new Error('Invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAllAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const UpdateAcademicSemesterFromDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemeterNameMapCode[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAllAcademicSemesterFromDb,
  UpdateAcademicSemesterFromDb,
};
