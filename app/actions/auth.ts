"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { LoginFormSchema, SignupFormSchema, type FormState } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";
import { hashPassword, verifyPassword } from "@/app/lib/password";

export async function login(_state: FormState | undefined, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await verifyPassword(user.id, password, user.password))) {
    return { message: "Invalid username or password" };
  }

  await createSession(user.id, user.role);
  redirect("/dashboard");
}

export async function signup(_state: FormState | undefined, formData: FormData): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    name: formData.get("name"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, name, password } = validatedFields.data;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { username, name, password: hashedPassword, role: "2" },
    });

    await createSession(user.id, user.role);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return { errors: { username: ["Username is already in use"] } };
    }

    return { message: "Unable to create your account" };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}