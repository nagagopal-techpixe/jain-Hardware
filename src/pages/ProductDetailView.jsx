import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "../components/ui/Button";
import { useStore } from "../context/StoreContext";

const ProductDetailView = () => {
  const {
    selectedProduct: product,
    setViewWithCategory,
    addToCart,
    setView,
     categories
  } = useStore();

  const [qty, setQty] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);

 
console.log(product);
  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0]?.image || null);
      if (product.product_type?.length > 0) {
        setSelectedType(product.product_type[0]);
      }
    }
  }, [product]);

if (!product) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <span className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></span>
        <p className="text-gray-600 text-sm">Loading product...</p>
      </div>
    </div>
  );
}

  const handleAddToCart = async () => {
    if (!selectedType?.id) return;

    setLoading(true);
    try {
      await addToCart(
        {
          product_type: {
            id: selectedType.id,
            price: selectedType.price,
            stock_quantity: selectedType.stock_quantity
          },
          name: selectedType.name || product.name,
          product_id: product.id
        },
        qty
      );
    } finally {
      setLoading(false);
    }
  };
// console.log("product",product);
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* BREADCRUMB */}
<div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
  <span
    className="cursor-pointer hover:text-red-600"
    onClick={() => setView("home")}
  >
    Home
  </span>

  <span>/</span>

<span
  className="cursor-pointer hover:text-red-600"
  onClick={() =>
    setViewWithCategory(
      "products",
      product.category
        .toLowerCase()
        .replace(/\s+/g, "-")
    )
  }
>
  {product.category}
</span>

  <span>/</span>

  <span className="text-black font-medium">
    {product.name}
  </span>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* IMAGE SECTION */}
        <div>
          <div className="bg-white rounded-xl p-4 md:p-8 border h-[250px] md:h-[400px] flex items-center justify-center">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-full object-contain"
              />
            )}
          </div>

          {/* Thumbnails - horizontal scroll on mobile */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.image}
                alt=""
                onClick={() => setMainImage(img.image)}
                className="h-16 w-16 md:h-20 md:w-20 object-contain border rounded cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div>
          <h1 className="text-xl md:text-3xl font-bold mb-3">
            {product.name}
          </h1>

          {/* PRODUCT TYPES */}
          {product.product_type?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-sm md:text-base">
                Available Options:
              </h4>

              <div className="flex gap-2 flex-wrap">
                {product.product_type.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2 text-sm border rounded-lg transition ${
                      selectedType?.id === type.id
                        ? "bg-red-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {type.name} - {type.price} {type.currency}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="text-xl md:text-2xl font-bold text-red-700 mb-6">
            {selectedType
              ? `${selectedType.price} ${selectedType.currency}`
              : "Price not available"}
          </div>

          {/* QUANTITY + ADD TO CART */}
          {selectedType && selectedType.stock_quantity > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              
              {/* Quantity */}
              <div className="flex border rounded-lg w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4 py-2">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to cart */}
              <Button
                onClick={handleAddToCart}
                className="w-full sm:flex-1"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Adding...
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          )}

          {/* OUT OF STOCK */}
          {selectedType && selectedType.stock_quantity === 0 && (
            <p className="text-red-500 font-semibold mb-6">
              Out of Stock
            </p>
          )}

          {/* DESCRIPTION */}
<p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
  {product.description}
</p>

{/* SPECIFICATIONS */}
{product.specifications?.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg md:text-xl font-semibold mb-4">
      Specifications
    </h3>

    <div className="border rounded-lg divide-y">
      {product.specifications.map((spec, index) => (
        <div
          key={index}
          className="flex justify-between px-4 py-3 text-sm md:text-base"
        >
          <span className="text-gray-600 font-medium">
            {spec.name}
          </span>

          <span className="text-gray-800">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;