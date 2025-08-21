import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type KPIVariant = "primary" | "success" | "warning" | "danger" | "default";
export type TrendDirection = "up" | "down" | "neutral";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: KPIVariant;
  trend?: {
    direction: TrendDirection;
    value: string;
    label?: string;
  };
  className?: string;
}

const variantClasses = {
  primary: "kpi-card-primary",
  success: "kpi-card-success", 
  warning: "kpi-card-warning",
  danger: "kpi-card-danger",
  default: "kpi-card",
};

const trendClasses = {
  up: "text-success",
  down: "text-danger", 
  neutral: "text-muted-foreground",
};

const TrendIcon = ({ direction }: { direction: TrendDirection }) => {
  const iconClass = "h-4 w-4";
  switch (direction) {
    case "up":
      return <TrendingUp className={iconClass} />;
    case "down":
      return <TrendingDown className={iconClass} />;
    default:
      return <Minus className={iconClass} />;
  }
};

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  trend,
  className,
}: KPICardProps) {
  return (
    <div className={cn(variantClasses[variant], className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="metric-label">{title}</p>
          <p className="metric-value mt-2">
            {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className="ml-4 opacity-60">
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className={cn("flex items-center gap-1 mt-4 text-sm", trendClasses[trend.direction])}>
          <TrendIcon direction={trend.direction} />
          <span className="font-medium">{trend.value}</span>
          {trend.label && <span className="text-muted-foreground ml-1">{trend.label}</span>}
        </div>
      )}
    </div>
  );
}