import React, { useState } from "react";
import { SEARCH_SUGGESTIONS } from "../../data/SEARCH_SUGGESTIONS.js";
import logo from "../../assests/taj_mahal_jain_logo.png"
import {
  Phone,
  MapPin,
  ShoppingCart,
  User,
  Wrench,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useCategories } from "../../data/Categories.jsx";
import Badge from "../ui/Badge.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../context/StoreContext";

export default function Header() {
const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();

  const {
    cart,
      authLoading,
    view,
    setView,
    user,
    login,
    logout,
    setViewWithCategory
  } = useStore();

  /* ---------------- States ---------------- */

  const [searchInput, setSearchInput] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);        // Desktop
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false); // Mobile

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  /* ---------------- Cart Count ---------------- */

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  const BRAND_COLOR = "bg-red-700";
  const BRAND_TEXT = "text-red-700";

  /* ---------------- Handlers ---------------- */

  const handleCartClick = () => {
    const token = localStorage.getItem("access");

    if (!token) setView("login");
    else setView("cart");
  };

  const handleSearch = () => {
    if (!searchInput) return;

    setViewWithCategory("products", searchInput);
    setSearchInput("");
    setShowSuggestions(false);
    setShowMobileSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  /* ---------------- Filter Suggestions ---------------- */

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(item =>
    item.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  /* ====================================================== */

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b">

      {/* ================= Top Bar ================= */}
      <div className="bg-gray-900 text-gray-300 hidden md:block">
        <div className="w-full px-2 py-3 flex justify-between items-center">

          <div className="flex gap-6 text-base font-medium ml-2">
            <span className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={16} /> Industrial Estate, Hyderabad
            </span>
          </div>

          <div className="flex gap-6 text-base font-medium mr-2">
            <span className="cursor-pointer hover:text-white">Track Order</span>
            <span className="cursor-pointer hover:text-white">Support</span>
          </div>

        </div>
      </div>

      {/* ================= Main Header ================= */}
      <div className="bg-white border-b">

        <div className="w-full px-4">

          <div className="flex items-center h-20 w-full">

            {/* ========== Logo ========== */}
            <div
              onClick={() => setView("home")}
              className="flex items-center gap-2 cursor-pointer min-w-[200px]"
            >
      <div className="w-24 h-24 flex items-center justify-center">
  <img
    src={logo}
    alt="Logo"
    className="w-24 h-24 object-contain"
  />
</div>




              <div>
                <h1 className="text-lg font-bold">Taj Mahal Jain</h1>
                {/* <p className="text-[10px] text-gray-500 tracking-widest">
                  HARDWARE
                </p> */}
              </div>
            </div>

            {/* ========== Mobile Toggle ========== */}
        {/* ========== Mobile Icons ========== */}
<div className="md:hidden ml-auto flex items-center gap-2">

  {/* Cart */}
  <button
    onClick={handleCartClick}
    className="relative p-2 rounded-md border"
  >
    <ShoppingCart size={20} />

    {cartCount > 0 && <Badge>{cartCount}</Badge>}
  </button>

  {/* Menu Toggle */}
  <button
    onClick={() => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      setShowMobileSuggestions(false);
    }}
    className="p-2 rounded-md border"
  >
    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>

</div>


            {/* ========== Desktop Menu ========== */}
            <ul className="hidden md:flex items-center gap-10 ml-10">

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

              {/* Categories */}
              <li className="relative group">

                <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-red-700">
                  Shop by Category
                  <ChevronRight
                    size={14}
                    className="-rotate-90 group-hover:rotate-90 transition"
                  />
                </button>

                <div className="absolute left-0 top-full bg-white shadow-xl border rounded p-4 w-[600px] hidden group-hover:grid grid-cols-3 gap-4 z-50">

                  {!categoriesLoading && categories?.length ? (

                    categories.slice(0, 9).map(cat => (
                      <button
                        key={cat.id}
                        onClick={() =>
                         setViewWithCategory("products", cat.public_id)
                        }
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

              <li>
                <button
                  onClick={() => setView("contact")}
                  className="text-sm font-semibold text-gray-700 hover:text-red-700"
                >
                  Contact
                </button>
              </li>

            </ul>

            {/* ========== Desktop Right ========== */}
            <div className="hidden md:flex ml-auto items-center gap-4">

              {/* Search */}
              <div className="relative w-[320px]">

                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="w-full h-10 pl-4 pr-20 bg-gray-100 rounded text-sm"
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-5 bg-red-900  text-white text-sm rounded-r"
                >
                  SEARCH
                </button>

                {/* Desktop Suggestions */}
                {showSuggestions && searchInput && (
                  <ul className="absolute w-full bg-white border shadow rounded mt-1 max-h-60 overflow-y-auto z-50">

                    {filteredSuggestions.map((item, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setViewWithCategory("products", item);
                          setSearchInput("");
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item}
                      </li>
                    ))}

                  </ul>
                )}

              </div>

            {/* User Menu */}
<div className="relative">

  {/* User Icon */}
  <button
    onClick={() => setUserMenuOpen(!userMenuOpen)}
    className="p-2 hover:bg-gray-100 rounded-full"
  >
    <User size={22} />
  </button>

  {/* Dropdown */}
{userMenuOpen && !authLoading && (

    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50">

      {user.isLoggedIn ? (
        <>
          {/* Dashboard */}
          <button
            onClick={() => {
              setView("dashboard");
              setUserMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              setUserMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </>
      ) : (
       <button
  onClick={() => {
    setView("login");     // 👈 THIS is important
    setUserMenuOpen(false);
  }}
  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
>
  Login
</button>

      )}

    </div>
  )}

</div>
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

      {/* ================= Mobile Menu ================= */}
      <AnimatePresence>

        {isMobileMenuOpen && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >

            <div className="p-4 flex flex-col gap-2">

              {/* ===== Mobile Search ===== */}
              <div className="relative mb-3">

                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowMobileSuggestions(true);
                  }}
                  onFocus={() => setShowMobileSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowMobileSuggestions(false), 200)
                  }
                  className="w-full p-2 border rounded text-sm"
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-900 text-white text-xs rounded"
                >
                  Go
                </button>

                {/* Mobile Suggestions */}
                {showMobileSuggestions && searchInput && (
                  <ul className="absolute w-full bg-white border shadow rounded mt-1 max-h-48 overflow-y-auto z-50">

                    {filteredSuggestions.map((item, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setViewWithCategory("products", item);
                          setSearchInput("");
                          setShowMobileSuggestions(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}

                  </ul>
                )}

              </div>

              {/* Home */}
              <button
                onClick={() => {
                  setView("home");
                  setIsMobileMenuOpen(false);
                }}
                className="py-3 px-2 border-b text-left font-medium"
              >
                Home
              </button>

              {/* Products */}
              <button
                onClick={() => {
                  setView("products");
                  setIsMobileMenuOpen(false);
                }}
                className="py-3 px-2 border-b text-left font-medium"
              >
                Products
              </button>

              {/* Categories Toggle */}
              <button
                onClick={() =>
                  setShowMobileCategories(!showMobileCategories)
                }
                className="flex justify-between items-center py-3 px-2 border-b font-medium"
              >
                Shop by Category
                <ChevronRight
                  size={16}
                  className={`transition ${
                    showMobileCategories ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Categories */}
              {showMobileCategories && (

                <div className="pl-4 py-2 bg-gray-50 rounded">

                  {!categoriesLoading && categories?.length ? (

                    categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                         setViewWithCategory("products", cat.public_id);
                          setIsMobileMenuOpen(false);
                          setShowMobileCategories(false);
                        }}
                        className="block text-left text-sm py-1 text-gray-600"
                      >
                        {cat.name}
                      </button>
                    ))

                  ) : (
                    <p className="text-sm text-gray-400">Loading...</p>
                  )}

                </div>
              )}

              {/* Contact */}
              <button
                onClick={() => {
                  setView("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="py-3 px-2 border-b text-left font-medium"
              >
                Contact
              </button>

              {/* Auth */}
              {user.isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setView("dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-3 px-2 text-left font-medium"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-3 px-2 text-left font-medium text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                  setView("login"); 
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-3 px-2 text-left font-medium ${BRAND_TEXT}`}
                >
                  Login / Register
                </button>
              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}
