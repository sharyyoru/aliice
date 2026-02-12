"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, RefreshCw, CheckCircle, Clock } from "lucide-react";

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

export default function RegistrationsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/registrations");
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch {
      setError("Failed to load registrations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/registrations", {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://www.aliice.space/build/images/aliice-dark.png"
              alt="Aliice Logo"
              width={120}
              height={40}
              unoptimized
            />
            <span className="text-slate-400">|</span>
            <h1 className="text-xl font-semibold text-slate-800">Registrations</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchRegistrations}
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-slate-50">
            <h2 className="font-semibold text-slate-800">
              All Registrations ({registrations.length})
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading...</div>
          ) : registrations.length === 0 ? (
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
                          onChange={(e) => updateStatus(reg.id, e.target.value)}
                          className={`text-sm font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${
                            reg.status === "contacted"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
