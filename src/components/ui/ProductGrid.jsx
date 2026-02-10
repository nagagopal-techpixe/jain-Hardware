import { useStore } from "../../context/StoreContext";
import { ShoppingCart } from "lucide-react";
import Skeleton from "./Skeleton";

/* KWD Formatter */
const formatKWD = (price) => {
  if (!price) return "KWD 0.000";
  return `KWD ${Number(price).toFixed(1)}`;
};

const ProductGrid = ({ limit }) => {
  const { products, loading, addToCart, navigateToProduct } = useStore();

  const displayProducts = limit
    ? products.slice(0, limit)
    : products;

  /* Loading Skeleton */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 h-80 border"
          >
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

        /* Discount Calculation (Safe) */
        const discount =
          product.oldPrice && product.price
            ? Math.round(
                ((product.oldPrice - product.price) /
                  product.oldPrice) *
                  100
              )
            : null;

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
                src={product.image}
                alt={product.name}
                className="
                  w-full
                  h-full
                  object-contain
                  p-4
                  group-hover:scale-110
                  transition-transform
                  duration-500
                "
              />

              {/* Out of Stock */}
              {!product.stock && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1">
                    OUT OF STOCK
                  </span>
                </div>
              )}

              {/* Discount Badge */}
              {discount && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">

              {/* Category */}
            <p className="font-everest text-sm text-gray-500 mb-1">
  {product.category}
</p>

              {/* Title */}
             <h3
  className="
    font-everest
    font-normal
    text-base
    text-gray-900
    mb-2
    cursor-pointer
    hover:text-red-700
    line-clamp-2
  "
  onClick={() => navigateToProduct(product)}
>
  {product.name}
</h3>

              {/* Price + Cart */}
              <div className="mt-auto flex items-center justify-between">

                {/* Price */}
                <div>
                 <span className="text-base font-bold text-gray-900">
  {formatKWD(product.price)}
</span>


                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {formatKWD(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Cart Button */}
                <button
                  disabled={!product.stock}
                  onClick={() => addToCart(product)}
                  className={`
                    p-3
                    rounded-xl
                    transition-colors
                    ${
                      !product.stock
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 text-red-700 hover:bg-red-700 hover:text-white"
                    }
                  `}
                >
                  <ShoppingCart size={22} />
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
