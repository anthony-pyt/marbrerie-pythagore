import axios from "axios";

export default function useTagService() {

    const fetchTags = async () => {
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
        
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/blog/tags`
        );
        return response.data;
    }

    return {
        fetchTags,
    }
}