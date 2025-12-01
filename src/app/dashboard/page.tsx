"use client";

import AgentGrid from "@/components/AgentGrid";
import ClientList from "@/components/partner/ClientList";
import { useUserRole } from "@/hooks/useUserRole";

export default function DashboardPage() {
  const { role, loading } = useUserRole();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-1/3 animate-pulse rounded bg-muted"></div>
          <div className="h-4 w-1/4 animate-pulse rounded bg-muted"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      </div>
    );
  }

  // PARTNER VIEW
  if (role === 'partner') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">
            Partner Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your clients and oversee their agent activity.
          </p>
        </div>
        <ClientList />
      </div>
    );
  }

  // STANDARD USER VIEW (Default)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Service Registry
        </h3>
        <p className="text-sm text-muted-foreground">
          Select an active agent to initiate a mission.
        </p>
      </div>
      <AgentGrid />
    </div>
  );
}
