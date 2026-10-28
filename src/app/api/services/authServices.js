import axios from "axios";
import gateway_instance from "../../lib/gatewayInstance";

const getCsrfCookie = async () => await gateway_instance.get("/sanctum/csrf-cookie");

export async function login(data) {
  await getCsrfCookie();
  const response = await gateway_instance.post("/auth/login", data);
  const user = response.data;

  // Création du cookie de session côté Next.js pour autoriser le proxy (/admin)
  await axios.post("/api/cookies", {
    name: "pythagore_gateway_session",
    value: user?.id ? String(user.id) : "authenticated",
  });

  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function logout() {
  try {
    await gateway_instance.post("/auth/logout");
  } catch (error) {
    console.error("Erreur lors de la déconnexion gateway", error);
  }

  // Appel à l'API pour supprimer le cookie côté Next.js
  try {
    await axios.delete("/api/cookies", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: "pythagore_gateway_session",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du cookie", error);
  }

  localStorage.removeItem("user");
}

export async function isUserLoggedIn() {
  try {
    const response = await axios.get("/api/cookies", {
      params: { name: "pythagore_gateway_session" },
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
}
