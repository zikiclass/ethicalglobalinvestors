import { z } from "zod";
export const registerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required").max(255),
    last_name: z.string().min(1, "Last name is required").max(255),
    mobile: z.string().min(1, "Mobile is required"),
    accounttype: z.string().min(1, "Account type is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(4, "Password should be at least 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password should be at least 4 characters"),
    currency: z.string().min(1, "Currency is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
export const userSchema = z.object({
  email: z.string().min(1, "Email is required"),
});
export const signalSchema = z.object({
  action: z.string(),
  leverage: z.string(),
  amount: z.string(),
  profit: z.string(),
});
export const adminSchema = z
  .object({
    firstname: z.string().min(1, "First name is required").max(255),
    lastname: z.string().min(1, "Last name is required").max(255),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(4, "Password should be at least 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password should be at least 4 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordSchema = z.object({
  password: z.string().min(4, "Password should be at least 4 characters"),
  newPassword: z.string().min(4, "Password should be at least 4 characters"),
  confirmPassword: z
    .string()
    .min(4, "Password should be at least 4 characters"),
});
