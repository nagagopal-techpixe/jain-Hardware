import { MapPin, Phone, Wrench } from "lucide-react";
import { useCategories } from "../../data/Categories.jsx"; // <-- use hook

const BRAND_COLOR = "bg-red-700";
const BRAND_TEXT = "text-red-700";
const BRAND_BORDER = "border-red-700";
const HOVER_COLOR = "hover:bg-red-800";

export default function Footer() {
  const { categories, loading } = useCategories();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className={`w-8 h-8 ${BRAND_COLOR} rounded flex items-center justify-center`}>
                <Wrench size={18} />
              </div>
              <span className="text-xl font-bold">JAIN HARDWARE</span>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Providing premium quality hardware tools and industrial supplies since 1995.
              Your trusted partner for construction and home improvement.
            </p>

            <div className="flex gap-4">
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded bg-gray-800 hover:bg-red-700 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-red-500">About Us</button></li>
              <li><button className="hover:text-red-500">Contact</button></li>
              <li><button className="hover:text-red-500">Bulk Orders</button></li>
              <li><button className="hover:text-red-500">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Top Categories</h3>
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 5).map(cat => (
                  <li key={cat.id}>
                    <button className="hover:text-red-500">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-600 mt-0.5 flex-shrink-0" size={16} />
                <span>Plot No. 42, Industrial Area, Hyderabad, Telangana, 500037</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-red-600 flex-shrink-0" size={16} />
                <span>+91 40 2345 6789</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />
                <span>Open: Mon - Sat (9AM - 8PM)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Jain Hardware. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
