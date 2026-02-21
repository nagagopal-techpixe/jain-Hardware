import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getCart, addToCart, updateCartItem, deleteCartItem } from "../data/APIFunctionsforCart.js";
import { placeOrder, fetchOrders } from "../data/APIFunctionsforCart.js";
// const StoreContext = createContext();
const StoreContext = createContext();
import { fetchUser } from "../data/userService";


export const StoreProvider = ({ children }) => {
  
 const [view, setView] = useState(
  localStorage.getItem("view") || "home"
);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [authLoading, setAuthLoading] = useState(true); // ✅ ADD THIS

  const [user, setUser] = useState({ name: "Guest", isLoggedIn: false });
  const [toasts, setToasts] = useState([]);
  const [authRequiredView, setAuthRequiredView] = useState(null);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
  localStorage.setItem("view", view);
}, [view]);

  const navigateToHome = () => {
  setView("home");                   // go to homepage view
  setSelectedCategory("All");        // reset filters
  setSelectedSubCategory("All");
  fetchProducts({ category: null, subCategory: null, page: 1 });
};

useEffect(() => {
  const token = localStorage.getItem("access");

  if (token) {
    restoreUser();
  } else {
    setAuthLoading(false);
  }
}, []);
const restoreUser = async () => {
  try {
    const res = await fetchUser();

    if (res.success) {
      setUser({ ...res.user, isLoggedIn: true });
    } else {
      setUser({ name: "Guest", isLoggedIn: false });
    }

  } catch (e) {
    setUser({ name: "Guest", isLoggedIn: false });
  } finally {
    setAuthLoading(false); // ✅ important
  }
};



const setViewWithCategory = (newView, categoryId = null) => {
  let cleanId = categoryId;

  // 🔥 Remove duplicate category like electrical/electrical
  if (typeof categoryId === "string" && categoryId.includes("/")) {
    cleanId = categoryId.split("/")[0];
  }

  setSelectedCategoryId(cleanId);
  setView(newView);
};
  // ---- PRODUCT STATE ----
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- PAGINATION ----
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / pageSize);

  // ---- CURRENT CATEGORY ----
  const [currentCategory, setCurrentCategory] = useState(null);

  // ---- CACHE (category + page) ----
  const pageCache = useRef({}); // { "category-page": products[] }

// ---- PLACE ORDER ----
const placeOrderHandler = async (shippingDetails, paymentMethod) => {
  // Build payload for backend
  const orderPayload = {
    shipping_address: shippingDetails,
    payment_method: paymentMethod,
    items: cart.map(item => ({
      product_type_id: item.product_type.id,
      quantity: item.quantity
    }))
  };
// in your StoreContext.js



  try {
    const res = await placeOrder(orderPayload);

    if (res.success) {
      setCart([]); // clear cart after order
      addToast("Order placed successfully!");
      await fetchOrdersHandler(); // refresh order history
      return true;
    } else {
     addToast(res.message || "Failed to place order", "error");

      return false;
    }
  } catch (err) {
    console.error(err);
    addToast("Error placing order", "error");
    return false;
  }
};

// ---- FETCH ORDERS ----
const fetchOrdersHandler = async () => {
  try {
    const res = await fetchOrders();
    if (res.success) {
      setOrders(res.data || []);
    } else {
      setOrders([]);
    }
  } catch (err) {
    console.error(err);
    setOrders([]);
  }
};
  // ---- FETCH PRODUCTS ----
  const fetchProducts = async ({ category = null, page = 1 } = {}) => {
    const cacheKey = `${category || "all"}-${page}`;

    // Serve from cache if exists
    if (pageCache.current[cacheKey]) {
      setProducts(pageCache.current[cacheKey]);
      setPage(page);
      setCurrentCategory(category || null);
      return;
    }

    try {
      setLoading(true);

      // Build API URL dynamically
      const url = new URL("https://jain.bteam11.com/api/all-products/");
      url.searchParams.append("page", page);
      url.searchParams.append("page_size", pageSize);
      if (category) url.searchParams.append("category", category);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!data.results) {
        console.error("API returned no results:", data);
        setProducts([]);
        setCount(0);
        return;
      }

 const mapped = data.results.map(product => {
  const pt = product.product_type?.[0]; // your first product type
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subCategory: product.subCategory,
    price: pt?.price || 0,
    product_type: pt ? { id: pt.id, price: pt.price, stock_quantity: pt.stock_quantity } : null, // ✅ attach product_type
    description: product.description,
    specifications: product.specifications || [],
    oldPrice: (pt?.price || 0) + (product.discount_regular || 0),
    rating: 2.5,
    reviews: 40,
    stock: pt?.stock_quantity > 0,
    sku: product.public_id,
    image: product.images?.[0]?.image || "/placeholder.png",
    images: product.images?.map(img => img.image) || [],
  };
});


      // Save to cache
      pageCache.current[cacheKey] = mapped;

      setProducts(mapped);
      setCount(data.count || 0);
      setPage(page);
      setCurrentCategory(category || null);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- PREFETCH NEXT PAGE ----
  useEffect(() => {
    const next = page + 1;
    const cacheKey = `${currentCategory || "all"}-${next}`;

    if (next <= totalPages && !pageCache.current[cacheKey]) {
      const url = new URL("https://jain.bteam11.com/api/all-products/");
      url.searchParams.append("page", next);
      url.searchParams.append("page_size", pageSize);
      if (currentCategory) url.searchParams.append("category", currentCategory);

      fetch(url.toString())
        .then(res => res.json())
        .then(data => {
          pageCache.current[cacheKey] = data.results.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category,
            subCategory: product.subCategory,
            price: product.product_type?.[0]?.price || 0,
            oldPrice:
              (product.product_type?.[0]?.price || 0) +
              (product.discount_regular || 0),
            rating: 0,
            reviews: 0,
            stock: (product.product_type?.[0]?.stock_quantity ?? 0) > 0,
            sku: product.public_id,
            image: product.images?.[0]?.image || "/placeholder.png",
            images: product.images?.map(img => img.image) || [],
          }));
        })
        .catch(() => {});
    }
  }, [page, totalPages, currentCategory]);

  // ---- INITIAL LOAD ----
  useEffect(() => {
    fetchProducts({ page: 1 });
  }, []);

  // ---- PAGINATION ----
  const nextPage = () => {
    if (page < totalPages) fetchProducts({ category: currentCategory, page: page + 1 });
  };

  const prevPage = () => {
    if (page > 1) fetchProducts({ category: currentCategory, page: page - 1 });
  };

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) fetchProducts({ category: currentCategory, page: p });
  };

  // ---- TOASTS ----
const addToast = (message, type) => {
  const finalType = type || "success"; // default only if not passed

  const id = Date.now();

  setToasts(prev => [
    ...prev,
    { id, message, type: finalType }
  ]);

  setTimeout(() => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, 3000);
};


  // ---- CART ----

const fetchCart = async () => {
  try {
    const res = await getCart();

    if (res && res.success && res.data && res.data.items) {
      // backend sends items as object → convert to array
      const itemsArray = Object.values(res.data.items);
      setCart(itemsArray);
    } else {
      setCart([]);
    }
  } catch (err) {
    console.error("Failed to fetch cart", err);
    setCart([]);
  }
};


const addToCartHandler = async (product, quantity = 1) => {
  console.log("Adding to cart:", product, quantity);

  // IMPORTANT: always send product_type.id
  const productTypeId = product.product_type?.id;
  if (!productTypeId) {
    console.error("No product_type ID found for product:", product);
    addToast("Cannot add this product to cart", "error");
    return;
  }

  try {
    const res = await addToCart(productTypeId, quantity);

  if (res.success) {
  await fetchCart();
  addToast(`Added ${product.name} to cart`);
} else {
  console.error("Add to cart error:", res);

  addToast(
    res.message || "Failed to add item to cart",
    "error" // 👈 IMPORTANT
  );
}

  } catch (err) {
    console.error("Add to cart exception:", err.response?.data || err.message);
    addToast("Failed to add item to cart", "error");
  }
}; 

const updateQuantityHandler = async (id, delta) => {
  // 1️⃣ Optimistically update local cart
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
            total_price: (item.total_price || 0) + (delta * (item.product_type?.price || 0))
          }
        : item
    )
  );

  // 2️⃣ Call backend in background
  try {
    const item = cart.find(i => i.id === id);
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    const res = await updateCartItem(id, { quantity: newQty });
    if (!res.success) {
      await fetchCart(); // fallback if API fails
    }
  } catch (err) {
    console.error(err);
    await fetchCart(); // fallback on error
  }
};


const removeFromCartHandler = async (id) => {
  try {
    const res = await deleteCartItem(id);

    if (res.success) {
      await fetchCart();
      addToast("Item removed from cart", "success"); // ✅ Success toast
    } else {
      addToast("Failed to remove item", "error");
    }

  } catch (err) {
    console.error(err);
    addToast("Failed to remove item", "error");
  }
};


useEffect(() => {
  fetchCart(); // always call cart API on load
}, []);


useEffect(() => {
  if (user.isLoggedIn) {
    fetchCart(); // refetch after login
  }
}, [user.isLoggedIn]);

  // ---- USER ----
 

// ---- USER ----

// Dynamic login using fetchUser
const login = async () => {
  const res = await fetchUser();

  if (res.success) {
    setUser({ ...res.user, isLoggedIn: true });
    addToast(`Welcome back, ${res.user.name}!`);
  } else {
    setUser({ name: "Guest", isLoggedIn: false });
    addToast("Please login", "error");
  }
};


// Logout
const logout = () => {
  // Remove tokens
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // Reset user
  setUser({ name: "Guest", isLoggedIn: false });

  // ✅ CLEAR CART
  setCart([]);

  // Optional: clear cached pages
  pageCache.current = {};

  // Go to login or home
  setView("login"); // better UX than home

  addToast("Logged out successfully");
};



  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setView("product-detail");
    window.scrollTo(0, 0);
  };

  return (
<StoreContext.Provider
  value={{
    view,
    setView,

    user,
    setUser,              // ✅ THIS LINE FIXES YOUR ERROR

    fetchCart,
    cart,

    authRequiredView,
    setAuthRequiredView,

    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    updateQuantity: updateQuantityHandler,

    login,
    authLoading,
    logout,
    toasts,
    addToast,

    products,
    loading,
    page,
    pageSize,
    count,
    totalPages,
    fetchProducts,
    nextPage,
    prevPage,
    goToPage,
    selectedProduct,
    navigateToProduct,
    
    currentCategory,
    selectedCategory,
    setSelectedCategory,
    setViewWithCategory,
     placeOrder: placeOrderHandler,
       navigateToHome,
    orders,
    fetchOrders: fetchOrdersHandler,
    selectedCategoryId
  }}
>
  {children}
</StoreContext.Provider>


  );
};

export const useStore = () => useContext(StoreContext);
export default StoreContext;
