import axios from "axios";

export default function useImageServices() {
  const fetchAllInspirationPhotos = async (limit = 0) => {
    console.log(
      `${process.env.NEXT_PUBLIC_API_STOCK_URL}/stock/inspirations?limit=${limit}`
    );
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_STOCK_URL}/stock/inspirations?limit=${limit}`
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchAllInspirationPhotos,
  };
}
