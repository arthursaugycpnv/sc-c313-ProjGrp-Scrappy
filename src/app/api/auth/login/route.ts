import { NextResponse } from "next/server";

import { loginUser } from "@/lib/auth/user-store";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | {
    email?: string;
    password?: string;
  };

  const email = body?.email ?? "";
  const password = body?.password ?? "";

  const result = loginUser(email, password);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  await setSessionCookie(`user:${result.user.id}`);
  return NextResponse.json({ ok: true });
}
