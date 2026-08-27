import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="label-mono text-primary mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
