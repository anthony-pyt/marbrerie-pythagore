import axios from "axios";

export default function useTagService() {
  const fetchTags = async () => {
    const response = await axios.get(
      `/api/web-api/blog/tags`
    );
    return response.data;
  };

  return {
    fetchTags,
  };
}
