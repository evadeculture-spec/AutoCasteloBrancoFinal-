import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/site";
import { countByCategory } from "@/lib/vehicles";
import { cn } from "@/lib/utils";

export function Categories() {
  return (
    <section className="bg-sand-100 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading eyebrow="Categorias" title="Encontre a viatura certa para si" />
        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-6 md:auto-rows-[260px]">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05} className={cn(i < 2 ? "md:col-span-3" : "md:col-span-2")}>
              <Link href={`/viaturas/?categoria=${c.id}`} className="group relative flex h-full overflow-hidden rounded-xl bg-navy-900 p-6 text-white">
                <SafeImage src={c.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="relative mt-auto flex w-full items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl text-white md:text-3xl">{c.label}</h3>
                    <p className="mt-1 text-sm text-white/75">{c.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur transition-colors group-hover:bg-white group-hover:text-navy-900">
                    {countByCategory(c.id)} <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
