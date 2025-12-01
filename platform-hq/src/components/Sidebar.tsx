"use client";

import Link from "next/link";
import { User } from "firebase/auth";
import { useState } from "react";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Settings, 
  ChevronsUpDown, 
  Users,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: User;
  className?: string;
}

export function Sidebar({ user, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("flex flex-col h-screen border-r bg-muted/40 transition-all duration-300", collapsed ? "w-[60px]" : "w-[280px]", className)}>
      {/* Header / Logo */}
      <div className={cn("flex h-14 items-center border-b px-4 lg:h-[60px]", collapsed ? "justify-center px-2" : "px-6")}>
        <Link href="/" className="flex items-center gap-2 font-semibold overflow-hidden">
          <ShieldAlert className="h-6 w-6 shrink-0 text-primary" />
          <span className={cn("transition-opacity duration-300 whitespace-nowrap", collapsed ? "opacity-0 w-0" : "opacity-100")}>Sentinel</span>
        </Link>
      </div>

      {/* Team Switcher (Only visible when not collapsed or show icon only?) */}
      {!collapsed && (
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2 truncate">
                   <Users className="h-4 w-4" />
                   <span>Sentinel Core</span>
                </span>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px]">
              <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-primary" />
                   <span>Sentinel Core</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                   <span>Global Operations</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-muted-foreground">Create Team...</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            title="Dashboard"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span className={cn("transition-all duration-300 overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
             title="Settings"
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span className={cn("transition-all duration-300 overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Footer / User Profile */}
      <div className="border-t p-4">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <Avatar className="h-9 w-9 border border-border">
             <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
             <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
               <span className="truncate text-sm font-medium">{user.displayName || "User"}</span>
               <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          )}
        </div>
        
        {/* Collapse Toggle */}
        <div className="mt-4 flex justify-end">
           <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
           </Button>
        </div>
      </div>
    </div>
  );
}
