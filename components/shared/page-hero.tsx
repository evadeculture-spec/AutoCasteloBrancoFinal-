import type { ReactNode } from "react";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

/** Cabeçalho de página institucional com imagem, título e CTA acima da dobra */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  compact,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-navy-900 text-white", compact ? "py-14 md:py-20" : "py-16 md:py-28")}>
      {image && (
        <>
          <SafeImage src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/85 to-navy-900/30" />
        </>
      )}
      <div className="container-site">
        <p className="eyebrow mb-4 text-brass-300">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] text-white md:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
