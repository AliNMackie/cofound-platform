import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComplianceBadgeProps {
  status: 'SAFE' | 'RISK';
  className?: string;
}

export function ComplianceBadge({ status, className }: ComplianceBadgeProps) {
  const isRisk = status === 'RISK';

  return (
    <Badge
      variant={isRisk ? "destructive" : "default"}
      className={cn(
        "relative inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold",
        isRisk 
          ? "bg-red-500 hover:bg-red-600 text-white" 
          : "bg-green-600 hover:bg-green-700 text-white",
        className
      )}
    >
      {isRisk && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {status}
    </Badge>
  );
}
