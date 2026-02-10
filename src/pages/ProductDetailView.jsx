import { useStore } from "../context/StoreContext"; 
import { useState, useEffect } from "react";
import {
  ChevronRight, Star, StarHalf, CheckCircle, Minus, Plus,
  Heart, Share2, FileText, ShoppingCart, Truck, ShieldCheck
} from "lucide-react";
import Button from "../components/ui/Button"; 

const ProductDetailView = () => {
  const { 
    selectedProduct: product, 
    addToCart, 
    setView, 
    products, 
    navigateToProduct, 
    addToast 
  } = useStore();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");
  const [mainImage, setMainImage] = useState(product?.images?.[0] || product?.image);

  useEffect(() => {
    if (!product) setView("products");
    else setMainImage(product.images?.[0] || product.image);
  }, [product]);

  if (!product) return null;

  const galleryImages = product.images?.length ? product.images : [product.image];

  const relatedProducts = products
    ?.filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  const getRatingLabel = rating => {
    if (rating >= 4.5) return "Excellent Product!";
    if (rating >= 4.0) return "Great Product";
    if (rating >= 3.0) return "Good Product";
    if (rating >= 2.0) return "Average Product";
    return "Poor Product";
  };

  const renderStars = rating =>
    Array.from({ length: 5 }, (_, i) => {
      const full = rating >= i + 1;
      const half = rating >= i + 0.5 && rating < i + 1;
      return full ? <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
           : half ? <StarHalf key={i} size={16} fill="currentColor" className="text-yellow-400" />
           : <Star key={i} size={16} className="text-yellow-400" />;
    });

  return (
    <div className="container mx-auto px-4 py-8 animate-in zoom-in-95 duration-300">

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
        <button onClick={() => setView('home')} className="hover:text-red-700">Home</button>
        <ChevronRight size={14} />
        <button onClick={() => setView('products')} className="hover:text-red-700">{product.category}</button>
        {product.subCategory && <>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{product.subCategory}</span>
        </>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

        {/* IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center relative overflow-hidden group h-[400px]">
            <img src={mainImage} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} onClick={() => setMainImage(img)} className={`border rounded-lg p-2 cursor-pointer h-20 flex items-center justify-center bg-white transition-colors ${img === mainImage ? "border-red-600 ring-1 ring-red-100" : "border-gray-200 hover:border-red-600"}`}>
                <img src={img} alt="" className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">SKU: {product.sku}</span>
       
            {product.stock ? 
              <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full font-bold flex items-center gap-1"><CheckCircle size={14}/> In Stock</span> : 
              <span className="text-red-700 bg-red-50 px-3 py-1 rounded-full font-bold">Out of Stock</span>
            }
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-2xl font-bold text-red-700">
  KWD {Number(product.price).toFixed(1)}
</span>

                {product.oldPrice && <>
                 <span className="text-1lx text-gray-400 line-through mb-1">
  KWD {Number(product.oldPrice).toFixed(3)}
</span>

                    <span className="text-green-600 font-bold mb-1 text-sm bg-green-100 px-2 py-0.5 rounded">
                       {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span>
                </>}
            </div>
           <p className="text-xs text-gray-500">
  Prices are inclusive of applicable taxes. Bulk pricing available for large orders.
</p>

          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white h-12">
              <button className="px-4 h-full hover:bg-gray-100 text-gray-600 rounded-l-lg" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16}/></button>
              <span className="w-12 text-center font-bold text-lg">{qty}</span>
              <button className="px-4 h-full hover:bg-gray-100 text-gray-600 rounded-r-lg" onClick={() => setQty(qty + 1)}><Plus size={16}/></button>
            </div>
            <Button onClick={() => addToCart(product, qty)} className="flex-1 h-12 text-lg shadow-red-200">Add to Cart</Button>
            <button className="h-12 w-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"><Heart size={20}/></button>
            <button className="h-12 w-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"><Share2 size={20}/></button>
          </div>

         
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
        <div className="flex border-b border-gray-200 bg-gray-50/50">
           {['Description', 'Specifications'].map(tab => {
             const key = tab.toLowerCase().slice(0,4);
             return (
               <button key={tab} className={`px-8 py-4 font-semibold text-sm focus:outline-none transition-colors ${activeTab === key ? 'text-red-700 border-b-2 border-red-700 bg-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                 onClick={() => setActiveTab(key)}>
                 {tab}
               </button>
             );
           })}
        </div>
        <div className="p-8 text-gray-600 leading-relaxed min-h-[200px]">
          {activeTab === 'desc' && (product.description ? <p>{product.description}</p> : <p className="text-gray-500">No description available.</p>)}
          {activeTab === 'spec' && (
            product.specifications?.length ? (
              <table className="w-full max-w-2xl text-sm text-left">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? "border-b bg-gray-50" : "border-b"}>
                      <td className="py-3 font-medium text-gray-900 w-1/3 pl-2">{spec.name.replace(/_/g," ").toUpperCase()}</td>
                      <td className="py-3 text-gray-800">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-gray-500">Specifications not available.</p>
          )}
        
        </div>
      </div>

      {/* Related Products */}
{relatedProducts.length > 0 && (

  <section className="py-16 bg-white">

    <div className="max-w-7xl mx-auto px-4">

      {/* Section Header */}
      <div className="text-center mb-12">

        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Related Products
        </h3>

        {/* Sharp Line */}
        <span className="block w-36 h-[3px] bg-red-600 mx-auto mb-3"></span>

        <button
          onClick={() => setView("products")}
          className="text-red-700 font-medium text-sm hover:underline"
        >
          View More →
        </button>

      </div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {relatedProducts.map((p) => (

          <div
            key={p.id}
            onClick={() => navigateToProduct(p)}
            className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-5
              cursor-pointer
              group
              hover:shadow-xl
              transition-all
              duration-300
              flex
              flex-col
            "
          >

            {/* Image */}
            <div className="h-56 mb-4 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">

              <img
                src={p.image}
                alt={p.name}
                className="
                  max-h-full
                  max-w-full
                  object-contain
                  p-3
                  group-hover:scale-110
                  transition-transform
                  duration-500
                "
              />

            </div>


            {/* Category */}
            <p className="text-sm text-gray-500 mb-1">
              {p.subCategory || p.category}
            </p>


            {/* Title */}
            <h4 className="
              font-semibold
              text-base
              text-gray-900
              line-clamp-2
              mb-3
              group-hover:text-red-700
              transition-colors
            ">
              {p.name}
            </h4>


            {/* Price + Cart */}
            <div className="mt-auto flex items-center justify-between">

     <span className="text-lg font-bold text-gray-900">
  KWD {Number(p.price).toFixed(1)}
</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }}
                className="
                  p-3
                  bg-red-50
                  text-red-700
                  rounded-xl
                  hover:bg-red-700
                  hover:text-white
                  transition-colors
                "
              >
                <ShoppingCart size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  </section>
)}

    </div>
  );
};

export default ProductDetailView;
