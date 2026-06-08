"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  RefreshCw,
  Users,
  ClipboardList,
  Plus,
  X,
  GripVertical,
  Building2,
  Mail,
  Phone,
  DollarSign,
  StickyNote,
  ChevronRight,
  ArrowRightCircle,
  Trash2,
  Edit3,
  Check,
} from "lucide-react";

interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  clinic_name: string;
  clinic_size: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
}

interface Client {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  industry: string | null;
  company_size: string | null;
  funnel_stage: string;
  deal_value: number | null;
  notes: string | null;
  source: string | null;
  created_at: string;
  updated_at: string | null;
}

interface FunnelStage {
  id: string;
  label: string;
  color: string;
}

const STAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  slate: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
  amber: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
  red: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"registrations" | "clients">("clients");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stages, setStages] = useState<FunnelStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [draggedClient, setDraggedClient] = useState<Client | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [regRes, clientRes] = await Promise.all([
        fetch("/api/admin/registrations"),
        fetch("/api/admin/clients"),
      ]);

      if (regRes.status === 401 || clientRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const regData = await regRes.json();
      const clientData = await clientRes.json();

      setRegistrations(regData.registrations || []);
      setClients(clientData.clients || []);
      setStages(clientData.stages || []);
    } catch {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const updateRegistrationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setRegistrations((prev) =>
          prev.map((reg) => (reg.id === id ? { ...reg, status } : reg))
        );
      }
    } catch {
      console.error("Failed to update status");
    }
  };

  const convertToClient = async (registrationId: number) => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_id: registrationId }),
      });

      if (response.ok) {
        const data = await response.json();
        setClients((prev) => [data.client, ...prev]);
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === registrationId ? { ...reg, status: "converted" } : reg
          )
        );
      }
    } catch {
      console.error("Failed to convert to client");
    }
  };

  const updateClientStage = async (clientId: number, newStage: string) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clientId, funnel_stage: newStage }),
      });

      if (response.ok) {
        setClients((prev) =>
          prev.map((c) => (c.id === clientId ? { ...c, funnel_stage: newStage } : c))
        );
      }
    } catch {
      console.error("Failed to update client stage");
    }
  };

  const deleteClient = async (clientId: number) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const response = await fetch(`/api/admin/clients?id=${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClients((prev) => prev.filter((c) => c.id !== clientId));
      }
    } catch {
      console.error("Failed to delete client");
    }
  };

  const handleDragStart = (client: Client) => {
    setDraggedClient(client);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stageId: string) => {
    if (draggedClient && draggedClient.funnel_stage !== stageId) {
      updateClientStage(draggedClient.id, stageId);
    }
    setDraggedClient(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getClientsByStage = (stageId: string) => {
    return clients.filter((c) => c.funnel_stage === stageId);
  };

  const getTotalDealValue = (stageId: string) => {
    return clients
      .filter((c) => c.funnel_stage === stageId)
      .reduce((sum, c) => sum + (c.deal_value || 0), 0);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://www.aliice.space/build/images/aliice-dark.png"
              alt="Aliice Logo"
              width={100}
              height={32}
              unoptimized
            />
            <span className="text-slate-300">|</span>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("clients")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "clients"
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Users className="w-4 h-4" />
              Clients
            </button>
            <button
              onClick={() => setActiveTab("registrations")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "registrations"
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Registrations
              {registrations.filter((r) => r.status === "new" || !r.status).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {registrations.filter((r) => r.status === "new" || !r.status).length}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : activeTab === "clients" ? (
          <ClientsView
            clients={clients}
            stages={stages}
            getClientsByStage={getClientsByStage}
            getTotalDealValue={getTotalDealValue}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            draggedClient={draggedClient}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            deleteClient={deleteClient}
            setEditingClient={setEditingClient}
            setShowAddClient={setShowAddClient}
            updateClientStage={updateClientStage}
          />
        ) : (
          <RegistrationsView
            registrations={registrations}
            updateRegistrationStatus={updateRegistrationStatus}
            convertToClient={convertToClient}
            formatDate={formatDate}
          />
        )}
      </main>

      {/* Add/Edit Client Modal */}
      {(showAddClient || editingClient) && (
        <ClientModal
          client={editingClient}
          stages={stages}
          onClose={() => {
            setShowAddClient(false);
            setEditingClient(null);
          }}
          onSave={async (data) => {
            try {
              if (editingClient) {
                const response = await fetch("/api/admin/clients", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: editingClient.id, ...data }),
                });
                if (response.ok) {
                  const result = await response.json();
                  setClients((prev) =>
                    prev.map((c) => (c.id === editingClient.id ? result.client : c))
                  );
                }
              } else {
                const response = await fetch("/api/admin/clients", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                if (response.ok) {
                  const result = await response.json();
                  setClients((prev) => [result.client, ...prev]);
                }
              }
              setShowAddClient(false);
              setEditingClient(null);
            } catch {
              console.error("Failed to save client");
            }
          }}
        />
      )}
    </div>
  );
}

// Clients Kanban View Component
function ClientsView({
  clients,
  stages,
  getClientsByStage,
  getTotalDealValue,
  handleDragStart,
  handleDragOver,
  handleDrop,
  draggedClient,
  formatCurrency,
  formatDate,
  deleteClient,
  setEditingClient,
  setShowAddClient,
  updateClientStage,
}: {
  clients: Client[];
  stages: FunnelStage[];
  getClientsByStage: (stageId: string) => Client[];
  getTotalDealValue: (stageId: string) => number;
  handleDragStart: (client: Client) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (stageId: string) => void;
  draggedClient: Client | null;
  formatCurrency: (value: number | null) => string;
  formatDate: (date: string) => string;
  deleteClient: (id: number) => void;
  setEditingClient: (client: Client) => void;
  setShowAddClient: (show: boolean) => void;
  updateClientStage: (clientId: number, newStage: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sales Pipeline</h1>
          <p className="text-slate-500 mt-1">
            {clients.length} clients · {formatCurrency(clients.reduce((sum, c) => sum + (c.deal_value || 0), 0))} total pipeline value
          </p>
        </div>
        <button
          onClick={() => setShowAddClient(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageClients = getClientsByStage(stage.id);
          const stageColors = STAGE_COLORS[stage.color] || STAGE_COLORS.slate;

          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-80 bg-slate-50 rounded-xl border ${
                draggedClient ? "border-dashed border-2" : ""
              } ${draggedClient?.funnel_stage !== stage.id ? "border-slate-200" : "border-transparent"}`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
            >
              <div className={`px-4 py-3 border-b ${stageColors.bg} rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${stageColors.text}`}>{stage.label}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${stageColors.bg} ${stageColors.text} border ${stageColors.border}`}>
                      {stageClients.length}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {formatCurrency(getTotalDealValue(stage.id))}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                {stageClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    stages={stages}
                    onDragStart={() => handleDragStart(client)}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                    onDelete={() => deleteClient(client.id)}
                    onEdit={() => setEditingClient(client)}
                    onMoveToStage={(stageId) => updateClientStage(client.id, stageId)}
                  />
                ))}
                {stageClients.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No clients in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Client Card Component
function ClientCard({
  client,
  stages,
  onDragStart,
  formatCurrency,
  formatDate,
  onDelete,
  onEdit,
  onMoveToStage,
}: {
  client: Client;
  stages: FunnelStage[];
  onDragStart: () => void;
  formatCurrency: (value: number | null) => string;
  formatDate: (date: string) => string;
  onDelete: () => void;
  onEdit: () => void;
  onMoveToStage: (stageId: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900 line-clamp-1">{client.company_name}</h4>
              <p className="text-sm text-slate-500">{client.contact_name}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {showActions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border z-20 py-1">
                  <button
                    onClick={() => {
                      onEdit();
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowMoveMenu(!showMoveMenu)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowRightCircle className="w-4 h-4" />
                        Move to
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {showMoveMenu && (
                      <div className="absolute left-full top-0 ml-1 w-40 bg-white rounded-lg shadow-lg border z-30 py-1">
                        {stages.map((stage) => (
                          <button
                            key={stage.id}
                            onClick={() => {
                              onMoveToStage(stage.id);
                              setShowActions(false);
                              setShowMoveMenu(false);
                            }}
                            disabled={stage.id === client.funnel_stage}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 ${
                              stage.id === client.funnel_stage
                                ? "text-slate-400"
                                : "text-slate-700"
                            }`}
                          >
                            {stage.id === client.funnel_stage && (
                              <Check className="w-4 h-4 text-emerald-500" />
                            )}
                            {stage.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      onDelete();
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate">{client.email}</span>
          </div>
          {client.phone && (
            <div className="flex items-center gap-2 text-slate-500">
              <Phone className="w-3.5 h-3.5" />
              <span>{client.phone}</span>
            </div>
          )}
          {client.deal_value && (
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatCurrency(client.deal_value)}</span>
            </div>
          )}
        </div>

        {client.notes && (
          <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
            <StickyNote className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{client.notes}</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>{formatDate(client.created_at)}</span>
          {client.source && (
            <span className="px-2 py-0.5 bg-slate-100 rounded capitalize">{client.source}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Registrations View Component
function RegistrationsView({
  registrations,
  updateRegistrationStatus,
  convertToClient,
  formatDate,
}: {
  registrations: Registration[];
  updateRegistrationStatus: (id: number, status: string) => void;
  convertToClient: (id: number) => void;
  formatDate: (date: string) => string;
}) {
  const statusColors: Record<string, string> = {
    new: "bg-amber-100 text-amber-700",
    contacted: "bg-blue-100 text-blue-700",
    converted: "bg-emerald-100 text-emerald-700",
    not_interested: "bg-slate-100 text-slate-600",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Platform Registrations</h1>
        <p className="text-slate-500 mt-1">Track and manage user registrations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">
            All Registrations ({registrations.length})
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
              {registrations.filter((r) => r.status === "new" || !r.status).length} New
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {registrations.filter((r) => r.status === "contacted").length} Contacted
            </span>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
              {registrations.filter((r) => r.status === "converted").length} Converted
            </span>
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No registrations yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Clinic
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {reg.first_name} {reg.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">{reg.email}</div>
                      <div className="text-sm text-slate-500">{reg.phone || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">{reg.clinic_name}</div>
                      <div className="text-sm text-slate-500">{reg.clinic_size || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-xs truncate">
                        {reg.message || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{formatDate(reg.created_at)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={reg.status || "new"}
                        onChange={(e) => updateRegistrationStatus(reg.id, e.target.value)}
                        className={`text-sm font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${
                          statusColors[reg.status || "new"]
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="not_interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {reg.status !== "converted" && (
                        <button
                          onClick={() => convertToClient(reg.id)}
                          className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          <ArrowRightCircle className="w-4 h-4" />
                          Convert to Client
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Client Modal Component
function ClientModal({
  client,
  stages,
  onClose,
  onSave,
}: {
  client: Client | null;
  stages: FunnelStage[];
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
}) {
  const [formData, setFormData] = useState({
    company_name: client?.company_name || "",
    contact_name: client?.contact_name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    industry: client?.industry || "",
    company_size: client?.company_size || "",
    funnel_stage: client?.funnel_stage || "lead",
    deal_value: client?.deal_value?.toString() || "",
    notes: client?.notes || "",
    source: client?.source || "manual",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave({
      ...formData,
      deal_value: formData.deal_value ? parseFloat(formData.deal_value) : null,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {client ? "Edit Client" : "Add New Client"}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                  placeholder="Acme Corporation"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Contact Name *
              </label>
              <input
                type="text"
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                placeholder="Healthcare"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Company Size
              </label>
              <select
                value={formData.company_size}
                onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Funnel Stage
              </label>
              <select
                value={formData.funnel_stage}
                onChange={(e) => setFormData({ ...formData, funnel_stage: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Deal Value</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  value={formData.deal_value}
                  onChange={(e) => setFormData({ ...formData, deal_value: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
                  placeholder="10000"
                  min="0"
                  step="100"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 resize-none"
                placeholder="Additional notes about this client..."
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900"
              >
                <option value="manual">Manual Entry</option>
                <option value="registration">Platform Registration</option>
                <option value="referral">Referral</option>
                <option value="website">Website</option>
                <option value="social">Social Media</option>
                <option value="event">Event</option>
                <option value="cold_outreach">Cold Outreach</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : client ? (
                "Save Changes"
              ) : (
                "Add Client"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
