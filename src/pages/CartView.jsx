import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import Button from "../components/ui/Button";
import { useStore } from "../context/StoreContext";

const CartView = () => {
  const { cart = [], removeFromCart, updateQuantity, setView } = useStore();

  // ✅ subtotal from backend total_price
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <ShoppingCart size={48} />
        <h2 className="text-2xl font-bold mt-4">Your cart is empty</h2>
        <Button onClick={() => setView("products")}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ITEMS */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => {
            const image = item.product?.images?.[0]?.image;
            const name = item.product?.name;
            const price = item.product_type?.price || 0;

            return (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded border">
                
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{name}</h3>
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border rounded">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                   <span className="font-bold text-lg text-gray-900 ml-1">
  KWD {item.total_price.toFixed(2)}
</span>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded border sticky top-24">
            <h3 className="font-bold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KWD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>KWD {gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>KWD {total.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={() => setView("checkout")} className="w-full mt-6">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
