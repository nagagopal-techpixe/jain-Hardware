import { useStore } from "../context/StoreContext"; 
import { useState ,useEffect} from "react";
import {
  ChevronRight,
  Star,
  CheckCircle,
  Minus,
  Plus,
  Heart,
  Share2,
  FileText,
  ShoppingCart,
  Truck,
  ShieldCheck,
  StarHalf
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
const getRatingLabel = (rating) => {
  if (rating >= 4.5) return "Excellent Product!";
  if (rating >= 4.0) return "Great Product";
  if (rating >= 3.0) return "Good Product";
  if (rating >= 2.0) return "Average Product";
  return "Poor Product";
};

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const full = rating >= i;
    const half = rating >= i - 0.5 && rating < i;

    if (full) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill="currentColor"
          className="text-yellow-400"
        />
      );
    } else if (half) {
      stars.push(
        <StarHalf
          key={i}
          size={16}
          fill="currentColor"
          className="text-yellow-400"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={16}
          className="text-yellow-400"
        />
      );
    }
  }

  return stars;
};

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");

  // 👉 redirect safely if product not found
  useEffect(() => {
    if (!product) setView("products");
  }, [product, setView]);

  if (!product) return null;

  // 👉 MAIN IMAGE (first gallery image → fallback → list image)
  const [mainImage, setMainImage] = useState(
    product.images?.[0] || product.image
  );

  // 👉 Build image gallery list safely
  const galleryImages = product.images?.length
    ? product.images
    : [product.image];


// console.log("Gallery Images:", galleryImages);
// console.log("product.description:", product.description);
// console.log("Specs:", product.specifications);



  // 👉 Related products
  console.log("All Products:", products);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
console.log("Related Products:", relatedProducts);
  return (
    <div className="container mx-auto px-4 py-8 animate-in zoom-in-95 duration-300">

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
        <button onClick={() => setView('home')} className="hover:text-red-700">Home</button>
        <ChevronRight size={14} />
        <button onClick={() => setView('products')} className="hover:text-red-700">{product.category}</button>
        {product.subCategory && (
          <>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">{product.subCategory}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

        {/* 🖼 IMAGE GALLERY */}
        <div className="space-y-4">

          {/* Main Image */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center relative overflow-hidden group h-[400px]">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border rounded-lg p-2 cursor-pointer h-20 flex items-center justify-center bg-white transition-colors
                ${img === mainImage ? "border-red-600 ring-1 ring-red-100" : "border-gray-200 hover:border-red-600"}`}
              >
                <img
                  src={img}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">SKU: {product.sku}</span>
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} Reviews)</span>
              </div>
              {product.stock ? 
                  <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full font-bold flex items-center gap-1"><CheckCircle size={14}/> In Stock</span> : 
                  <span className="text-red-700 bg-red-50 px-3 py-1 rounded-full font-bold">Out of Stock</span>
              }
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-red-700">₹{product.price}</span>
                {product.oldPrice && (
                    <>
                        <span className="text-xl text-gray-400 line-through mb-1">₹{product.oldPrice}</span>
                        <span className="text-green-600 font-bold mb-1 text-sm bg-green-100 px-2 py-0.5 rounded">
                           {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                        </span>
                    </>
                )}
            </div>
            <p className="text-xs text-gray-500">+18% GST applicable. Bulk pricing available for orders &gt; 50 units.</p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-4">
               <div className="flex items-center border border-gray-300 rounded-lg bg-white h-12">
                  <button className="px-4 h-full hover:bg-gray-100 text-gray-600 rounded-l-lg" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16}/></button>
                  <span className="w-12 text-center font-bold text-lg">{qty}</span>
                  <button className="px-4 h-full hover:bg-gray-100 text-gray-600 rounded-r-lg" onClick={() => setQty(qty + 1)}><Plus size={16}/></button>
               </div>
               <Button onClick={() => addToCart(product, qty)} className="flex-1 h-12 text-lg shadow-red-200">Add to Cart</Button>
               <button className="h-12 w-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"><Heart size={20}/></button>
               <button className="h-12 w-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"><Share2 size={20}/></button>
            </div>
            
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50 py-3" onClick={() => addToast("Bulk quote request sent to sales team!", "success")}>
                <FileText size={18} /> Request Bulk Quote (B2B)
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <Truck className="text-red-600 mt-0.5" size={20}/>
                <div>
                    <span className="block font-bold text-gray-900">Fast Delivery</span>
                    <span className="text-gray-500 text-xs">Dispatch within 24hrs</span>
                </div>
             </div>
             <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <ShieldCheck className="text-red-600 mt-0.5" size={20}/>
                <div>
                    <span className="block font-bold text-gray-900">Warranty</span>
                    <span className="text-gray-500 text-xs">1 Year Brand Warranty</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
        <div className="flex border-b border-gray-200 bg-gray-50/50">
           {['Description', 'Specifications', 'Reviews'].map(tab => (
             <button 
                key={tab} 
                className={`px-8 py-4 font-semibold text-sm focus:outline-none transition-colors ${activeTab === tab.toLowerCase().slice(0,4) ? 'text-red-700 border-b-2 border-red-700 bg-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                onClick={() => setActiveTab(tab.toLowerCase().slice(0,4))}
             >
               {tab}
             </button>
           ))}
        </div>
        <div className="p-8 text-gray-600 leading-relaxed min-h-[200px]">
         {activeTab === 'desc' && (
  <div className="max-w-4xl">
    {product.description ? (
      <p className="text-gray-700 leading-relaxed">
        {product.description}
      </p>
    ) : (
      <p className="text-gray-500">
        No description available for this product.
      </p>
    )}
  </div>
)}

         {activeTab === 'spec' && (
  <div className="overflow-x-auto">
    {product.specifications?.length ? (
      <table className="w-full max-w-2xl text-sm text-left">
        <tbody>
          {product.specifications.map((spec, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? "border-b bg-gray-50" : "border-b"}
            >
              <td className="py-3 font-medium text-gray-900 w-1/3 pl-2">
                {spec.name.replace(/_/g, " ").toUpperCase()}
              </td>
              <td className="py-3 text-gray-800">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-500">Specifications not available.</p>
    )}
  </div>
)}

           {activeTab === 'revi' && (
             <div className="space-y-6 max-w-3xl">
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                   <div className="text-center">
                       <span className="block text-4xl font-bold text-gray-900">{product.rating}</span>
                       {/* <div className="flex text-yellow-400 justify-center text-sm my-1"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div> */}
                       <div className="flex text-yellow-400 justify-center text-sm my-1">
  {renderStars(product.rating)}
</div>

                       <span className="text-xs text-gray-500">{product.reviews} Reviews</span>
                   </div>
                   <div className="flex-1 border-l pl-4 ml-4">
                       {/* <p className="font-bold text-gray-900 mb-1">Excellent Product!</p> */}
                       <p className="font-bold text-gray-900 mb-1">
  {getRatingLabel(product.rating)}
</p>

                       <p className="text-sm">"I bought this for my workshop and it has exceeded expectations. Very durable and powerful."</p>
                       <p className="text-xs text-gray-400 mt-2">- Verified Buyer, Hyderabad</p>
                   </div>
               </div>
             </div>
           )}
        </div>  
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
                <button onClick={() => setView('products')} className="text-red-700 font-medium hover:underline text-sm">View More</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => (
                    <div key={p.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer bg-white group" onClick={() => navigateToProduct(p)}>
                        <div className="h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg relative overflow-hidden">
                             <img src={p.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{p.subCategory || p.category}</p>
                        <h4 className="font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-red-700 transition-colors">{p.name}</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-red-700">₹{p.price}</span>
                            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                                <ShoppingCart size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}
    </div>
  );
};
export default ProductDetailView;