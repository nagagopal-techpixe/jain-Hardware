  import { useStore } from "../context/StoreContext"; 
import { useState ,useEffect} from "react";

import { ShoppingCart } from "lucide-react";
import { Trash2 } from "lucide-react";
import Button from "../components/ui/Button";   
const CartView = () => {
  const { cart, removeFromCart, updateQuantity, setView } = useStore();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingCart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Button onClick={() => setView('products')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-50" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.sku}</p>
                <div className="flex justify-between items-center">
                   <div className="flex items-center border border-gray-300 rounded">
                      <button className="px-2 py-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button className="px-2 py-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, 1)}>+</button>
                   </div>
                   <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={() => setView('checkout')} className="w-full py-3">Proceed to Checkout</Button>
            <p className="text-xs text-gray-400 mt-4 text-center">Secure checkout powered by Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartView;