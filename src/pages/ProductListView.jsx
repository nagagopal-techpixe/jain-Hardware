import { useStore } from "../context/StoreContext";
import { Filter, Package } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { useCategories } from "../data/Categories.jsx";

const ProductListView = () => {
  const {
    products,
    addToCart,
    page,
    totalPages,
    nextPage,
    prevPage,
    loading
  } = useStore();

  const { categories, loading: categoriesLoading } = useCategories();
  const [filterPrice, setFilterPrice] = useState(15000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  // Use dynamic categories from hook
  const categoryNames = ["All", ...(categoriesLoading ? [] : categories.map(c => c.name))];
  const activeCategoryData = categories.find(c => c.name === selectedCategory);

  const subCategories = activeCategoryData
    ? ["All", ...activeCategoryData.subCategories.map(sc => sc.name)]
    : ["All"];

  // ---- FILTER PRODUCTS (CURRENT PAGE ONLY) ----
  const filteredProducts = products.filter(p =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    (selectedSubCategory === "All" || p.subCategory === selectedSubCategory) &&
    p.price <= filterPrice
  );

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

            {categoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              <>
                {categoryNames.map(cat => (
                  <label key={cat} className="flex gap-2 mb-2">
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
                ))}

                {/* Subcategories */}
                {selectedCategory !== "All" && subCategories.length > 1 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Subcategories</h4>
                    {subCategories.map(sub => (
                      <label key={sub} className="flex gap-2 mb-2">
                        <input
                          type="radio"
                          checked={selectedSubCategory === sub}
                          onChange={() => setSelectedSubCategory(sub)}
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                )}

                {/* Price Filter */}
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(Number(e.target.value))}
                  className="w-full mt-4"
                />
              </>
            )}
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
                  <div key={product.id} className="border rounded-xl p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 mx-auto object-contain"
                    />
                    <h3 className="font-bold mt-2">{product.name}</h3>
                    <p className="text-red-700 font-bold">₹{product.price}</p>
                    <Button onClick={() => addToCart(product)} size="sm">
                      Add
                    </Button>
                  </div>
                ))}
              </div>

              {/* SERVER PAGINATION */}
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded"
                >
                  Prev
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded"
                >
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
