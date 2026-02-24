import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import logo from "../assests/taj_mahal_jain_logo.png"
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Logo + About Section */}
      <div className="bg-white border-b">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <img
      src={logo}
      alt="TAJ MAHAL JAIN BUILDING MATERIALS CO."
      className="mx-auto h-44 object-contain block"
    />

    <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
      Established in 2020, we offer quality products at fair prices to meet the
      construction market's needs. With four years of experience, we’ve earned a
      trusted reputation in Kuwait and are committed to prompt, reliable service
      and customer satisfaction.
    </p>

  </div>
</div>

      {/* Contact + Map Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">

          {/* LEFT SIDE - Contact Info */}
        {/* LEFT SIDE - Contact Info */}
<div className="p-10 space-y-10">
  
  {/* Get In Touch */}
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">
      Get In Touch
    </h2>

    {/* Phones */}
    <div className="flex items-start gap-4">
      <Phone className="text-red-700 mt-1" size={26} />
      <div className="space-y-2 text-lg">
        <a href="tel:+96599261620" className="block hover:text-red-700">
          +965-99261620
        </a>
        <a href="tel:+96597413663" className="block hover:text-red-700">
          +965-97413663
        </a>
        <a href="tel:+96592296360" className="block hover:text-red-700">
          +965-92296360
        </a>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-center gap-4">
      <Mail className="text-red-700" size={26} />
      <a
        href="mailto:jainhardwareandtools@gmail.com"
        className="text-lg hover:text-red-700"
      >
        jainhardwareandtools@gmail.com
      </a>
    </div>

    {/* Address */}
    <div className="flex items-start gap-4">
      <MapPin className="text-red-700 mt-1" size={26} />
      <span className="text-lg">
        Kuwait
      </span>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t pt-8 space-y-4">
    <h2 className="text-2xl font-bold text-gray-900">
      Our Store
    </h2>

    <div className="text-lg text-gray-700 space-y-2 leading-relaxed">
      <p>Jain hardware and power tools</p>
      <p>Shuwaikh Industrial Area</p>
      <p>Khalifa Al Jassim Str. - Block 1 - Bld. 148, Kuwait</p>
    </div>
  </div>

</div>

          {/* RIGHT SIDE - Google Map */}
          <div className="h-96 md:h-auto">
            <iframe
              title="Kuwait Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.4526919699433!2d47.9467988!3d29.327726099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9bfdb9b6e989%3A0xc148f664fdf2b5d0!2sTAJ%20MAHAL%20JAIN%20BUILDING%20MATERIALS%20CO.!5e0!3m2!1sen!2sin!4v1771913106842!5m2!1sen!2sin"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
       

        </div>
      </div>


    </div>
  );
};

export default ContactPage;