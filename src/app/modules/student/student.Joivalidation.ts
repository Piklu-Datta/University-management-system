import Joi from 'joi';

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().label("Father's name"),
  fatherOccupation: Joi.string().required().label("Father's occupation"),
  fatherContactNo: Joi.string().required().label("Father's contact number"),
  motherName: Joi.string().required().label("Mother's name"),
  motherOccupation: Joi.string().required().label("Mother's occupation"),
  motherContactNo: Joi.string().required().label("Mother's contact number"),
});

// UserName schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message('First Name must start with a capital letter'),
  middleName: Joi.string().optional().label('Middle name'),
  lastName: Joi.string().required(),
});

// LocalGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().label("Local guardian's name"),
  occupation: Joi.string().required().label("Local guardian's occupation"),
  contactNo: Joi.string().required().label("Local guardian's contact number"),
  address: Joi.string().required().label("Local guardian's address"),
});

// Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().label('Student ID'),
  name: userNameValidationSchema.required().label('Student name'),
  gender: Joi.string().valid('male', 'female').required().label('Gender'),
  dateOfBirth: Joi.string().optional().label('Date of birth'),
  email: Joi.string().email().required().label('Email'),
  ContactNo: Joi.string().required().label('Contact number'),
  emergencyContactNo: Joi.string().required().label('Emergency contact number'),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .label('Blood group'),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema
    .required()
    .label('Local guardian information'),
  profileImg: Joi.string(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .required()
    .label('Account status'),
});

export default studentValidationSchema;
