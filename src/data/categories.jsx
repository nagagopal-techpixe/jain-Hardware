// data/Categories.jsx
import { useState, useEffect } from "react";
import axios from "axios";

// Fallback static categories in case API fails
export const staticCategories = [
  { id: 1, name: "Power Tools", image: "..." },
  { id: 2, name: "Aluminium Ladders", image: "..." },
];

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jain.bteam11.com/api/category/")
      .then((res) => {
        setCategories(res.data?.data || staticCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setCategories(staticCategories);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}