"use client";

import { useState, FormEvent } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({
  isOpen,
  onClose,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clinicName: "",
    clinicSize: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit registration");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      clinicName: "",
      clinicSize: "",
      message: "",
    });
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center py-12">
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Thank You for Your Interest!
            </h3>
            <p className="text-slate-600 mb-2">
              We have received your demo request.
            </p>
            <p className="text-slate-700 font-medium mb-6">
              One of our representatives will get in touch with you shortly.
            </p>
            <div className="text-sm text-slate-500 mb-6">
              We typically respond within 24 business hours.
            </div>
            <button onClick={handleClose} className="btn-primary">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-aliice-600 to-aliice-500 px-8 py-6 text-white">
              <h3 className="text-2xl font-bold">Request a Demo</h3>
              <p className="text-aliice-100 mt-1">
                See Aliice in action with a personalized demo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                  placeholder="john@clinic.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                  placeholder="+41 XX XXX XX XX"
                />
              </div>

              <div>
                <label
                  htmlFor="clinicName"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Clinic Name *
                </label>
                <input
                  type="text"
                  id="clinicName"
                  required
                  value={formData.clinicName}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                  placeholder="Your Clinic Name"
                />
              </div>

              <div>
                <label
                  htmlFor="clinicSize"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Clinic Size *
                </label>
                <select
                  id="clinicSize"
                  required
                  value={formData.clinicSize}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicSize: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all"
                >
                  <option value="">Select clinic size</option>
                  <option value="solo">Solo Practice (1 provider)</option>
                  <option value="small">Small (2-5 providers)</option>
                  <option value="medium">Medium (6-15 providers)</option>
                  <option value="large">Large (16+ providers)</option>
                  <option value="enterprise">Multi-location / Enterprise</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-aliice-500 focus:ring-2 focus:ring-aliice-500/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your clinic and what you're looking for..."
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Demo"
                )}
              </button>

              <p className="text-xs text-center text-slate-500">
                By submitting, you agree to our{" "}
                <a href="#" className="text-aliice-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-aliice-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
