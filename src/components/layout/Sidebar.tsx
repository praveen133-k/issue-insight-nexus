import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: "dashboard" | "issues";
  onViewChange: (view: "dashboard" | "issues") => void;
}

export function Sidebar({ collapsed, onToggle, activeView, onViewChange }: SidebarProps) {
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      id: "issues" as const,
      label: "Issues",
      icon: FileText,
    },
  ];

  return (
    <div
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Issues Tracker
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                collapsed && "justify-center px-3",
                isActive && "bg-primary text-primary-foreground shadow-elegant"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            collapsed && "justify-center px-3"
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}