import "server-only";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function verifyPassword(userId: number, password: string, storedPassword: string | null) {
  if (!storedPassword) return false;

  const isHash = /^\$2[aby]\$/.test(storedPassword);
  const valid = isHash ? await bcrypt.compare(password, storedPassword) : password === storedPassword;

  if (valid && !isHash) {
    await prisma.user.update({
      where: { id: userId },
      data: { password: await bcrypt.hash(password, 10) },
    });
  }

  return valid;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}