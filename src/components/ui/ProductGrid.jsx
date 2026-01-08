  import { useStore } from "../../context/StoreContext" 
import { Star } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Skeleton from "./Skeleton";


const ProductGrid = ({ limit }) => {
  const { products, loading, addToCart, navigateToProduct } = useStore();
  const displayProducts = limit ? products.slice(0, limit) : products;
  console.log("Products in Store:", products.length);
console.log("Rendering ProductGrid with products count:", displayProducts.length);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-lg p-4 h-80 border"><Skeleton className="h-40 w-full mb-4"/><Skeleton className="h-4 w-3/4 mb-2"/><Skeleton className="h-4 w-1/2 mb-4"/><Skeleton className="h-10 w-full"/></div>)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
          <div className="relative h-48 bg-gray-50 overflow-hidden cursor-pointer" onClick={() => navigateToProduct(product)}>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            {!product.stock && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">OUT OF STOCK</span>
              </div>
            )}
            {product.oldPrice && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            <h3 
              className="font-bold text-gray-900 mb-1 cursor-pointer hover:text-red-700 line-clamp-2"
              onClick={() => navigateToProduct(product)}
            >
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1 mb-3">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-600">{product.rating} ({product.reviews})</span>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.oldPrice && <span className="text-xs text-gray-400 line-through ml-2">₹{product.oldPrice}</span>}
              </div>
              <button 
                disabled={!product.stock}
                onClick={() => addToCart(product)}
                className={`p-2 rounded-lg transition-colors ${!product.stock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-700 hover:bg-red-700 hover:text-white'}`}
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductGrid;