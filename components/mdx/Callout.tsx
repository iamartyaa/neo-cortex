import { AlertCircle, Info, Lightbulb, AlertTriangle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "danger" | "note";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ElementType; className: string; defaultTitle: string }
> = {
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-500 dark:bg-blue-950/50",
    defaultTitle: "Info",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/50",
    defaultTitle: "Warning",
  },
  tip: {
    icon: Lightbulb,
    className: "bg-green-50 border-green-500 dark:bg-green-950/50",
    defaultTitle: "Tip",
  },
  danger: {
    icon: Flame,
    className: "bg-red-50 border-red-500 dark:bg-red-950/50",
    defaultTitle: "Danger",
  },
  note: {
    icon: AlertCircle,
    className: "bg-purple-50 border-purple-500 dark:bg-purple-950/50",
    defaultTitle: "Note",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 border-2 border-border p-4 shadow-neo",
        config.className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {(title || config.defaultTitle) && (
            <p className="font-bold text-sm uppercase tracking-wide mb-1">
              {title || config.defaultTitle}
            </p>
          )}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

