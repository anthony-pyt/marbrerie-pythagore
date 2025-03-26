import axios from "axios";

export default function useWarantyServices() {
  const fetchWaranties = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_STOCK_URL}/waranties`
    );
    return response.data;
  };

  return {
    fetchWaranties
  };
}
