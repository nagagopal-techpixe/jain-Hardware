import { useStore } from "../context/StoreContext";
import { User, LogOut } from "lucide-react";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import { fetchOrders } from "../data/APIFunctionsforCart";

const DashboardView = () => {
  const { user, logout, login } = useStore(); // ✅ fixed
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ for popup

  // Fetch orders
  useEffect(() => {
    if (user.isLoggedIn) {
      const loadOrders = async () => {
        setLoading(true);

        const res = await fetchOrders();

        if (res.success) {
          setOrders(res.data || []);
        } else {
          setOrders([]);
        }

        setLoading(false);
      };

      loadOrders();
    }
  }, [user]);

  // If not logged in
  if (!user.isLoggedIn) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">
          Please Login to View Dashboard
        </h2>

        <Button onClick={login}>Login Now</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row gap-8">

        {/* ================= SIDEBAR ================= */}
        <div className="w-full md:w-64">

          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

            {/* Profile */}
            <div className="p-6 bg-gray-900 text-white text-center">

              <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-3">
                <User size={32} />
              </div>

              <h3 className="font-bold">{user.name}</h3>

              <p className="text-xs text-gray-400">
                {user.email}
              </p>

            </div>

            {/* Menu */}
            <div className="p-2">

              <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 font-medium rounded">
                My Orders
              </button>

              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded">
                Saved Addresses
              </button>

              <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded">
                Account Settings
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>

            </div>
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          {/* Loading */}
          {loading && <p>Loading orders...</p>}

          {/* Empty */}
          {!loading && orders.length === 0 && (
            <p>No orders found.</p>
          )}

          {/* Orders */}
          {!loading && orders.length > 0 && (

            <div className="space-y-4">

              {orders.map(order => (

                <div
                  key={order.order_id}
                  className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow"
                >

                  {/* Image */}
                  <div>
                    {order.products[0]?.product.images[0]?.image ? (

                      <img
                        src={order.products[0].product.images[0].image}
                        alt={order.products[0].product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />

                    ) : (

                      <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-xs">
                        No Image
                      </div>

                    )}
                  </div>

                  {/* Price */}
                  <div className="flex-1 md:text-center">

                    <span className="block text-sm text-gray-500">
                      Total Amount
                    </span>

                    <span className="font-bold text-gray-900">
                      ₹{order.total_price}
                    </span>

                  </div>

                  {/* Status */}
                  <div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === "Delivered"
                          ? "text-green-600 bg-green-50"
                          : order.status === "Processing"
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 bg-gray-50"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                  {/* Button */}
                  <Button
                    variant="outline"
                    className="text-xs py-2 h-auto"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">

              <h3 className="font-bold text-lg">
                Order Details
              </h3>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>

            {/* Body */}
            <div className="p-4 space-y-4">

              {/* Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">

                <p><b>Order ID:</b> {selectedOrder.order_id}</p>
                <p><b>Status:</b> {selectedOrder.status}</p>
                <p><b>Payment:</b> {selectedOrder.payment_mode}</p>
                <p><b>Total:</b> ₹{selectedOrder.total_price}</p>

              </div>

              {/* Address */}
              <div>

                <h4 className="font-semibold mb-1">
                  Shipping Address
                </h4>

                <p className="text-sm text-gray-600">

                  {selectedOrder.address.name}<br />

                  {selectedOrder.address.address},
                  {selectedOrder.address.city}<br />

                  {selectedOrder.address.state} -
                  {selectedOrder.address.zip_code}<br />

                  {selectedOrder.address.phone}

                </p>

              </div>

              {/* Products */}
              <div>

                <h4 className="font-semibold mb-2">
                  Products
                </h4>

                <div className="space-y-3">

                  {selectedOrder.products.map(item => (

                    <div
                      key={item.id}
                      className="flex gap-3 border rounded-lg p-2"
                    >

                      <img
                        src={item.product.images[0]?.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">

                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-xs text-gray-500">
                          Price: ₹{item.single_price}
                        </p>

                      </div>

                      <div className="text-sm font-semibold">

                        ₹{item.single_price * item.quantity}

                      </div>

                    </div>

                  ))}

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t text-right">

              <Button onClick={() => setSelectedOrder(null)}>
                Close
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default DashboardView;
