"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react";

const showcaseItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    image: "/images/dashboard.png",
    title: "Intelligent Dashboard",
    description:
      "Get a bird's eye view of your clinic operations. Track appointments, tasks, mentions, and key metrics all in one place.",
    features: [
      "Today's appointments at a glance",
      "Task management with priorities",
      "Team collaboration mentions",
      "Real-time notifications",
    ],
  },
  {
    id: "patients",
    label: "Patients",
    icon: Users,
    image: "/images/patients.png",
    title: "Complete Patient Management",
    description:
      "Comprehensive patient profiles with medical history, documents, treatment records, and communication history.",
    features: [
      "360° patient view",
      "Medical records & history",
      "Document management",
      "Insurance information",
    ],
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    image: "/images/appointments.png",
    title: "Smart Scheduling",
    description:
      "Intuitive calendar with drag-and-drop scheduling, automatic reminders, and conflict detection.",
    features: [
      "Multi-provider calendars",
      "Automatic SMS/Email reminders",
      "Online booking portal",
      "Resource management",
    ],
  },
  {
    id: "records",
    label: "Records",
    icon: FileText,
    image: "/images/records.png",
    title: "Digital Medical Records",
    description:
      "Paperless consultations with templates, e-signatures, before/after photos, and 3D visualizations.",
    features: [
      "Consultation templates",
      "Before/After galleries",
      "3D Crisalix integration",
      "Digital consent forms",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    image: "/images/analytics.png",
    title: "Business Intelligence",
    description:
      "Make data-driven decisions with comprehensive financial reports, patient analytics, and performance metrics.",
    features: [
      "Revenue analytics",
      "Patient acquisition tracking",
      "Staff performance metrics",
      "Custom report builder",
    ],
  },
];

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const activeItem =
    showcaseItems.find((item) => item.id === activeTab) || showcaseItems[0];

  return (
    <section
      id="showcase"
      className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-aliice-500/20 px-4 py-1.5 text-sm font-medium text-aliice-300 mb-4">
            <Monitor className="h-4 w-4" />
            Product Tour
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            See Aliice in Action
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Explore the powerful features that make Aliice the preferred choice
            for aesthetic clinics worldwide.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {showcaseItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-aliice-500 text-white shadow-lg shadow-aliice-500/25"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              {activeItem.title}
            </h3>
            <p className="text-slate-400 mb-6">{activeItem.description}</p>
            <ul className="space-y-3">
              {activeItem.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="https://aestheticclinic.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-aliice-400 hover:text-aliice-300 font-medium transition-colors"
              >
                View Live Demo
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 p-1 shadow-2xl">
              <div className="rounded-xl bg-slate-900 overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center text-xs text-slate-500">
                    aestheticclinic.vercel.app/{activeTab}
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
