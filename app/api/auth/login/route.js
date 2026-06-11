import { NextResponse } from "next/server";
import { verifyCredentials, SESSION_COOKIE, getSessionValue } from "@/lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();
  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: getSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
  return res;
}
