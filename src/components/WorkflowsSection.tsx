"use client";

import { useState } from "react";
import {
  Workflow,
  Zap,
  Mail,
  MessageSquare,
  Bell,
  ClipboardList,
  Briefcase,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  FileText,
  MousePointer,
  ArrowRight,
} from "lucide-react";

const triggers = [
  {
    id: "deal_stage_changed",
    label: "Deal Stage Changed",
    description: "When a deal moves to a specific stage",
    icon: Briefcase,
    color: "blue",
  },
  {
    id: "patient_created",
    label: "Patient Created",
    description: "When a new patient is added to the system",
    icon: Users,
    color: "purple",
  },
  {
    id: "appointment_created",
    label: "Appointment Created",
    description: "When an appointment is scheduled",
    icon: Calendar,
    color: "amber",
  },
  {
    id: "appointment_completed",
    label: "Appointment Completed",
    description: "When an appointment is marked complete",
    icon: CheckCircle,
    color: "emerald",
  },
  {
    id: "form_submitted",
    label: "Form Submitted",
    description: "When a lead form is submitted",
    icon: FileText,
    color: "cyan",
  },
  {
    id: "task_completed",
    label: "Task Completed",
    description: "When a task is marked complete",
    icon: ClipboardList,
    color: "green",
  },
  {
    id: "manual",
    label: "Manual Trigger",
    description: "Triggered manually by user action",
    icon: MousePointer,
    color: "slate",
  },
];

const actions = [
  {
    id: "send_email",
    label: "Send Email",
    description: "Send an email to patient or staff",
    icon: Mail,
    color: "emerald",
  },
  {
    id: "send_whatsapp",
    label: "Send WhatsApp",
    description: "Send automated WhatsApp message",
    icon: MessageSquare,
    color: "green",
  },
  {
    id: "send_notification",
    label: "Send Notification",
    description: "Send in-app notification to user",
    icon: Bell,
    color: "blue",
  },
  {
    id: "create_task",
    label: "Create Task",
    description: "Create a new task for a team member",
    icon: ClipboardList,
    color: "purple",
  },
  {
    id: "create_deal",
    label: "Create Deal",
    description: "Create a new deal for patient",
    icon: Briefcase,
    color: "amber",
  },
  {
    id: "update_deal",
    label: "Update Deal",
    description: "Update deal stage or properties",
    icon: Briefcase,
    color: "amber",
  },
  {
    id: "delay",
    label: "Add Delay",
    description: "Wait before next action (minutes, hours, days)",
    icon: Clock,
    color: "slate",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600", border: "border-cyan-200" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
  slate: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" },
};

export default function WorkflowsSection() {
  const [activeTab, setActiveTab] = useState<"triggers" | "actions">("triggers");

  return (
    <section id="workflows" className="py-20 lg:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 mb-4">
            <Workflow className="h-4 w-4" />
            Marketing Automation
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Powerful <span className="gradient-text">Workflow Automation</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Automate patient engagement, follow-ups, and internal processes with our visual workflow builder. Set triggers, define conditions, and execute actions automatically.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab("triggers")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "triggers"
                  ? "bg-aliice-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="h-4 w-4 inline mr-2" />
              Triggers
            </button>
            <button
              onClick={() => setActiveTab("actions")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "actions"
                  ? "bg-aliice-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowRight className="h-4 w-4 inline mr-2" />
              Actions
            </button>
          </div>
        </div>

        {activeTab === "triggers" && (
          <div>
            <p className="text-center text-slate-600 mb-8">
              Workflows start with a trigger — an event that kicks off the automation.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {triggers.map((trigger) => {
                const colors = colorClasses[trigger.color];
                return (
                  <div
                    key={trigger.id}
                    className={`p-4 rounded-xl bg-white border ${colors.border} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <trigger.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{trigger.label}</h4>
                        <p className="text-xs text-slate-500 mt-1">{trigger.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div>
            <p className="text-center text-slate-600 mb-8">
              Actions are what happens after a trigger fires. Chain multiple actions together.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {actions.map((action) => {
                const colors = colorClasses[action.color];
                return (
                  <div
                    key={action.id}
                    className={`p-4 rounded-xl bg-white border ${colors.border} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <action.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{action.label}</h4>
                        <p className="text-xs text-slate-500 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-16 rounded-2xl bg-white border border-slate-200 p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Example Workflow</h3>
            <p className="text-slate-600">Patient consultation follow-up automation</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
              <Calendar className="h-5 w-5 text-amber-600" />
              <div>
                <div className="text-xs text-amber-600 font-medium">TRIGGER</div>
                <div className="text-sm font-semibold text-slate-900">Appointment Completed</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 rotate-90 md:rotate-0" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
              <Clock className="h-5 w-5 text-slate-600" />
              <div>
                <div className="text-xs text-slate-500 font-medium">DELAY</div>
                <div className="text-sm font-semibold text-slate-900">Wait 24 hours</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 rotate-90 md:rotate-0" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-xs text-emerald-600 font-medium">ACTION</div>
                <div className="text-sm font-semibold text-slate-900">Send Follow-up Email</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 rotate-90 md:rotate-0" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-xs text-green-600 font-medium">ACTION</div>
                <div className="text-sm font-semibold text-slate-900">Send WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
