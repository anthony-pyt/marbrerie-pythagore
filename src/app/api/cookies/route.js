"use server";

import { cookies } from "next/headers";

export async function GET(data) {
    const { name } = await data.json();
  const token = cookies().get(name);

  if (!token) {
    return new Response("Session expirée", { status: 401 });
  }

  return new Response("Session valide", { status: 200 });
}

export async function DELETE(data) {
  const { name } = await data.json();
  cookies().delete(name);
  return new Response("Cookie supprimé", { status: 200 });
}
