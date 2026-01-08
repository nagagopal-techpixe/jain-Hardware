import { useStore } from "../context/StoreContext"; 
import { useState } from "react";
import { CreditCard, Truck } from "lucide-react";
import Button from "../components/ui/Button";   

const CheckoutView = () => {
  const { setView, cart, addToast, user } = useStore();
  const [step, setStep] = useState(1);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep(2); // Simulating loading
    setTimeout(() => {
      addToast("Order Placed Successfully!");
      setView('dashboard');
    }, 1500);
  };

  if (step === 2) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-gray-600">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
             {/* Shipping Section */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                  <div className="bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-lg">Shipping Address</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" defaultValue={user.name} required className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" required className="w-full border rounded-md p-2 outline-none" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input type="text" required className="w-full border rounded-md p-2 outline-none" />
                   </div>
                   <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea rows="3" required className="w-full border rounded-md p-2 outline-none"></textarea>
                   </div>
                   <div className="col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                         <input type="checkbox" className="rounded text-red-600" /> Save this address for later
                      </label>
                   </div>
                </div>
             </div>

             {/* Payment Section (Mock) */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                  <div className="bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-lg">Payment Method</h3>
                </div>
                <div className="space-y-3">
                   <label className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer bg-red-50 border-red-200">
                      <input type="radio" name="payment" defaultChecked className="text-red-600" />
                      <CreditCard className="text-red-700"/>
                      <div>
                        <span className="font-bold block">Credit/Debit Card / UPI</span>
                        <span className="text-xs text-gray-500">Secure payment via Razorpay</span>
                      </div>
                   </label>
                   <label className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" className="text-red-600" />
                      <Truck className="text-gray-700"/>
                      <div>
                        <span className="font-bold block">Cash on Delivery</span>
                        <span className="text-xs text-gray-500">Pay upon receiving products</span>
                      </div>
                   </label>
                </div>
             </div>
             
             <Button type="submit" className="w-full py-4 text-lg">Place Order</Button>
          </form>
        </div>

        {/* Mini Cart Review */}
        <div>
           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Review</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                 {cart.map(item => (
                   <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.quantity}x {item.name}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                   </div>
                 ))}
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                 <span>Total Pay</span>
                 <span>₹{cart.reduce((a,b) => a + (b.price * b.quantity), 0) * 1.18 | 0}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;