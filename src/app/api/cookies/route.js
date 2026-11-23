import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, value, maxAge } = await req.json();
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAge ?? 60 * 60 * 24 * 7, // 7 jours
    });

    return NextResponse.json({ message: "Cookie défini avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const cookieStore = await cookies();
    const token = cookieStore.get(name);

    if (!token) {
      return NextResponse.json({ message: "Session expirée" }, { status: 401 });
    }

    return NextResponse.json({ message: "Session valide", value: token.value }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { name } = await req.json();
    const cookieStore = await cookies();
    cookieStore.delete(name);
    return NextResponse.json({ message: "Cookie supprimé avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
