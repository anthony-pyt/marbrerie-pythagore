import axios from "axios";
import { isUserLoggedIn } from "../services/authServices";

export default function useBlogServices() {
  const countArticles = async () =>  {
    const response = await axios.get(
      `/api/web-api/blog/count_articles`
    );
    return response;
  }

  const fetchArticles = async () => {
    const response = await axios.get(
      `/api/web-api/blog/get_articles`
    );
    return response;
  };

  const fetchArticle = async (id) => {
    const response = await axios.get(
      `/api/web-api/blog/articles/${id}`
    );
    return response.data;
  };

  const storeArticle = async (data) => {
    const response = await axios.post(
      `/api/web-api/blog/store_article`,
      data
    );
    return response;
  };

  const updateArticle = async (id, data) => {
    const response = await axios.put(
      `/api/web-api/blog/update_article/${id}`,
      data
    );
    return response;
  }

  const deleteArticle = async (id) => {
    const response = await axios.delete(
      `/api/web-api/blog/delete_article/${id}`    );
    return response;
  };

  return {
    countArticles,
    fetchArticles,
    fetchArticle,
    storeArticle,
    updateArticle,
    deleteArticle,
  };
}
