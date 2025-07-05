import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { IssuesList } from "@/components/issues/IssuesList";
import { CreateIssueDialog } from "@/components/issues/CreateIssueDialog";

const Index = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "issues">("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="flex h-screen">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <div className="animate-fade-in">
              {activeView === "dashboard" && <Dashboard />}
              {activeView === "issues" && <IssuesList />}
            </div>
          </main>
        </div>
      </div>
      <CreateIssueDialog />
    </div>
  );
};

export default Index;