import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Termos e Condições", description: "Termos e condições de utilização do site e dos serviços AutoCasteloBranco.", path: "/termos/" });

export default function TermosPage() {
  return (
    <LegalPage title="Termos e Condições" updated="outubro 2026">
      <section><h2>1. Informação das viaturas</h2><p>As características, preços e fotografias são indicativos e podem conter erros. Os preços incluem IVA à taxa legal em vigor. A confirmação final das condições é feita no momento da venda.</p></section>
      <section><h2>2. Reservas</h2><p>[A definir] Condições do sinal de reserva, prazo de validade e reembolso.</p></section>
      <section><h2>3. Garantia</h2><p>As viaturas usadas vendidas a consumidores beneficiam da garantia legal prevista no Decreto-Lei n.º 84/2021. [Condições da garantia comercial adicional a confirmar.]</p></section>
      <section><h2>4. Financiamento</h2><p>As simulações apresentadas são meramente ilustrativas e não constituem proposta contratual. A concessão de crédito está sujeita a análise e aprovação pela entidade financeira. [Intermediário de crédito: registo no Banco de Portugal a confirmar.]</p></section>
      <section><h2>5. Direito de livre resolução</h2><p>Nos contratos celebrados à distância, o consumidor dispõe de 14 dias para exercer o direito de livre resolução, nos termos do Decreto-Lei n.º 24/2014. [Política de devolução comercial a confirmar.]</p></section>
      <section><h2>6. Resolução alternativa de litígios</h2><p>Em caso de litígio, o consumidor pode recorrer a uma entidade de resolução alternativa de litígios de consumo [entidade competente da região a confirmar]. Mais informações no Portal do Consumidor (www.consumidor.gov.pt). Livro de Reclamações Eletrónico disponível em www.livroreclamacoes.pt.</p></section>
      <section><h2>7. Contactos</h2><p>{site.legalName} · {site.email} · {site.phone}</p></section>
    </LegalPage>
  );
}
