import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "triaged" | "progress" | "done";
  priority: "low" | "medium" | "high" | "critical";
  assignee?: {
    name: string;
    avatar?: string;
  };
  reporter: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

const mockIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "Login page not responsive on mobile devices",
    description: "The login form breaks on screens smaller than 768px. The submit button is cut off and form fields overlap.",
    status: "open",
    priority: "high",
    assignee: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
    reporter: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:22:00Z"
  },
  {
    id: "ISS-002", 
    title: "Database connection timeout in production",
    description: "Users experiencing slow page loads and timeouts during peak hours. Connection pool may need adjustment.",
    status: "triaged",
    priority: "critical",
    assignee: { name: "Mike Johnson" },
    reporter: { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" },
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T11:45:00Z"
  },
  {
    id: "ISS-003",
    title: "Email notifications not sending",
    description: "Users report not receiving password reset emails. SMTP configuration needs review.",
    status: "progress",
    priority: "medium",
    assignee: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" },
    reporter: { name: "Lisa Wong" },
    createdAt: "2024-01-13T16:20:00Z",
    updatedAt: "2024-01-15T09:10:00Z"
  },
  {
    id: "ISS-004",
    title: "Add dark mode toggle to settings",
    description: "Feature request to add a dark mode option for better user experience during night time usage.",
    status: "done",
    priority: "low",
    assignee: { name: "David Kim" },
    reporter: { name: "Tom Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" },
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-14T17:45:00Z"
  }
];

const statusColors = {
  open: "status-open",
  triaged: "status-triaged", 
  progress: "status-progress",
  done: "status-done"
};

const priorityColors = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high", 
  critical: "priority-critical"
};

export function IssuesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Issues</h1>
        <Badge variant="secondary">
          {filteredIssues.length} of {mockIssues.length} issues
        </Badge>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="triaged">Triaged</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Issues Grid */}
      <div className="grid gap-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="shadow-card hover:shadow-elegant transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`bg-${statusColors[issue.status]}/10 text-${statusColors[issue.status]} hover:bg-${statusColors[issue.status]}/20`}
                    >
                      {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={`border-${priorityColors[issue.priority]} text-${priorityColors[issue.priority]}`}
                    >
                      {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-mono">{issue.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold line-clamp-1">{issue.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{issue.description}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Reporter:</span>
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={issue.reporter.avatar} />
                          <AvatarFallback className="text-xs">
                            {issue.reporter.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{issue.reporter.name}</span>
                      </div>
                      {issue.assignee && (
                        <div className="flex items-center gap-2">
                          <span>Assignee:</span>
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={issue.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {issue.assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{issue.assignee.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Updated {new Date(issue.updatedAt).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}