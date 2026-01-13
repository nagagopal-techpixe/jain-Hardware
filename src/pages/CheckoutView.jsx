import { useStore } from "../context/StoreContext"; 
import { useState } from "react";
import { CreditCard, Truck } from "lucide-react";
import Button from "../components/ui/Button";   

const CheckoutView = () => {
  const { setView, cart, placeOrder,addToast, user } = useStore();
  const [step, setStep] = useState(1);

const handlePlaceOrder = async (e) => {
  e.preventDefault();
  const form = e.target;
console.log(e.target.payment.value);

  const shippingDetails = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    city: form.city.value,
    state: form.state.value,
    country: form.country.value,
    zip_code: form.zip_code.value,
  };

  const paymentMethod = form.payment?.value || "ONLINE";

  setStep(2);

  const success = await placeOrder(shippingDetails, paymentMethod);

  setStep(1);

  if (success) {
    setView("dashboard");
  }
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
                      <input type="text" defaultValue={user.name} required name="name" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">email</label>
                      <input type="text" defaultValue={user.email} required name="email" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" >Phone</label>
                      <input type="tel" required className="w-full border rounded-md p-2 outline-none" name="phone" />
                   </div>
                   
                   <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" >Address</label>
                      <textarea rows="3" required className="w-full border rounded-md p-2 outline-none" name="address"></textarea>
                   </div>
                   <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" >city</label>
                      <input type="text" defaultValue={user.city} required name="city" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>
                   <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">state</label>
                      <input type="text" defaultValue={user.state} required name="state" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">country</label>
                      <input type="text" defaultValue={user.country} required name="country" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
                   </div>
                   
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">zip_code</label>
                      <input type="text" defaultValue={user.zip_code} required name="zip_code" className="w-full border rounded-md p-2 focus:ring-red-500 focus:border-red-500 outline-none" />
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
    <input
      type="radio"
      name="payment"
      value="ONLINE"
      defaultChecked
      className="text-red-600"
    />
    <CreditCard className="text-red-700"/>
    <div>
      <span className="font-bold block">Credit/Debit Card / UPI</span>
      <span className="text-xs text-gray-500">Secure payment via Razorpay</span>
    </div>
  </label>

  <label className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-gray-50">
    <input
      type="radio"
      name="payment"
      value="COD"
      className="text-red-600"
    />
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
      <span className="text-gray-600">
        {item.quantity} x ₹{item.product_type?.price || 0}
      </span>
      <span className="font-medium">
        ₹{(item.product_type?.price || 0) * item.quantity}
      </span>
    </div>
  ))}
</div>

<div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
  <span>Total Pay</span>
  <span>
    ₹{
      Math.round(
        cart.reduce(
          (total, item) =>
            total +
            (Number(item.product_type?.price) || 0) * (Number(item.quantity) || 0),
          0
        ) * 1.18 // Add GST or tax
      )
    }
  </span>
</div>

              
           </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;