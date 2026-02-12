"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onStartTrial: () => void;
}

export default function Hero({ onStartTrial }: HeroProps) {
  const highlights = [
    "Full ERP Production Strength",
    "Powerful CRM Marketing Tools",
    "Healthcare Compliance Ready",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-aliice-50 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-aliice-100/50 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-aliice-100/80 px-4 py-1.5 text-sm font-medium text-aliice-700 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aliice-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-aliice-500"></span>
              </span>
              The trusted Medical ERP you need
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Manage Healthcare{" "}
              <span className="gradient-text">More Efficiently</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Revolutionize Healthcare Efficiency and Patient Engagement with
              Our Cutting-Edge Clinic ERP Platform. Combining the{" "}
              <strong>Production Strength of ERPs</strong> with the{" "}
              <strong>Marketing Power of CRMs</strong>.
            </p>

            <ul className="mt-6 space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600 justify-center lg:justify-start"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={onStartTrial} className="btn-primary group">
                Request a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-10 flex items-center gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">15+</div>
                <div className="text-sm text-slate-500">Integrations</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">50k+</div>
                <div className="text-sm text-slate-500">Patients Managed</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-900">99.9%</div>
                <div className="text-sm text-slate-500">Uptime</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-float">
              <div className="bg-slate-100 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500">
                  aestheticclinic.vercel.app
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/dashboard.png"
                  alt="Aliice Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-slate-100 max-w-[200px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">
                    Invoice Paid
                  </div>
                  <div className="text-xs text-slate-500">CHF 2,450.00</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-slate-100 max-w-[180px] hidden sm:block">
              <div className="text-xs text-slate-500 mb-1">New Lead</div>
              <div className="text-sm font-medium text-slate-800">
                Rhinoplasty Consultation
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-aliice-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
