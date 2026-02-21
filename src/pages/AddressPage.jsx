import { useEffect, useState } from "react";
import { fetchUserAddresses, addUserAddress } from "../data/addressService.js";
import { useStore } from "../context/StoreContext";
const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
  });
const { setView } = useStore();
const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load addresses
  useEffect(() => {
    loadAddresses();
  }, []);

 const loadAddresses = async () => {
  setLoadingAddresses(true);

  const result = await fetchUserAddresses();

  if (result.success) {
    setAddresses(result.addresses);
  } else {
    setAddresses([]);
  }

  setLoadingAddresses(false);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await addUserAddress(formData);

    if (result.success) {
      setAddresses([result.address, ...addresses]); // add to top
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
      });
    } else {
      alert("Failed to add address");
    }

    setLoading(false);
  };

return (
  <div className="p-6 max-w-6xl mx-auto">
    {/* ================= BREADCRUMB ================= */}
<div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
  
  <button
    onClick={() => setView("home")}
    className="hover:text-blue-600"
  >
    Home
  </button>

  <span>/</span>

  <button
    onClick={() => setView("dashboard")}
    className="hover:text-blue-600"
  >
    Dashboard
  </button>

  <span>/</span>

  <span className="text-gray-800 font-medium">
    Saved Addresses
  </span>

</div>

    <h2 className="text-2xl font-bold mb-6">My Addresses</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* ================= LEFT SIDE (Address List) ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>

        <div className="space-y-4">

  {/* 🔄 Loading */}
  {loadingAddresses && (
    <p className="text-gray-500">Loading addresses...</p>
  )}

  {/* ❌ Empty State (only after loading) */}
  {!loadingAddresses && addresses.length === 0 && (
    <p className="text-gray-500">No addresses found.</p>
  )}

  {/* ✅ Address List */}
  {!loadingAddresses && addresses.map((addr) => (
    <div
      key={addr.id}
      className="border p-4 rounded-lg shadow-sm bg-white"
    >
      <h4 className="font-semibold">{addr.name}</h4>
      <p className="text-sm text-gray-600">{addr.address}</p>
      <p className="text-sm text-gray-600">
        {addr.city}, {addr.state}
      </p>
      <p className="text-sm text-gray-600">
        {addr.country} - {addr.zip_code}
      </p>
      <p className="text-sm mt-2">📞 {addr.phone}</p>
    </div>
  ))}

</div>
      </div>


      {/* ================= RIGHT SIDE (Add Address Form) ================= */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-sm border"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

         <textarea
  name="address"
  placeholder="Enter complete address (House No, Street, Area, Landmark)"
  value={formData.address}
  onChange={handleChange}
  rows={4}
  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
  required
/>

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="zip_code"
            placeholder="Zip Code"
            value={formData.zip_code}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Address"}
          </button>
        </form>
      </div>

    </div>
  </div>
);
};

export default AddressPage;