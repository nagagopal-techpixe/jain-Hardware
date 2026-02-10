import React from "react";
import { 
  Phone,
  MapPin,
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  ChevronRight,
  Wrench
} from "lucide-react";
// import { categories } from "../../data/categories.jsx";
import { useCategories } from "../../data/Categories.jsx";
import Badge from "../ui/Badge.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../context/StoreContext"; 
import { useState } from "react";
export default function Header() {
  const { categories, loading: categoriesLoading } = useCategories();

  const { cart, view, setView, user, login, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const cartCount = Array.isArray(cart)
  ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
  : 0;

  // console.log("Categories in Header:", categories);
const BRAND_COLOR = "bg-red-700";
const BRAND_TEXT = "text-red-700";
const BRAND_BORDER = "border-red-700";
const HOVER_COLOR = "hover:bg-red-800";
  const navLinks = [
    { label: 'Home', value: 'home' },
    { label: 'Products', value: 'products' },
    { label: 'Bulk Orders', value: 'products' }, // B2B Link
  ];
const handleCartClick = () => {
  const token = localStorage.getItem("access"); // adjust key if needed
// console.log("Cart click, token:", token);
  if (!token) {
    // Not logged in → go to login
    setView("login");
  } else {
    // Logged in → go to cart
    setView("cart");
  }
};

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-gray-300 hidden md:block">

  <div className="w-full px-2 py-3 flex justify-between items-center">

    <div className="flex gap-6 text-base font-medium ml-2">
      <span className="flex items-center gap-2">
        <Phone size={16} />
        +91 98765 43210
      </span>

      <span className="flex items-center gap-2">
        <MapPin size={16} />
        Industrial Estate, Hyderabad
      </span>
    </div>

    <div className="flex gap-6 text-base font-medium mr-2">
      <span className="cursor-pointer hover:text-white">
        Track Order
      </span>

      <span className="cursor-pointer hover:text-white">
        Support
      </span>
    </div>

  </div>

</div>


    {/* Main Header */}
<div className="bg-white border-b border-gray-200">
  <div className="w-full px-2">

    <div className="flex items-center h-20">

      {/* Logo */}
      <div
        onClick={() => setView("home")}
        className="flex items-center gap-2 cursor-pointer min-w-[200px]"
      >
        <div
          className={`w-9 h-9 ${BRAND_COLOR} rounded-md flex items-center justify-center text-white`}
        >
          <Wrench size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold leading-none">JAIN</h1>
          <p className="text-[10px] text-gray-500 tracking-widest">
            HARDWARE
          </p>
        </div>
      </div>


      {/* Menu */}
      <ul className="flex items-center gap-10 ml-10">

        {/* Home */}
        <li>
          <button
            onClick={() => setView("home")}
            className={`text-sm font-semibold ${
              view === "home"
                ? "text-red-700"
                : "text-gray-700 hover:text-red-700"
            }`}
          >
            Home
          </button>
        </li>

        {/* Products */}
        <li>
          <button
            onClick={() => setView("products")}
            className={`text-sm font-semibold ${
              view === "products"
                ? "text-red-700"
                : "text-gray-700 hover:text-red-700"
            }`}
          >
            Products
          </button>
        </li>


        {/* Shop By Category */}
        <li className="relative group">

          <button
            className="
              text-sm font-semibold
              text-gray-700
              hover:text-red-700
              flex items-center gap-1
            "
          >
            Shop by Category

            <ChevronRight
              size={14}
              className="
                -rotate-90
                transition-transform
                duration-200
                group-hover:rotate-90
              "
            />
          </button>


          {/* Dropdown */}
          <div
            className="
              absolute left-0 top-full
              bg-white
              shadow-xl
              rounded-md
              border
              border-gray-100
              p-4
              w-[600px]
              hidden
              group-hover:grid
              grid-cols-3
              gap-4
              z-50
            "
          >
            {!categoriesLoading && categories?.length ? (
              categories.slice(0, 9).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setView("products")}
                  className="text-left text-sm text-gray-600 hover:text-red-700"
                >
                  {cat.name}
                </button>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400">
                Loading...
              </p>
            )}

            <button
              onClick={() => setView("products")}
              className="col-span-3 text-left text-sm font-semibold text-red-700"
            >
              View All →
            </button>
          </div>

        </li>


        {/* Contact */}
        <li>
          <button
            onClick={() => setView("contact")}
            className="text-sm font-semibold text-gray-700 hover:text-red-700"
          >
            Contact
          </button>
        </li>

      </ul>


      {/* Right Section */}
      <div className="ml-auto flex items-center gap-4">

        {/* Search */}
        <div className="relative w-[320px]">

          <input
            type="text"
            placeholder="Search / ابحث"
            className="
              w-full
              h-10
              pl-4
              pr-20
              bg-gray-100
              rounded-md
              text-sm
              focus:outline-none
            "
          />

          <button
            className="
              absolute right-0 top-0
              h-full px-5
              bg-blue-900
              text-white
              text-sm font-medium
              rounded-r-md
              hover:bg-blue-800
            "
          >
            SEARCH
          </button>

        </div>


        {/* User */}
        <button
          onClick={() =>
            user.isLoggedIn ? setView("dashboard") : login()
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <User size={22} />
        </button>


        {/* Cart */}
        <button
          onClick={handleCartClick}
          className="relative p-2 hover:bg-gray-100 rounded-full"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </button>

      </div>

    </div>

  </div>
</div>



      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full p-2 bg-gray-50 border rounded-md mb-2"
              />
              {navLinks.map((link, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    setView(link.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-3 px-2 border-b border-gray-50 font-medium text-gray-700"
                >
                  {link.label}
                </button>
              ))}
              {user.isLoggedIn ? (
                <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className="text-left py-3 px-2 font-medium text-gray-700">My Dashboard</button>
              ) : (
                <button onClick={() => { login(); setIsMobileMenuOpen(false); }} className={`text-left py-3 px-2 font-medium ${BRAND_TEXT}`}>Login / Register</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};