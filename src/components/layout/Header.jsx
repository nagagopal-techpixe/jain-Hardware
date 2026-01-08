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
import { categories } from "../../data/categories.jsx";
import Badge from "../ui/Badge.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../context/StoreContext"; 
import { useState } from "react";
export default function Header() {
  const { cart, view, setView, user, login, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
const BRAND_COLOR = "bg-red-700";
const BRAND_TEXT = "text-red-700";
const BRAND_BORDER = "border-red-700";
const HOVER_COLOR = "hover:bg-red-800";
  const navLinks = [
    { label: 'Home', value: 'home' },
    { label: 'Products', value: 'products' },
    { label: 'Bulk Orders', value: 'products' }, // B2B Link
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> Industrial Estate, Hyderabad</span>
          </div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">Track Order</span>
            <span className="cursor-pointer hover:text-white">Support</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className={`w-10 h-10 ${BRAND_COLOR} rounded-lg flex items-center justify-center text-white`}>
              <Wrench size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">JAIN</h1>
              <p className="text-xs text-gray-500 font-medium tracking-widest">HARDWARE</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search tools, electrical, plumbing..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative group">
              <button 
                onClick={() => user.isLoggedIn ? setView('dashboard') : login()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
              >
                <User size={24} />
              </button>
              {user.isLoggedIn && (
                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md py-2 hidden group-hover:block border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                    </div>
                    <button onClick={() => setView('dashboard')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Dashboard</button>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
                 </div>
              )}
            </div>

            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-700"
              onClick={() => setView('cart')}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </button>

            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex gap-8">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => setView(link.value)}
                  className={`py-3 text-sm font-medium border-b-2 border-transparent hover:${BRAND_TEXT} hover:border-red-600 transition-all ${view === link.value ? `border-red-600 ${BRAND_TEXT}` : 'text-gray-600'}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            {/* Quick Categories Dropdown (Simplified) */}
             <li className="relative group">
               <button className="py-3 text-sm font-medium text-gray-600 hover:text-red-700 flex items-center gap-1">
                 Shop by Category <ChevronRight size={14} className="rotate-90"/>
               </button>
               <div className="absolute left-0 top-full bg-white shadow-xl rounded-lg border border-gray-100 p-4 w-[600px] hidden group-hover:grid grid-cols-3 gap-4 z-50">
                 {categories.slice(0, 9).map(cat => (
                   <button key={cat.id} onClick={() => setView('products')} className="text-left text-sm hover:text-red-700 text-gray-600">
                     {cat.name}
                   </button>
                 ))}
                 <button onClick={() => setView('products')} className="text-left text-sm font-bold text-red-700 col-span-3">View All Categories &rarr;</button>
               </div>
             </li>
            <li className="ml-auto flex items-center">
              <span className={`text-xs font-bold px-2 py-1 bg-red-50 ${BRAND_TEXT} rounded uppercase tracking-wider`}>B2B Wholesale Available</span>
            </li>
          </ul>
        </div>
      </nav>

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