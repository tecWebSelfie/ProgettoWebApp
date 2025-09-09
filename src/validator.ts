import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(8, "Password must be 8-30 characters long")
  .max(30, "Password must be 8-30 characters long")
  .regex(
    /^(?!.*(password|1234|qwerty|test)).*$/i,
    "Password must not contain known weak words (es. '1234','password', 'qwerty', 'test')",
  )
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/^(?=.*\d.*\d).*$/, "Password must contain at least two numbers")
  .regex(
    /[@$!%*?&"{|}`_^=;:.\[\],(+)'\\/-]/,
    "Password must contain at least one special character",
  )
  .regex(
    /^\S.*\S$/,
    "Password must not start or end with a whitespace character",
  );
const confirmPasswordSchema = z.string();
const nameSchema = z.string().min(2, "Name must be at least 2 characters long");
const surnameSchema = z
  .string()
  .min(2, "Surname must be at least 2 characters long");
const birthdaySchema = z
  .date()
  .min(new Date("1900-01-01"), "Too old")
  .max(new Date(), "Too young");
const locationSchema = z.string();
const photoSchema = z
  .any()
  .nullable()
  .refine(
    (file: { size: number }) => !file || file.size < 5000000,
    "File can't be bigger than 5MB.",
  )
  .refine(
    (file: { type: any }) =>
      !file || ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
    {
      message: "File format must be either jpg, jpeg or png.",
    },
  );
const is_techSchema = z.boolean();
const usernameSchema = z
  .string()
  .min(5, "Username must be at least 5 characters long");

const signUpFormSchemaObj = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    surname: surnameSchema,
    location: locationSchema,
    username: usernameSchema,
    birthday: birthdaySchema,
    photo: photoSchema,
    is_tech: is_techSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export {
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
  nameSchema,
  surnameSchema,
  usernameSchema,
  is_techSchema,
  photoSchema,
  locationSchema,
  birthdaySchema,
  signUpFormSchemaObj,
};
