import { useState, useEffect } from "react";
import { Home, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";

const ProductListView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ default ALL
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
const [allCategoryGrid, setAllCategoryGrid] = useState([]);
  const { addToCart, navigateToProduct, selectedCategoryId,setView } = useStore();
  const [gridLoading, setGridLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPrice, setFilterPrice] = useState(20000);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addingIds, setAddingIds] = useState([]);

  const cleanCategoryId = selectedCategoryId?.split("/")[0];

useEffect(() => {
  const fetchAllCategoriesGrid = async () => {
    try {
      setGridLoading(true);   // 👈 start loading

      const res = await fetch(
        "https://jain.bteam11.com/api/category/"
      );
      const data = await res.json();

      setAllCategoryGrid(
        Array.isArray(data) ? data :
        Array.isArray(data.data) ? data.data :
        []
      );

    } catch (err) {
      console.error("Category Grid Error:", err);
    } finally {
      setGridLoading(false);  // 👈 stop loading
    }
  };

  fetchAllCategoriesGrid();
}, []);

  // ✅ Handle category change from store
  useEffect(() => {
    if (cleanCategoryId && categories.length > 0) {
      setSelectedCategory(cleanCategoryId);
      setSelectedSubCategory(null);
      setProducts([]);
      setPage(1);
    }
  }, [cleanCategoryId, categories.length]);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://jain.bteam11.com/api/category-list/"
        );
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Category Error:", err);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch products
  useEffect(() => {
    if (!selectedCategory || !selectedSubCategory) return;

    const fetchProducts = async () => {
      setLoading(true);
      setHasLoaded(false);

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
        setHasLoaded(true);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubCategory, page]);

  const activeCategory = categories.find(
  (c) => c.public_id?.split("/")[0] === selectedCategory
);;

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
// console.log("categories",categories)
  return (
    <div className="container mx-auto px-4 py-8">

      {/* 🔹 BREADCRUMB */}
{/* 🔹 BREADCRUMB */}
<div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
  
  {/* HOME */}
<Home
  size={16}
  className="cursor-pointer hover:text-black"
  onClick={() => {
    setView("home");   // 👈 THIS is correct for your project
  }}
/>

  <span>/</span>

  {/* CATEGORY */}
  <span
    className={`cursor-pointer hover:text-black ${
      selectedCategory ? "" : "text-black font-medium"
    }`}
    onClick={() => {
      if (selectedCategory) {
        setSelectedSubCategory(null); // 👈 go back to subcategory list
        setProducts([]);
      }
    }}
  >
    {selectedCategory && activeCategory
      ? activeCategory.name
      : "All Categories"}
  </span>

  {/* SUBCATEGORY */}
  {selectedSubCategory && (
    <>
      <span>/</span>
      <span className="text-black font-medium">
        {
          subCategories.find(
            (sub) => sub.public_id === selectedSubCategory
          )?.name
        }
      </span>
    </>
  )}
</div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* 🔹 SIDEBAR */}
        <div className="w-full lg:w-64 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold mb-4">All Categories</h3>

          <ul className="space-y-2">

            {/* ✅ DEFAULT ALL BUTTON */}
            <li
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubCategory(null);
                setProducts([]);
              }}
              className={`cursor-pointer px-3 py-2 rounded-xl transition ${
                !selectedCategory
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All Categories
            </li>

            {/* CATEGORY LIST */}
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.public_id);
                  setSelectedSubCategory(null);
                  setProducts([]);
                }}
                className={`cursor-pointer px-3 py-2 rounded-xl transition ${
                  selectedCategory === cat.public_id
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="flex-1">

          {/* ✅ CATEGORY GRID (ALL SELECTED) */}
      {/* ✅ CATEGORY GRID (ALL SELECTED) */}
{!selectedCategory && (
  <>
    {gridLoading ? (
      <div className="text-center py-20 text-gray-500">
        Loading categories...
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCategoryGrid.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              const cleanId = cat.public_id?.split("/")[0];
              setSelectedCategory(cleanId);
              setSelectedSubCategory(null);
            }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-6 text-center cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-32 mx-auto object-contain"
            />
            <h3 className="mt-4 font-semibold">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    )}
  </>
)}
          {/* ✅ SUBCATEGORIES */}
          {selectedCategory && !selectedSubCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subCategories.length === 0 ? (
                <div className="col-span-full text-center py-10">
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
                ))
              )}
            </div>
          )}

          {/* ✅ PRODUCTS */}
          {selectedSubCategory && (
            <>
              {loading || !hasLoaded ? (
                <div className="text-center py-20">
                  Loading products...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package
                    size={40}
                    className="mx-auto text-gray-300"
                  />
                  <p className="mt-2">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const image = product.images?.[0]?.image;
                    const firstType = product.product_type?.[0];

                    return (
                      <div
                        key={product.id}
                        onClick={() =>
                          navigateToProduct(product)
                        }
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-5 cursor-pointer flex flex-col"
                      >
                        <img
                          src={image}
                          alt={product.name}
                          className="h-40 mx-auto object-contain"
                        />

                        <h3 className="mt-3 line-clamp-2 flex-grow">
                          {product.name}
                        </h3>

                        {firstType && (
                          <p className="text-red-600 font-bold mt-2">
                            {firstType.currency}{" "}
                            {firstType.price}
                          </p>
                        )}

                        <button
                          disabled={
                            firstType?.stock_quantity === 0 ||
                            addingIds.includes(product.id)
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(
                              product,
                              firstType
                            );
                          }}
                          className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg disabled:opacity-50"
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