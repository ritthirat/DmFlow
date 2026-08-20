import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number");

export const LoginFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const SignupFormSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
};