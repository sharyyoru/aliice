"use client";

import Image from "next/image";
import { Sparkles, Eye, Camera, RotateCcw } from "lucide-react";

export default function CrisalixSection() {
  return (
    <section id="crisalix" className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-1.5 text-sm font-medium text-sky-300 mb-6">
              <Sparkles className="h-4 w-4" />
              3D Visualization
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
              Crisalix <span className="text-sky-400">Integration</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Show patients their potential results before any procedure. Aliice integrates directly with Crisalix 3D imaging technology to create realistic simulations for breast, face, and body procedures.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Camera,
                  title: "Photo-Based Modeling",
                  description: "Create accurate 3D models from simple 2D photos taken in your clinic.",
                },
                {
                  icon: RotateCcw,
                  title: "Real-Time Simulations",
                  description: "Adjust implant sizes, shapes, and placements interactively during consultations.",
                },
                {
                  icon: Eye,
                  title: "Patient Visualization",
                  description: "Help patients visualize outcomes, increasing consultation-to-procedure conversion.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-sky-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full bg-slate-800 text-sm text-slate-300 border border-slate-700">
                Breast Augmentation
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-800 text-sm text-slate-300 border border-slate-700">
                Facial Procedures
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-800 text-sm text-slate-300 border border-slate-700">
                Body Contouring
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 p-1 shadow-2xl">
              <div className="rounded-xl bg-slate-900 overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center text-xs text-slate-500">
                    Crisalix 3D Player
                  </div>
                </div>
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">3D Simulation Ready</h4>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
                      Integrated directly into patient records for seamless consultation workflows
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl max-w-[200px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Simulation Created</div>
                  <div className="text-xs text-slate-500">Breast · 350cc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
