"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Medical Director",
    clinic: "Zurich Aesthetics Center",
    content:
      "Aliice transformed how we manage our clinic. The combination of ERP operations and CRM marketing in one platform has increased our patient retention by 40%.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Dr. James Wilson",
    role: "Plastic Surgeon",
    clinic: "Geneva Beauty Clinic",
    content:
      "The workflow automation saves us hours every week. Patient follow-ups happen automatically, and our conversion rate from consultations to procedures has never been higher.",
    rating: 5,
    avatar: "JW",
  },
  {
    name: "Elena Rodriguez",
    role: "Clinic Manager",
    clinic: "Lausanne Medical Spa",
    content:
      "Finally, a system that understands aesthetic medicine. The deal pipeline and patient journey tracking give us complete visibility into our business performance.",
    rating: 5,
    avatar: "ER",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-sm font-medium text-amber-700 mb-4">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            Trusted by 500+ Clinics
          </div>
          <h2 className="section-heading">
            Loved by Healthcare{" "}
            <span className="gradient-text">Professionals</span>
          </h2>
          <p className="section-subheading mx-auto">
            See what medical professionals are saying about their experience
            with Aliice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-aliice-200 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-aliice-100" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-aliice-400 to-aliice-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role} · {testimonial.clinic}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
            {[
              "Swiss Medical Association",
              "GDPR Compliant",
              "ISO 27001",
              "HIPAA Ready",
            ].map((badge) => (
              <div
                key={badge}
                className="text-sm font-medium text-slate-500 whitespace-nowrap"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
