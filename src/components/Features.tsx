"use client";

import {
  Calendar,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Mail,
  MessageSquare,
  Workflow,
  Shield,
  Clock,
  Building2,
  Stethoscope,
} from "lucide-react";

const erpFeatures = [
  {
    icon: Users,
    title: "Patient Management",
    description:
      "Complete patient records with medical history, intake forms, and comprehensive documentation.",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description:
      "Smart calendar with conflict detection, reminders, and multi-provider support.",
  },
  {
    icon: FileText,
    title: "Medical Records",
    description:
      "Digital consultations, treatment notes, before/after photos, and 3D visualization.",
  },
  {
    icon: CreditCard,
    title: "Invoicing & Payments",
    description:
      "Generate invoices, track payments, insurance billing, and financial reporting.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Workflows",
    description:
      "Pre-consultation forms, consent management, and post-operative follow-ups.",
  },
  {
    icon: Building2,
    title: "Multi-Location Support",
    description:
      "Manage multiple clinic locations with centralized data and reporting.",
  },
];

const crmFeatures = [
  {
    icon: BarChart3,
    title: "Deal Pipeline",
    description:
      "Visual Kanban board to track leads from inquiry to treatment completion.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description:
      "Drag-and-drop email builder with templates and automated sequences.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description:
      "Send automated messages to patients through WhatsApp Business API.",
  },
  {
    icon: Workflow,
    title: "Marketing Automation",
    description:
      "Trigger-based workflows for patient engagement and follow-up sequences.",
  },
  {
    icon: Clock,
    title: "Task Management",
    description:
      "Assign tasks, set reminders, and track team productivity with mentions.",
  },
  {
    icon: Shield,
    title: "Lead Scoring",
    description:
      "Prioritize high-value prospects with intelligent lead qualification.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-4">
            Powerful Features
          </div>
          <h2 className="section-heading">
            One Platform.{" "}
            <span className="gradient-text">Unlimited Possibilities.</span>
          </h2>
          <p className="section-subheading mx-auto">
            Aliice combines the production strength of enterprise ERPs with the
            marketing power of modern CRMs—purpose-built for healthcare.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-aliice-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-aliice-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  ERP Capabilities
                </h3>
                <p className="text-sm text-slate-500">
                  Production-grade operations management
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {erpFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-aliice-200 hover:shadow-lg hover:shadow-aliice-100/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-aliice-100 flex items-center justify-center group-hover:bg-aliice-500 transition-colors">
                      <feature.icon className="h-5 w-5 text-aliice-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  CRM Capabilities
                </h3>
                <p className="text-sm text-slate-500">
                  Marketing automation & engagement
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {crmFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <feature.icon className="h-5 w-5 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
