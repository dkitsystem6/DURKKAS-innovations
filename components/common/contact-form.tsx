// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };
    window.addEventListener("openContactModal", handleOpenModal);
    return () => window.removeEventListener("openContactModal", handleOpenModal);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name || !formData.companyName || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - Get from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Validate that all required keys are present
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your .env.local file.");
      }

      // Initialize EmailJS if not already done
      if (typeof window !== "undefined") {
        emailjs.init(publicKey);
      }

      const templateParams = {
        from_name: formData.name,
        company_name: formData.companyName,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: "dkit.system6@gmail.com",
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus("success");
      setFormData({ name: "", companyName: "", email: "", phone: "", message: "" });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error: any) {
      console.error("Email sending failed:", error);
      const errorMessage = error?.text || error?.message || "Failed to send email. Please check your EmailJS configuration.";
      setSubmitStatus("error");
      // Show more specific error in console for debugging
      if (error?.text) {
        console.error("EmailJS Error:", error.text);
        
        // Provide helpful error messages for common issues
        if (error.text.includes("insufficient authentication scopes")) {
          console.error("Fix: Go to EmailJS Dashboard → Email Services → Your Gmail Service → Re-authorize with proper scopes");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSubmitting}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 ${
          isSubmitting ? "cursor-not-allowed opacity-75" : ""
        }`}
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)',
          animation: 'contactBlink 2s ease-in-out infinite',
        }}
        aria-label="Contact Us"
        type="button"
      >
        {isSubmitting ? (
          <svg
            className="w-6 h-6 text-white animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            className={`w-6 h-6 text-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            )}
          </svg>
        )}
      </button>

      {/* Contact Form Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn"
          onClick={handleBackdropClick}
        >
          <div className="bg-[#05347e] rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 relative animate-slideUp max-h-[90vh] overflow-y-auto" style={{ cursor: 'default' }}>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              style={{ cursor: 'pointer' }}
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Form Header */}
            <h2 className="text-2xl font-bold text-white mb-6">
              Let's Connect & Transform Your Business
            </h2>

            {/* Loading Overlay */}
            {(isSubmitting || submitStatus === "success") && (
              <div className="absolute inset-0 bg-[#05347e] bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-12 h-12 text-white animate-spin mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <p className="text-white text-lg font-medium">Sending...</p>
                    </>
                  ) : submitStatus === "success" ? (
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-green-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-white text-lg font-medium">
                        ✓ Message sent successfully! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a5ba8] focus:border-transparent"
                  style={{ cursor: 'text' }}
                  placeholder="Your Name"
                />
              </div>

              {/* Company Name Input */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a5ba8] focus:border-transparent"
                  style={{ cursor: 'text' }}
                  placeholder="Your Company Name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a5ba8] focus:border-transparent"
                  style={{ cursor: 'text' }}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a5ba8] focus:border-transparent"
                  style={{ cursor: 'text' }}
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={1}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a5ba8] focus:border-transparent resize-none"
                  style={{ cursor: 'text' }}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Error Status Message */}
              {submitStatus === "error" && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                  ✗ Failed to send message. Please try again or contact us directly.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white font-medium py-3 px-6 rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;

