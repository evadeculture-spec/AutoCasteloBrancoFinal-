import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-3">Erro 404</p>
      <h1 className="text-4xl md:text-5xl">Esta página saiu do stand.</h1>
      <p className="mt-4 max-w-md text-ink-500">A página que procura não existe ou a viatura já foi vendida.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg"><Link href="/viaturas/">Ver viaturas</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/">Página inicial</Link></Button>
      </div>
    </div>
  );
}
