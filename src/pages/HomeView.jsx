import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Package, Phone, ChevronRight } from "lucide-react";

import { useStore } from "../context/StoreContext";
import { fetchBanners } from "../data/banners";
import { categories } from "../data/categories";

import Button from "../components/ui/Button";
import ProductGrid from "../components/ui/ProductGrid.jsx";

export default function HomeView() {
  const { setView } = useStore();

  // ---------- BANNERS ----------
  const [banners, setBanners] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchBanners().then(data => {
      setBanners(data);
      setBannerLoading(false);
    });
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[400px] md:h-[500px] bg-gray-900 overflow-hidden">
        <AnimatePresence mode="wait">
          {!bannerLoading && banners.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />

              <img
                src={banners[currentSlide]?.image || ""}
                alt="Banner"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center text-white">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl"
                >
                  {banners[currentSlide]?.title}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-200 mb-8"
                >
                  {banners[currentSlide]?.subtitle}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button onClick={() => setView("products")}>
                    {banners[currentSlide]?.cta} <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------- Slider Dots -------- */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-red-600 w-8"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck size={32} />, title: "Genuine Products", desc: "100% Authentic Brands" },
            { icon: <Truck size={32} />, title: "Fast Delivery", desc: "Across India Shipping" },
            { icon: <Package size={32} />, title: "Bulk Orders", desc: "Special B2B Pricing" },
            { icon: <Phone size={32} />, title: "Expert Support", desc: "Technical Assistance" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-red-700">{feature.icon}</div>
              <div>
                <h4 className="font-bold">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">Shop by Category</h3>
              <p className="text-gray-500">Find exactly what you need</p>
            </div>
            <button
              onClick={() => setView("products")}
              className="text-red-700 font-medium flex items-center hover:underline"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => setView("products")}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="font-bold">{cat.name}</h4>
                  <p className="text-xs text-gray-400">
                    {cat.subCategories?.length || 0} Sub-categories
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-16 container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Featured Products</h3>
        <ProductGrid limit={4} />
      </section>
    </div>
  );
}
