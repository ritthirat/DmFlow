import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const sessionCookieName = "dmflow_session";
const sessionLifetimeSeconds = 60 * 60 * 24 * 7;

function getEncodedKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production");
  }

  return new TextEncoder().encode(secret ?? "dmflow-development-secret");
}

export type SessionPayload = {
  userId: number;
  role: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

export async function decrypt(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, getEncodedKey(), { algorithms: ["HS256"] });
    return payload as unknown as SessionPayload & { exp: number };
  } catch {
    return null;
  }
}

export async function createSession(userId: number, role: string) {
  const expiresAt = new Date(Date.now() + sessionLifetimeSeconds * 1000);
  const session = await encrypt({ userId, role });
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    maxAge: sessionLifetimeSeconds,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete(sessionCookieName);
}

export async function getSession() {
  const session = (await cookies()).get(sessionCookieName)?.value;
  return decrypt(session);
}