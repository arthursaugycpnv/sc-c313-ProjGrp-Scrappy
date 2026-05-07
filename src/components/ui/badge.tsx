import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-3 py-1 text-xs text-[rgb(var(--foreground))]/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
