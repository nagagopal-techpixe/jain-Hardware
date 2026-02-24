import { useStore } from "../context/StoreContext";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { CreditCard, Truck, Home } from "lucide-react";
import { fetchUserAddresses, addUserAddress } from "../data/addressService.js";

const CheckoutView = () => {
  const { setView, cart, placeOrder, user, navigateToHome } = useStore();

  const [step, setStep] = useState(1);

  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  /* ==============================
     FETCH SAVED ADDRESSES
  ============================== */
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const res = await fetchUserAddresses();

        if (res?.success) {
          setAddresses(res.addresses || []);
          if (res.addresses?.length > 0) {
            setSelectedAddress(res.addresses[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load addresses", err);
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, []);

  /* ==============================
     HANDLE ADD NEW ADDRESS
  ============================== */
  const handleAddAddress = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newAddress = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      country: form.country.value,
      zip_code: form.zip_code.value,
    };

    try {
      const res = await addUserAddress(newAddress);

      if (res?.success) {
        setAddresses((prev) => [...prev, res.address]);
        setSelectedAddress(res.address);
        setShowNewForm(false);
        form.reset();
      }
    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  /* ==============================
     HANDLE PLACE ORDER
  ============================== */
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    let shippingDetails;

    if (selectedAddress && !showNewForm) {
      shippingDetails = selectedAddress;
    } else {
      const form = e.target;
      shippingDetails = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        country: form.country.value,
        zip_code: form.zip_code.value,
      };
    }

    const paymentMethod = e.target.payment?.value || "ONLINE";

    setStep(2);

    const success = await placeOrder(shippingDetails, paymentMethod);

    setStep(1);

    if (success) {
      setView("dashboard");
    }
  };

  /* ==============================
     LOADING SCREEN
  ============================== */
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
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6 gap-2">
        <button
          onClick={navigateToHome}
          className="flex items-center hover:text-gray-700"
        >
          <Home size={16} className="mr-1" /> Home
        </button>
        <span>/</span>
        <button onClick={() => setView("cart")} className="hover:text-gray-700">
          Cart
        </button>
        <span>/</span>
        <span className="text-gray-700">Checkout</span>
      </nav>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ================= SHIPPING SECTION ================= */}
        <div className="md:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Shipping Address</h3>

              {/* LOADING */}
              {loadingAddresses && (
                <div className="flex justify-center py-6">
                  <div className="animate-spin h-6 w-6 border-b-2 border-red-600 rounded-full"></div>
                </div>
              )}

              {/* SAVED ADDRESSES */}
              {!loadingAddresses && addresses.length > 0 && !showNewForm && (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block border p-4 rounded-lg cursor-pointer ${
                        selectedAddress?.id === addr.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => setSelectedAddress(addr)}
                        className="mr-2"
                      />
                      <div className="text-sm">
                        <p className="font-semibold">{addr.name}</p>
                          <p>{addr.email}</p>
                        <p>{addr.address}</p>
                        <p>{addr.city}, {addr.state}</p>
                        <p>{addr.country} - {addr.zip_code}</p>
                        <p>{addr.phone}</p>
                      </div>
                    </label>
                  ))}

                  <button
                    type="button"
                    onClick={() => setShowNewForm(true)}
                    className="text-red-600 text-sm font-medium"
                  >
                    + Add New Address
                  </button>
                </div>
              )}

              {/* NEW ADDRESS FORM */}
              {(!loadingAddresses &&
                (addresses.length === 0 || showNewForm)) && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input name="name" placeholder="Full Name" defaultValue={user.name} required className="border p-2 rounded" />
                  <input name="email" placeholder="Email" defaultValue={user.email} required className="border p-2 rounded" />
                  <input name="phone" placeholder="Phone" required className="border p-2 rounded col-span-2" />
                  <textarea name="address" placeholder="Address" required className="border p-2 rounded col-span-2" />
                  <input name="city" placeholder="City" defaultValue={user.city} required className="border p-2 rounded" />
                  <input name="state" placeholder="State" defaultValue={user.state} required className="border p-2 rounded" />
                  <input name="country" placeholder="Country" defaultValue={user.country} required className="border p-2 rounded col-span-2" />
                  <input name="zip_code" placeholder="Zip Code" defaultValue={user.zip_code} required className="border p-2 rounded col-span-2" />

                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewForm(false)}
                      className="text-sm text-gray-600 col-span-2"
                    >
                      ← Back to saved addresses
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ================= PAYMENT SECTION ================= */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Payment Method</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-4 border p-4 rounded-lg bg-red-50 border-red-200">
                  <input type="radio" name="payment" value="ONLINE" defaultChecked />
                  <CreditCard className="text-red-700" />
                  <span className="font-semibold">Credit/Debit Card / UPI</span>
                </label>

                <label className="flex items-center gap-4 border p-4 rounded-lg">
                  <input type="radio" name="payment" value="COD" />
                  <Truck />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-lg">
              Place Order
            </Button>
          </form>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div>
          <div className="bg-gray-50 p-6 rounded-xl border sticky top-24">
            <h3 className="font-bold mb-4">Order Review</h3>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>
                  {item.quantity} x KWD {item.product_type?.price?.toFixed(2)}
                </span>
                <span className="font-bold">
                  KWD {((item.product_type?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total Pay</span>
              <span className="text-red-700">
                KWD{" "}
                {cart
                  .reduce(
                    (total, item) =>
                      total +
                      (Number(item.product_type?.price) || 0) *
                        (Number(item.quantity) || 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;