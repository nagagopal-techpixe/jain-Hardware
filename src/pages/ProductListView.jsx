import { useState, useEffect } from "react";
import { Home, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";

const ProductListView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { addToCart, navigateToProduct, selectedCategoryId } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPrice, setFilterPrice] = useState(20000);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addingIds, setAddingIds] = useState([]);

  // ✅ CLEAN CATEGORY ID (IMPORTANT FIX)
  const cleanCategoryId = selectedCategoryId?.split("/")[0];

  // ✅ HANDLE CATEGORY CHANGE FROM STORE
  useEffect(() => {
    if (cleanCategoryId && categories.length > 0) {
      setSelectedCategory(cleanCategoryId);
      setSelectedSubCategory(null);
      setProducts([]);
      setPage(1);
    }
  }, [cleanCategoryId, categories.length]);

  // ✅ FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://jain.bteam11.com/api/category-list/"
        );
        const data = await res.json();
        const cats = data.data || [];
        setCategories(cats);

        if (!cleanCategoryId && cats.length > 0) {
          setSelectedCategory(cats[0].public_id);
        }
      } catch (err) {
        console.error("Category Error:", err);
      }
    };

    fetchCategories();
  }, []);

  // ✅ FETCH PRODUCTS
useEffect(() => {
  if (!selectedCategory || !selectedSubCategory) return;

  const fetchProducts = async () => {
    setLoading(true);
    setHasLoaded(false);   // 👈 important

    try {
      const res = await fetch(
        `https://jain.bteam11.com/api/sub-category/${selectedCategory}/${selectedSubCategory}/?page=${page}`
      );
      const data = await res.json();

      if (data.success) {
        setProducts(data.data.results || []);
        setTotalPages(data.data.total_pages || 1);
      }
    } catch (err) {
      console.error("Product Error:", err);
    } finally {
      setLoading(false);
      setHasLoaded(true);  // 👈 important
    }
  };

  fetchProducts();
}, [selectedCategory, selectedSubCategory, page]);

  const activeCategory = categories.find(
    (c) => c.public_id === selectedCategory
  );

  const subCategories = activeCategory?.subcategories || [];

  const filteredProducts = products.filter((product) => {
    const price = product.product_type?.[0]?.price || 0;
    return price <= filterPrice;
  });

  const handleAddToCart = async (product, firstType) => {
    setAddingIds((prev) => [...prev, product.id]);

    await addToCart(
      {
        id: product.id,
        name: product.name,
        product_type: {
          id: firstType.id,
          price: firstType.price,
          stock_quantity: firstType.stock_quantity,
        },
      },
      1
    );

    setAddingIds((prev) =>
      prev.filter((id) => id !== product.id)
    );
  };

  return (
  <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10">
    {/* 🔹 BREADCRUMB */}
    <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-4 md:mb-6 gap-2">
      <Home size={16} />
      <span>/</span>

      <span
        className="cursor-pointer hover:text-black"
        onClick={() => {
          setSelectedSubCategory(null);
          setProducts([]);
        }}
      >
        {activeCategory?.name}
      </span>

      {selectedSubCategory && (
        <>
          <span>/</span>
          <span className="text-black font-medium break-words">
            {selectedSubCategory}
          </span>
        </>
      )}
    </div>

    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* 🔹 SIDEBAR */}
    {/* 🔹 SIDEBAR */}
<div className="w-full lg:w-64 bg-white rounded-2xl shadow-sm p-4 md:p-6">
  <h3 className="font-bold mb-4 text-sm md:text-base">
    All Categories
  </h3>

  {/* 📱 Mobile Grid */}
  <ul className="grid grid-cols-2 gap-3 lg:block">
    {categories.map((cat) => (
      <li
        key={cat.id}
        onClick={() => {
          setSelectedCategory(cat.public_id);
          setSelectedSubCategory(null);
          setProducts([]);
        }}
        className={`cursor-pointer text-center lg:text-left px-3 py-2 rounded-xl text-sm transition ${
          selectedCategory === cat.public_id
            ? "bg-red-600 text-white"
            : "bg-gray-100 lg:bg-transparent hover:bg-gray-200 lg:hover:bg-gray-100"
        }`}
      >
        {cat.name}
      </li>
    ))}
  </ul>
</div>

      {/* 🔹 RIGHT SIDE */}
      <div className="flex-1">
        {/* SUBCATEGORIES */}
        {!selectedSubCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {subCategories.length === 0 ? (
              <div className="col-span-full text-center py-10 text-sm">
                No subcategories available
              </div>
            ) : (
              subCategories.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubCategory(sub.public_id);
                    setPage(1);
                  }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-4 md:p-6 text-center cursor-pointer"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="h-24 sm:h-28 md:h-32 mx-auto object-contain"
                  />
                  <h3 className="mt-3 md:mt-4 text-sm md:text-base font-semibold line-clamp-2">
                    {sub.name}
                  </h3>
                </div>
              ))
            )}
          </div>
        )}

        {/* PRODUCTS */}
        {selectedSubCategory && (
          <>
         {loading || !hasLoaded ? (
  <div className="text-center py-16 md:py-20 text-sm md:text-base">
    Loading products...
  </div>
) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 md:py-20">
                <Package
                  size={40}
                  className="mx-auto text-gray-300"
                />
                <p className="mt-2 text-sm">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => {
                  const image = product.images?.[0]?.image;
                  const firstType = product.product_type?.[0];

                  return (
                    <div
                      key={product.id}
                      onClick={() => navigateToProduct(product)}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-4 md:p-5 cursor-pointer flex flex-col"
                    >
                      <img
                        src={image}
                        alt={product.name}
                        className="h-32 sm:h-36 md:h-40 mx-auto object-contain"
                      />

                      <h3 className="mt-3 text-xs sm:text-sm md:text-base line-clamp-2 flex-grow">
                        {product.name}
                      </h3>

                      {firstType && (
                        <p className="text-red-600 font-bold mt-2 text-sm md:text-base">
                          {firstType.currency} {firstType.price}
                        </p>
                      )}

                      <button
                        disabled={
                          firstType?.stock_quantity === 0 ||
                          addingIds.includes(product.id)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product, firstType);
                        }}
                        className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg text-xs sm:text-sm disabled:opacity-50"
                      >
                        {addingIds.includes(product.id)
                          ? "Adding..."
                          : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);
};

export default ProductListView;