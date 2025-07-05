import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="gap-2 bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="h-4 w-4" />
          Create Issue
        </Button>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
            Admin
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}