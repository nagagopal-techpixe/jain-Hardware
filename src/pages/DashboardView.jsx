import { useStore } from "../context/StoreContext"; 
import { User, LogOut } from "lucide-react";
import Button from "../components/ui/Button"; 
const DashboardView = () => {
  const { user, logout } = useStore();
  
  if (!user.isLoggedIn) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Please Login to View Dashboard</h2>
        <Button onClick={() => useStore().login()}>Login Now</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64">
           <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 bg-gray-900 text-white text-center">
                 <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-3">
                   <User size={32} />
                 </div>
                 <h3 className="font-bold">{user.name}</h3>
                 <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <div className="p-2">
                 <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 font-medium rounded">My Orders</button>
                 <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded">Saved Addresses</button>
                 <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded">Account Settings</button>
                 <button onClick={logout} className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded flex items-center gap-2"><LogOut size={16}/> Logout</button>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
           <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
           <div className="space-y-4">
              {[
                { id: "ORD-9921", date: "Jan 02, 2026", total: "₹4,500", status: "Processing", color: "text-blue-600 bg-blue-50" },
                { id: "ORD-9854", date: "Dec 28, 2025", total: "₹1,250", status: "Delivered", color: "text-green-600 bg-green-50" },
                { id: "ORD-9700", date: "Dec 15, 2025", total: "₹12,400", status: "Delivered", color: "text-green-600 bg-green-50" },
              ].map(order => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                   <div>
                      <h4 className="font-bold text-gray-900">{order.id}</h4>
                      <p className="text-xs text-gray-500">Placed on {order.date}</p>
                   </div>
                   <div className="flex-1 md:text-center">
                      <span className="block text-sm text-gray-500">Total Amount</span>
                      <span className="font-bold text-gray-900">{order.total}</span>
                   </div>
                   <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.color}`}>{order.status}</span>
                   </div>
                   <Button variant="outline" className="text-xs py-2 h-auto">View Details</Button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardView;