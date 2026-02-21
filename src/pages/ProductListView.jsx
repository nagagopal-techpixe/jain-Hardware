import { useState, useEffect } from "react";
import { Home, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";
const ProductListView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { addToCart ,navigateToProduct,selectedCategoryId  } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterPrice, setFilterPrice] = useState(20000);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 const [addingIds, setAddingIds] = useState([]);

 const handleAddToCart = async (product, firstType) => {
  // Add product ID to loading list
  setAddingIds(prev => [...prev, product.id]);

  await addToCart(
    {
      id: product.id,
      name: product.name,
      product_type: {
        id: firstType.id,
        price: firstType.price,
        stock_quantity: firstType.stock_quantity
      }
    },
    1
  );

  // Remove product ID from loading list
  setAddingIds(prev =>
    prev.filter(id => id !== product.id)
  );
};

useEffect(() => {
  if (selectedCategoryId && categories.length > 0) {
    setSelectedCategory(selectedCategoryId);
    setSelectedSubCategory(null);
    setProducts([]);
    setPage(1);
  }
}, [selectedCategoryId, categories.length]); // ✅ use .length to avoid infinite loops
  // ✅ FETCH CATEGORY LIST
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://jain.bteam11.com/api/category-list/");
      const data = await res.json();
      const cats = data.data || [];
      setCategories(cats);

      // ✅ Only default to first category if NO category was passed from home
      if (!selectedCategoryId && cats.length > 0) {
        setSelectedCategory(cats[0].public_id);
      }
    } catch (err) {
      console.error("Category Error:", err);
    }
  };
  fetchCategories();
}, []); // keep empty dep array

  // ✅ FETCH PRODUCTS FROM NEW SUB-CATEGORY API
  useEffect(() => {
    if (!selectedCategory || !selectedSubCategory) return;

    const fetchProducts = async () => {
      setLoading(true);
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
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubCategory, page]);

  const activeCategory = categories.find(
    (c) => c.public_id === selectedCategory
  );

  const subCategories = activeCategory?.subcategories || [];

  // ✅ PRICE FILTER (from product_type)
  const filteredProducts = products.filter((product) => {
    const price = product.product_type?.[0]?.price || 0;
    return price <= filterPrice;
  });

  return (
    <div className="container mx-auto px-4 py-10">

      {/* 🔹 BREADCRUMB */}
      <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
        <Home size={16} />
        <span>/</span>
        <span
          className="cursor-pointer"
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
            <span className="text-black font-medium">
              {selectedSubCategory}
            </span>
          </>
        )}
      </div>

      <div className="flex gap-8">

        {/* 🔹 LEFT SIDEBAR */}
        <div className="w-64 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold mb-4">All Categories</h3>

          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.public_id);
                  setSelectedSubCategory(null);
                  setProducts([]);
                }}
                className={`cursor-pointer p-2 rounded-lg ${
                  selectedCategory === cat.public_id
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          {/* Price Filter */}
          {selectedSubCategory && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">
                Max Price: KWD {filterPrice}
              </h4>

              <input
                type="range"
                min="0"
                max="20000"
                step="100"
                value={filterPrice}
                onChange={(e) =>
                  setFilterPrice(Number(e.target.value))
                }
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* 🔹 RIGHT CONTENT */}
        <div className="flex-1">

          {/* 🔥 SUBCATEGORY GRID */}
          {!selectedSubCategory && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {subCategories.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubCategory(sub.public_id);
                    setPage(1);
                  }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-6 text-center cursor-pointer"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="h-32 mx-auto object-contain"
                  />
                  <h3 className="mt-4 font-semibold">
                    {sub.name}
                  </h3>
                </div>
              ))}
            </div>
          )}

          {/* 🔥 PRODUCT GRID */}
          {selectedSubCategory && (
            <>
              {loading ? (
                <div className="text-center py-20">
                  Loading products...
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                      const image =
                        product.images?.[0]?.image;
                      const firstType =
                        product.product_type?.[0];

                      return (
                      <div
  key={product.id}
  onClick={() => navigateToProduct(product)}
  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-5 cursor-pointer"
>
                          <img
                            src={image}
                            alt={product.name}
                            className="h-40 mx-auto object-contain"
                          />

                          <h3 className="mt-3 text-sm line-clamp-2">
                            {product.name}
                          </h3>

                          {firstType && (
                            <>
                              <p className="text-red-600 font-bold mt-2">
                                {firstType.currency}{" "}
                                {firstType.price}
                              </p>

                              {firstType.stock_quantity === 0 ? (
                                <p className="text-xs text-red-500">
                                  Out of Stock
                                </p>
                              ) : (
                                <p className="text-xs text-green-600">
                                  In Stock
                                </p>
                              )}
                            </>
                          )}

<button
  disabled={
    firstType?.stock_quantity === 0 ||
    addingIds.includes(product.id)
  }
  onClick={(e) => {
    e.stopPropagation();   // 🔥 prevents card navigation
    handleAddToCart(product, firstType);
  }}
  className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg text-sm disabled:opacity-50 flex justify-center items-center"
>
  {addingIds.includes(product.id) ? (
    <>
      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      Adding...
    </>
  ) : (
    "Add to Cart"
  )}
</button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <span>
                      Page {page} of {totalPages}
                    </span>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListView;