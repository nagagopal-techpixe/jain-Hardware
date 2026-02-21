import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Button from "../components/ui/Button";
import { useStore } from "../context/StoreContext";

const ProductDetailView = () => {
  const {
    selectedProduct: product,
    addToCart,
    setView,
    products,
    navigateToProduct
  } = useStore();

  const [qty, setQty] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Redirect if no product
  useEffect(() => {
    if (!product) setView("products");
  }, [product]);

  // Set main image and default product type
  useEffect(() => {
    if (product) {
      setMainImage(product.images?.[0]?.image || null);
      if (product.product_type?.length > 0) {
        setSelectedType(product.product_type[0]);
      }
    }
  }, [product]);

  if (!product) return null;

  // Function to handle add to cart with loading
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* PRODUCT INFO */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div>
          <div className="bg-white rounded-xl p-8 border h-[400px] flex items-center justify-center">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-full object-contain"
              />
            )}
          </div>

          <div className="flex gap-3 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.image}
                alt=""
                onClick={() => setMainImage(img.image)}
                className="h-20 w-20 object-contain border rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {/* PRODUCT TYPES */}
          {product.product_type?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Available Options:</h4>
              <div className="flex gap-3 flex-wrap">
                {product.product_type.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedType?.id === type.id
                        ? "bg-red-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {type.name} - {type.price} {type.currency}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="text-2xl font-bold text-red-700 mb-6">
            {selectedType
              ? `${selectedType.price} ${selectedType.currency}`
              : "Price not available"}
          </div>

          {/* QUANTITY + ADD TO CART */}
          {selectedType && selectedType.stock_quantity > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1"
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
            <p className="text-red-500 font-semibold mb-6">Out of Stock</p>
          )}

          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
