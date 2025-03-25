import axios from "axios";
import gateway_instance from "../../lib/gatewayInstance";

export async function getCsrfCookie() {
  await gateway_instance.get("/sanctum/csrf-cookie");
}

export async function login(data) {
  await getCsrfCookie();
  const response = await gateway_instance.post("/api/login", data);
  const user = response.data
  
  localStorage.setItem("user", JSON.stringify(user)); 
}

export async function logout() {
  await gateway_instance.post("/api/logout");
  // Appel à l'API pour supprimer le cookie côté serveur
  try {
    await axios.delete("/api/cookies", {
      headers: {
        "Content-Type": "application/json", // Ajoute les headers pour JSON
      },
      data: {
        name: "pythagore_gateway_session", // Envoie un objet JSON avec le nom du cookie
      },
    });
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Erreur lors de la suppression du cookie", error);
  }
}

// export async function isUserLoggedIn() {
//   try {
//     const response = await gateway_instance.get("/api/cookies", {
//       params: { name: "pythagore_gateway_session" }, // Passe le nom du cookie à vérifier
//     });

//     if (response.status === 200) {
//       return true; // Si la session est valide
//     } else {
//       return false; // Si la session est invalide
//     }
//   } catch (error) {
//     console.error("Erreur lors de la vérification de la session", error);
//     return false; // En cas d'erreur, on considère que la session n'est pas valide
//   }
// }
