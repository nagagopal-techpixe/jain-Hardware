import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Skeleton from "./Skeleton";
import { useStore } from "../../context/StoreContext"; // Keep addToCart

/* KWD Formatter */
const formatKWD = (price) => {
  if (!price) return "KWD 0.000";
  return `KWD ${Number(price).toFixed(1)}`;
};

const ProductGrid = ({ limit }) => {
  const { addToCart, navigateToProduct } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingIds, setAddingIds] = useState([]);

  // Fetch latest products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jain.bteam11.com/api/latest-product/");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const type = product.product_type?.[0];

    if (!type || type.stock_quantity === 0) {
      alert("Cannot add this product to cart");
      return;
    }

    setAddingIds((prev) => [...prev, product.id]);
    try {
      await addToCart(
        {
          product_type: {
            id: type.id,
            price: type.price,
            stock_quantity: type.stock_quantity,
          },
          name: type.name || product.name,
          product_id: product.id,
        },
        1
      );
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setAddingIds((prev) => prev.filter((id) => id !== product.id));
    }
  };

  const displayProducts = limit ? products.slice(0, limit) : products;

  /* Loading Skeleton */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 h-80 border">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayProducts.map((product) => {
        const type = product.product_type?.[0];
        const image = product.images?.[0]?.image || "";
        const discount = product.discount || null;

        return (
          <div
            key={product.id}
            className="
              bg-white
              border border-gray-200
              rounded-2xl
              overflow-hidden
              hover:shadow-2xl
              transition-all
              duration-300
              group
              flex
              flex-col
            "
          >
            {/* Image */}
            <div
              className="relative h-64 bg-gray-50 overflow-hidden cursor-pointer"
              onClick={() => navigateToProduct(product)}
            >
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />

              {!type || type.stock_quantity === 0 ? (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1">
                    OUT OF STOCK
                  </span>
                </div>
              ) : null}

              {discount ? (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1">
                  {discount}% OFF
                </span>
              ) : null}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <p className="font-everest text-sm text-gray-500 mb-1">
                {product.slug}
              </p>
              <h3
                className="font-everest font-normal text-base text-gray-900 mb-2 cursor-pointer hover:text-red-700 line-clamp-2"
                onClick={() => navigateToProduct(product)}
              >
                {product.name}
              </h3>

              {/* Price + Cart */}
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-gray-900">
                    {type ? `${type.price} ${type.currency}` : "KWD 0.0"}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {formatKWD(product.oldPrice)}
                    </span>
                  )}
                </div>

                <button
                  disabled={!type || type.stock_quantity === 0 || addingIds.includes(product.id)}
                  onClick={() => handleAddToCart(product)}
                  className={`p-3 rounded-xl transition-colors ${
                    !type || type.stock_quantity === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-50 text-red-700 hover:bg-red-700 hover:text-white"
                  }`}
                >
                  {addingIds.includes(product.id) ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <ShoppingCart size={22} />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
