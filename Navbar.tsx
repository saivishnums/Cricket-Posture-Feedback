import { Link } from "wouter";
import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors">
          <Activity className="h-6 w-6 text-primary" />
          <span>CricTech AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/analysis" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Analyze
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pro Models
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
            Sign In
          </Button>
          <Button className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,128,0.3)]">
            <Link href="/analysis">Start Analysis</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
