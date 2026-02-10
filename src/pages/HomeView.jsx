import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Package, Phone, ChevronRight } from "lucide-react";

import { useStore } from "../context/StoreContext";
import { fetchBanners } from "../data/banners";
import { useCategories } from "../data/Categories.jsx";

import Button from "../components/ui/Button";
import ProductGrid from "../components/ui/ProductGrid.jsx";

export default function HomeView() {
  const { setViewWithCategory } = useStore();

  const [banners, setBanners] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { categories, loading: categoriesLoading } = useCategories();

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

      {/* HERO */}
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
                  <Button onClick={() => setViewWithCategory("products")}>
                    {banners[currentSlide]?.cta} <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx ? "bg-red-600 w-8" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
       <div className="relative flex items-center mb-10">

 <div className="mx-auto text-center relative mb-4">

  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
    Shop by Category
  </h3>

  {/* Underline */}
  <span className="block w-24 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-600 to-orange-400"></span>

  <p className="text-gray-500 text-sm md:text-base tracking-wide">
    Find exactly what you need
  </p>

</div>


         <button
  onClick={() => setViewWithCategory("products")}
  className="absolute right-0 text-red-700 font-medium flex items-center hover:underline"
>
  View All <ChevronRight size={16} />
</button>

          </div>

        <div className="px-6 md:px-10 lg:px-14">

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    {/* Changed lg:grid-cols-6 → lg:grid-cols-5 for bigger cards */}

    {!categoriesLoading ? (
      categories.map(cat => (
        <div
          key={cat.id}
          onClick={() => setViewWithCategory("products", cat.name)}
          className="bg-white 
                     border border-gray-200 
                     rounded-xl 
                     shadow-sm 
                     hover:shadow-md 
                     transition 
                     cursor-pointer 
                     overflow-hidden"
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="h-36 w-full object-contain p-4"
          />
          {/* Increased height + padding */}

          <div className="pb-5 text-center">
<h4 className="font-everest text-base font-normal text-gray-800">
  {cat.name}
</h4>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center col-span-5 text-gray-400">
        Loading categories...
      </p>
    )}

  </div>

</div>

        </div>
      </section>


     {/* FEATURED PRODUCTS */}
<section className="py-20 bg-white">

  <div className="container mx-auto px-4">

    {/* Section Title */}
    <div className="mx-auto text-center mb-14">

      <h3 className="text-3xl md:text-4xl font-bold text-black mb-3">
        Featured Products
      </h3>

      {/* Underline (Like Shop by Category) */}
      <span className="block w-32 h-[4px] mx-auto bg-gradient-to-r from-red-600 to-orange-400"></span>

    </div>

    {/* Keep Your Existing Card Style */}
    <ProductGrid limit={4} />

  </div>

</section>

    </div>
  );
}
