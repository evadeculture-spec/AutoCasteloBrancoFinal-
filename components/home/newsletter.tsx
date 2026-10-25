import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Newsletter() {
  return (
    <section className="container-site py-20 md:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-8 shadow-soft md:p-14">
        <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-brass-100 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow mb-3">Alertas de stock</p>
            <h2 className="text-3xl md:text-4xl">Seja o primeiro a saber.</h2>
            <p className="mt-3 text-ink-500">Novas viaturas chegam todas as semanas. Receba-as antes de serem publicadas.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
