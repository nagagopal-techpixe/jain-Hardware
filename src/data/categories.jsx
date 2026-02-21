// data/Categories.jsx
import { useState, useEffect } from "react";
import API from "./api"; // import your centralized axios instance

// Fallback static categories in case API fails
export const staticCategories = [
  { id: 1, name: "Power Tools", image: "..." },
  { id: 2, name: "Aluminium Ladders", image: "..." },
  // add more if needed
];

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use centralized API instance instead of raw axios
    API.get("category/") // baseURL is already set in API
      .then(res => {
        setCategories(res.data.data || staticCategories); // fallback if data missing
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
        setCategories(staticCategories); // fallback to static data
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}
