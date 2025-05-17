import { z } from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  bloodType: z.string().optional().or(z.literal("")),
  medicalHistory: z.string().optional(),
  languagePreference: z.string().optional().or(z.literal("")),
  emergencyContact: z.string().optional().or(z.literal("")),
  nationalId: z.string().optional().or(z.literal("")),
  insuranceProvider: z.string().optional().or(z.literal("")),
  insuranceNumber: z.string().optional().or(z.literal("")),
  notes: z.string().optional(),
});
