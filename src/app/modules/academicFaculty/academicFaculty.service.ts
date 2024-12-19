import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultyIntoDb = async () => {
  const result = AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyIntoDb = async (id: string) => {
  const result = AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAcademicFacultyIntoDb,
  getSingleAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
};
