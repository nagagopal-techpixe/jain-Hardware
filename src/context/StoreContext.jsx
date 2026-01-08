import { createContext, useContext, useState, useEffect, useRef } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ name: "Guest", isLoggedIn: false });
  const [toasts, setToasts] = useState([]);

  // ---- PRODUCT STATE ----
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- PAGINATION ----
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / pageSize);

  // 🔥 AMAZON STYLE CACHE
  const pageCache = useRef({}); // { pageNumber: products[] }

  // ---- FETCH PRODUCTS ----
  const fetchProducts = async (pageNumber = 1) => {
    // ✅ 1️⃣ SERVE FROM CACHE (INSTANT)
    if (pageCache.current[pageNumber]) {
      setProducts(pageCache.current[pageNumber]);
      setPage(pageNumber);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/api/all-products/?page=${pageNumber}&page_size=${pageSize}`
      );

      const data = await res.json();

      const mapped = data.results.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        subCategory: product.subCategory,
        price: product.product_type[0]?.price || 0,
        description: product.description, 
         specifications: product.specifications || [],
        oldPrice:
          (product.product_type[0]?.price || 0) +
          (product.discount_regular || 0),
        rating: 2.5, // Placeholder rating  
        reviews: 40,
        stock: product.product_type[0]?.stock_quantity > 0,
        sku: product.public_id,
        image: product.images[0]?.image || "",
        images: product.images?.map(img => img.image) || []
      }));

      // ✅ SAVE TO CACHE
      pageCache.current[pageNumber] = mapped;

      setProducts(mapped);
      // console.log("Fetched products for page", mapped);
      setCount(data.count);
      setPage(pageNumber);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- PREFETCH NEXT PAGE (AMAZON TRICK) ----
  useEffect(() => {
    const next = page + 1;
    if (next <= totalPages && !pageCache.current[next]) {
      fetch(
        `http://127.0.0.1:8000/api/all-products/?page=${next}&page_size=${pageSize}`
      )
        .then(res => res.json())
        .then(data => {
          pageCache.current[next] = data.results.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category,
            subCategory: product.subCategory,
            price: product.product_type[0]?.price || 0,
            // description: product.description, 
            oldPrice:
              (product.product_type[0]?.price || 0) +
              (product.discount_regular || 0),
            rating: 0,
            reviews: 0,
            // stock: product.product_type[0]?.stock_quantity > 0,
            stock: (product.product_type?.[0]?.stock_quantity ?? 0) > 0,
            sku: product.public_id,
            // image: product.images[0]?.image || "",
            image: product.images?.[0]?.image ?? "/placeholder.png",
            images: product.images?.map(img => img.image) || []

          }));
        })
        .catch(() => {});
    }
  }, [page, totalPages]);

  // Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // ---- PAGINATION ACTIONS ----
  const nextPage = () => {
    if (page < totalPages) fetchProducts(page + 1);
  };

  const prevPage = () => {
    if (page > 1) fetchProducts(page - 1);
  };

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) fetchProducts(p);
  };

  // ---- TOASTS ----
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts(prev => prev.filter(t => t.id !== id)),
      3000
    );
  };

  // ---- CART ----
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    addToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id) =>
    setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, delta) =>
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

  // ---- USER ----
  const login = () => {
    setUser({
      name: "Rahul Jain",
      email: "rahul@jainhardware.com",
      isLoggedIn: true,
    });
    addToast("Welcome back, Rahul!");
  };

  const logout = () => {
    setUser({ name: "Guest", isLoggedIn: false });
    setView("home");
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
        view, setView,
        cart, addToCart, removeFromCart, updateQuantity,
        user, login, logout,
        toasts, addToast,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
export default StoreContext;
