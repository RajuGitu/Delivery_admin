import { TrendingUp, HelpCircle, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-6 mt-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-success" />
            <span>92% First-Attempt Success Rate</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="#"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </a>

            <a
              href="#"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Shield className="w-4 h-4" />
              Privacy
            </a>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          AI recommendations are based on your locality traffic patterns and past delivery success
        </p>
      </div>
    </footer>
  );
}