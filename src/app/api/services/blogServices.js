import axios from "axios";
import { isUserLoggedIn } from "../services/authServices";

export default function useBlogServices() {
  const fetchArticles = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/get_articles`
    );
    return response;
  };

  const fetchArticle = async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/articles/${id}`
    );
    return response.data;
  };

  const storeArticle = async (data) => {

    // const loggedIn = await isUserLoggedIn(); // Vérifie si l'utilisateur est connecté

    // if (!loggedIn) {
    //   // Si l'utilisateur n'est pas connecté, redirige vers la page de login
    //   window.location.href = "/login"; // Redirige l'utilisateur vers la page de connexion
    //   return;
    // }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/store_article`, data
    );
    return response;
  };

  return {
    fetchArticles,
    fetchArticle,
    storeArticle
  };

}
