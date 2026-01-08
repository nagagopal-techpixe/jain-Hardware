// products.js
export let products = []; // initially empty

// Fetch backend products and map to frontend format
export const fetchProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/all-products/");
    const data = await response.json();
 console.log("Raw API Response Count:", data.length);
    // Map backend format → frontend format
    products = data.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      price: product.product_type[0]?.price || 0,
      oldPrice: (product.product_type[0]?.price || 0) + (product.discount_regular || 0),
      rating: 0, // backend doesn't provide
      reviews: 0, // backend doesn't provide
      stock: product.product_type[0]?.stock_quantity > 0,
      sku: product.public_id,
      image: product.images[0]?.image || "",
    }));
    
    // console.log("Products loaded:", products);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
};

// Call fetchProducts immediately so products array is populated
fetchProducts();
