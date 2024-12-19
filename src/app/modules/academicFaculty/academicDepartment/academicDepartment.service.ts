import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = AcademicDepartment.create(payload);
  return result;
};

const getAcademicDepartmentIntoDb = async () => {
  const result = AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentIntoDb = async (id: string) => {
  const result = AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload);
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAcademicDepartmentIntoDb,
  getSingleAcademicDepartmentIntoDb,
  updateAcademicDepartmentIntoDb,
};
