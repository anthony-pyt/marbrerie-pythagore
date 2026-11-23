import axios from "axios";

// Espace d'administration du site (23/11/2026) : connexion par identifiant et mot de passe auprès du serveur du site
// (BFF), qui garde les jetons d'auth-api dans des cookies chiffrés httpOnly. Le navigateur ne voit jamais de jeton ;
// seul le nom affiché est gardé dans localStorage (auteur des articles).

export async function login({ email, password }) {
  const response = await axios.post("/api/auth/login", { login: email, password });
  const user = response.data?.user ?? null;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function logout() {
  try {
    await axios.post("/api/auth/logout");
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
  localStorage.removeItem("user");
}

export async function isUserLoggedIn() {
  try {
    return (await axios.get("/api/auth/session")).status === 200;
  } catch {
    return false;
  }
}
