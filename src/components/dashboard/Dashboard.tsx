import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const statusData = [
  { name: "Open", value: 12, color: "hsl(var(--status-open))" },
  { name: "Triaged", value: 8, color: "hsl(var(--status-triaged))" },
  { name: "In Progress", value: 5, color: "hsl(var(--status-progress))" },
  { name: "Done", value: 23, color: "hsl(var(--status-done))" },
];

const priorityData = [
  { name: "Critical", count: 3, color: "hsl(var(--priority-critical))" },
  { name: "High", count: 7, color: "hsl(var(--priority-high))" },
  { name: "Medium", count: 15, color: "hsl(var(--priority-medium))" },
  { name: "Low", count: 23, color: "hsl(var(--priority-low))" },
];

const dailyStats = [
  { date: "Mon", created: 4, resolved: 2 },
  { date: "Tue", created: 6, resolved: 5 },
  { date: "Wed", created: 3, resolved: 4 },
  { date: "Thu", created: 8, resolved: 3 },
  { date: "Fri", created: 5, resolved: 7 },
  { date: "Sat", created: 2, resolved: 1 },
  { date: "Sun", created: 1, resolved: 3 },
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Badge variant="secondary" className="text-sm">
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              +4 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-priority-critical" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-priority-critical">3</div>
            <p className="text-xs text-muted-foreground">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-status-done" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-done">7</div>
            <p className="text-xs text-muted-foreground">
              Great progress!
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3</div>
            <p className="text-xs text-muted-foreground">
              days per issue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="created" fill="hsl(var(--status-open))" name="Created" radius={[2, 2, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(var(--status-done))" name="Resolved" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}