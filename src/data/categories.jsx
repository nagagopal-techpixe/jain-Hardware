// data/Categories.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export const staticCategories = [
  { id: 1, name: "Power Tools", image: "..." },
  { id: 2, name: "Aluminium Ladders", image: "..." },
  // ...
];

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/category/")
      .then(res => {
        // setCategories(res.data);
        setCategories(res.data.data || []); // extract the array inside 'data'

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setCategories(staticCategories); // fallback to static data
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}
