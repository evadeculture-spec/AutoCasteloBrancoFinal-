import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { getFeatured } from "@/lib/vehicles";

export function Featured() {
  const list = getFeatured(6);
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        eyebrow="Em destaque"
        title="Seleção da semana"
        description="Viaturas escolhidas pela nossa equipa pelo equilíbrio entre estado, equipamento e preço."
        action={
          <Button asChild variant="outline">
            <Link href="/viaturas/">
              Ver todo o stock <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
