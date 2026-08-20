import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getSession } from "./session";

export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    redirect("/login");
  }

  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session?.userId) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, name: true, role: true },
  });
});