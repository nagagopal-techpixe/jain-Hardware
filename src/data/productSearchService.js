import axios from "axios";

export const searchProductByName = async (searchTerm) => {
  try {
    const res = await axios.get(
      "https://jain.bteam11.com/api/product-search/",
      {
        params: { search: searchTerm }
      }
    );

    return res.data?.data?.results || [];
  } catch (error) {
    console.error("Search error:", error.response?.data || error.message);
    return [];
  }
};