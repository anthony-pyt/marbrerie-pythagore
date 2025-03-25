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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/store_article`,
      data
    );
    return response;
  };

  const updateArticle = async (id, data) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/update_article/${id}`,
      data
    );
    return response;
  }

  const deleteArticle = async (id) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/delete_article/${id}`    );
    return response;
  };

  return {
    fetchArticles,
    fetchArticle,
    storeArticle,
    updateArticle,
    deleteArticle,
  };
}
