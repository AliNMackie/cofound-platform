"use client";

import { useRouter } from "next/navigation";
import { useAgents } from "@/hooks/useAgents";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Scale, 
  Plane, 
  ShieldAlert, 
  Bot, 
  Code, 
  FileText,
  Activity,
  Server,
  Database,
  Globe,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  scale: Scale,
  plane: Plane,
  shield: ShieldAlert,
  bot: Bot,
  code: Code,
  file: FileText,
  activity: Activity,
  server: Server,
  database: Database,
  globe: Globe,
};

export default function AgentGrid() {
  const router = useRouter();
  const { agents, loading, error } = useAgents();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-full">
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-500">
        Error loading agents: {error.message}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No agents found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => {
        const Icon = iconMap[agent.icon_name] || Bot;
        
        return (
          <Card 
            key={agent.id} 
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
            onClick={() => router.push(`/mission/${agent.route_slug}`)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {agent.name}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">
                 {/* Could put a metric here, but leaving blank or icon for now */}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                {agent.description}
              </p>
              <Badge 
                variant={agent.status === 'active' ? "default" : "secondary"}
                className={agent.status === 'active' ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {agent.status}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
