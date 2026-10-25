import { CompareTable } from "@/components/vehicles/compare-table";
import { pageMetadata } from "@/lib/seo";

export const metadata = { ...pageMetadata({ title: "Comparar viaturas", description: "Compare até 3 viaturas lado a lado.", path: "/comparar/" }), robots: { index: false } };

export default function CompararPage() {
  return (
    <div className="container-site pb-24 pt-10 md:pt-14">
      <h1 className="text-4xl md:text-5xl">Comparar viaturas</h1>
      <p className="mt-3 text-ink-500">Até 3 viaturas lado a lado. As diferenças estão destacadas.</p>
      <CompareTable />
    </div>
  );
}
