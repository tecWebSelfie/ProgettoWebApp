import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?!.*(password|1234|qwerty)).*$/i,
    "Password must not contain known weak words (es. '1234','password') ",
  )
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");
const confirmPassword = z.string();
const nameSchema = z.string().min(2, "Name must be at least 2 characters long");

const surname = z.string().min(2, "Surname must be at least 2 characters long");
const birthday = z
  .date()
  .min(new Date("1900-01-01"), "Too old")
  .max(new Date(), "Too young");
const location = z.string();
const photo = z
  .any()
  .nullable()
  .refine((file: { size: number }) => !file || file.size < 5000000, {
    message: "File can't be bigger than 5MB.",
  })
  .refine(
    (file: { type: any }) =>
      !file || ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
    {
      message: "File format must be either jpg, jpeg or png.",
    },
  );
const is_tech = z.boolean();
const username = z
  .string()
  .min(5, { message: "Username must be at least 5 characters long" });

export {
  emailSchema,
  passwordSchema,
  confirmPassword,
  nameSchema,
  username,
  is_tech,
  photo,
  location,
  birthday,
  surname,
};
