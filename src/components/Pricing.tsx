"use client";

import { Check, Sparkles } from "lucide-react";

interface PricingProps {
  onStartTrial: () => void;
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for small clinics getting started",
    price: "299",
    period: "/month",
    features: [
      "Up to 500 patients",
      "2 user accounts",
      "Appointment scheduling",
      "Basic patient records",
      "Email support",
      "Basic reporting",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing practices with advanced needs",
    price: "599",
    period: "/month",
    features: [
      "Up to 2,000 patients",
      "10 user accounts",
      "Deal pipeline & CRM",
      "Marketing automation",
      "WhatsApp integration",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For multi-location clinics and hospitals",
    price: "Custom",
    period: "",
    features: [
      "Unlimited patients",
      "Unlimited users",
      "Multi-location support",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "On-premise option",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing({ onStartTrial }: PricingProps) {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-aliice-100/80 px-4 py-1.5 text-sm font-medium text-aliice-700 mb-4">
            <Sparkles className="h-4 w-4" />
            Simple Pricing
          </div>
          <h2 className="section-heading">
            Choose the Right Plan for{" "}
            <span className="gradient-text">Your Clinic</span>
          </h2>
          <p className="section-subheading mx-auto">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-aliice-600 to-aliice-700 text-white shadow-2xl shadow-aliice-500/25 scale-105 lg:scale-110"
                  : "bg-white border border-slate-200 hover:border-aliice-200 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3
                  className={`text-xl font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${plan.popular ? "text-aliice-100" : "text-slate-500"}`}
                >
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}
                >
                  {plan.price === "Custom" ? "" : "CHF "}
                  {plan.price}
                </span>
                <span
                  className={plan.popular ? "text-aliice-200" : "text-slate-500"}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular
                          ? "bg-white/20"
                          : "bg-emerald-100"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${plan.popular ? "text-white" : "text-emerald-600"}`}
                      />
                    </div>
                    <span
                      className={`text-sm ${plan.popular ? "text-aliice-100" : "text-slate-600"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onStartTrial}
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-white text-aliice-600 hover:bg-aliice-50"
                    : "bg-aliice-600 text-white hover:bg-aliice-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Need a custom solution?{" "}
            <a
              href="mailto:sales@aliice.space"
              className="text-aliice-600 font-medium hover:text-aliice-700"
            >
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
