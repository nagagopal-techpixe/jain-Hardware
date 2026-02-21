import React from "react";
import { Phone, MapPin, User } from "lucide-react";

const ContactPage = () => {
  const BRAND_COLOR = "bg-red-700";
  const BRAND_TEXT = "text-red-700";

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-500 text-lg">
          Have questions? We’re here to help. Reach us through the contact info below.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        {/* Phone */}
        <div className="flex items-center gap-4">
          <Phone className="text-red-700" size={24} />
          <span className="text-gray-700 text-lg font-medium">+91 98765 43210</span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4">
          <MapPin className="text-red-700" size={24} />
          <span className="text-gray-700 text-lg font-medium">Industrial Estate, Hyderabad</span>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center text-gray-500">
          Map Placeholder
        </div>

        {/* Optional Email or Contact Person */}
        <div className="flex items-center gap-4">
          <User className="text-red-700" size={24} />
          <span className="text-gray-700 text-lg font-medium">info@jainhardware.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
