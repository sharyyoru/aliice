"use client";

import { Server, Cloud, Shield, Lock, Database, CheckCircle2 } from "lucide-react";

export default function SystemSetup() {
  return (
    <section id="system-setup" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 mb-4">
            <Server className="h-4 w-4" />
            Flexible Deployment
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your Data, Your <span className="gradient-text">Choice</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Deploy Aliice on your own infrastructure or let us handle everything in the cloud. Either way, your data stays secure and compliant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="relative rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 hover:border-aliice-300 hover:shadow-lg transition-all duration-300">
            <div className="absolute -top-4 left-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-4 py-1.5 text-sm font-medium text-white">
                <Server className="h-4 w-4" />
                Local Server
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-3">On-Premise Deployment</h3>
              <p className="text-slate-600 mb-6">
                Full control over your infrastructure. Install Aliice on your own servers for maximum data sovereignty and customization.
              </p>
              <ul className="space-y-3">
                {[
                  "Complete data ownership",
                  "Custom security policies",
                  "No external dependencies",
                  "Integrate with existing IT infrastructure",
                  "Dedicated support for setup",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative rounded-2xl border-2 border-aliice-200 bg-gradient-to-br from-aliice-50 to-white p-8 hover:border-aliice-400 hover:shadow-lg transition-all duration-300">
            <div className="absolute -top-4 left-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-aliice-600 px-4 py-1.5 text-sm font-medium text-white">
                <Cloud className="h-4 w-4" />
                Cloud Server
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Managed Cloud Hosting</h3>
              <p className="text-slate-600 mb-6">
                Let us handle the infrastructure. Instant setup, automatic updates, and enterprise-grade security without the overhead.
              </p>
              <ul className="space-y-3">
                {[
                  "Zero infrastructure management",
                  "Automatic backups & updates",
                  "99.9% uptime SLA",
                  "Global CDN for fast access",
                  "Instant scalability",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-aliice-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">HIPAA Compliant</h3>
              <p className="text-emerald-100 max-w-2xl">
                Aliice is built from the ground up to meet HIPAA requirements. End-to-end encryption, audit logs, access controls, and BAA agreements ensure your patient data is always protected.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10">
                <Lock className="h-6 w-6 text-white" />
                <span className="text-xs text-emerald-100">Encrypted</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10">
                <Database className="h-6 w-6 text-white" />
                <span className="text-xs text-emerald-100">Audit Logs</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10">
                <Shield className="h-6 w-6 text-white" />
                <span className="text-xs text-emerald-100">BAA Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
