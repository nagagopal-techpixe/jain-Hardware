import { useStore } from "../context/StoreContext";
import { Filter, Package } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { useCategories } from "../data/Categories.jsx";

const ProductListView = () => {
  const {
    products, addToCart, page, totalPages, loading, fetchProducts, navigateToProduct,
    selectedCategory: storeCategory, selectedSubCategory: storeSubCategory
  } = useStore();

  const { categories, loading: categoriesLoading } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(storeCategory || "All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(storeSubCategory || "All");
  const [filterPrice, setFilterPrice] = useState(20000);

  // Category names
  const categoryNames = ["All", ...(categories?.map(c => c.name) || [])];

  // Subcategories for selected category
  const activeCategoryData = categories?.find(c => c.name === selectedCategory);
  const subCategories = activeCategoryData
    ? [{ name: "All", image: null }, ...(activeCategoryData.subCategories || [])]
    : [];

  // Fetch products whenever category/subcategory changes
  useEffect(() => {
    fetchProducts({
      category: selectedCategory === "All" ? null : selectedCategory,
      subCategory: selectedSubCategory === "All" ? null : selectedSubCategory,
      page: 1,
    });
  }, [selectedCategory, selectedSubCategory]);

  const handleNext = () => {
    if (page < totalPages) {
      fetchProducts({
        category: selectedCategory === "All" ? null : selectedCategory,
        subCategory: selectedSubCategory === "All" ? null : selectedSubCategory,
        page: page + 1,
      });
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      fetchProducts({
        category: selectedCategory === "All" ? null : selectedCategory,
        subCategory: selectedSubCategory === "All" ? null : selectedSubCategory,
        page: page - 1,
      });
    }
  };

  const filteredProducts = products.filter(p => p.price <= filterPrice);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <div className="bg-white p-6 rounded-xl border sticky top-24">

            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            {/* Category Filter */}
            {!categoriesLoading ? (
              categoryNames.map(cat => (
                <label key={cat} className="flex gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedCategory === cat}
                    onChange={() => {
                      setSelectedCategory(cat);
                      setSelectedSubCategory("All");
                    }}
                  />
                  {cat}
                </label>
              ))
            ) : (
              <p className="text-gray-400">Loading categories...</p>
            )}

            {/* Subcategory Filter */}
            {subCategories.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Subcategories</h4>
                {subCategories.map(sub => (
                  <label key={sub.name} className="flex gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedSubCategory === sub.name}
                      onChange={() => setSelectedSubCategory(sub.name)}
                    />
                    {sub.name}
                  </label>
                ))}
              </div>
            )}

            {/* Price Filter */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Max Price: ₹{filterPrice}</h4>
              <input
                type="range"
                min="0"
                max="20000"
                step="100"
                value={filterPrice}
                onChange={(e) => setFilterPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigateToProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 mx-auto object-contain"
                    />
                    <h3 className="font-bold mt-2">{product.name}</h3>
                    <p className="text-red-700 font-bold">₹{product.price}</p>
                    <Button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-10">
                <button onClick={handlePrev} disabled={page === 1} className="px-4 py-2 border rounded disabled:opacity-50">
                  Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNext} disabled={page === totalPages} className="px-4 py-2 border rounded disabled:opacity-50">
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-gray-300" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
