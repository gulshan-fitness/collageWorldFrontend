import React from "react";
import { FaClock, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SubAdminPending = () => {
  const navigate = useNavigate();

  const handleCallAdmin = () => {
    // Replace with your admin’s actual phone number
    window.location.href = "tel:+911234567890";
  };

  const handleWhatsapp = () => {
    // Replace with your admin’s WhatsApp number
    window.open("https://wa.me/911234567890", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md text-center border border-gray-100 relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-30 translate-x-16 translate-y-16"></div>

        <div className="relative">
          <div className="flex justify-center mb-6 animate-bounce">
            <div className="bg-yellow-100 text-yellow-600 p-5 rounded-full shadow-inner">
              <FaClock className="text-5xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Approval Pending
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Your account has been successfully created but is awaiting approval
            from the <span className="font-semibold text-blue-600">Super Admin</span>.
            You’ll be able to access the dashboard once your account is approved.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/admin_login/$rj60cc1113$")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200"
            >
              Back to Login
            </button>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCallAdmin}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition"
              >
                <FaPhoneAlt /> Call Admin
              </button>

              <button
                onClick={handleWhatsapp}
                className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-4 py-2 rounded-lg font-medium hover:bg-[#25D366]/20 transition"
              >
                <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            If this is taking longer than expected, please reach out to the Super
            Admin for assistance.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminPending;
