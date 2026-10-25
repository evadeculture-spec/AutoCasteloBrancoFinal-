import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Política de Privacidade", description: "Como a AutoCasteloBranco trata os seus dados pessoais, nos termos do RGPD.", path: "/privacidade/" });

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updated="outubro 2026">
      <section><h2>1. Responsável pelo tratamento</h2><p>{site.legalName}, NIF {site.nif}, com sede em {site.address.street}, {site.address.postalCode} {site.address.city}. Contacto: {site.email}.</p></section>
      <section><h2>2. Dados recolhidos</h2><ul><li>Identificação e contacto: nome, telemóvel, email.</li><li>Dados da viatura (retoma e oficina): matrícula, marca, modelo, quilómetros, fotografias.</li><li>Dados de navegação, mediante consentimento (ver Política de Cookies).</li></ul></section>
      <section><h2>3. Finalidades e fundamentos</h2><ul><li>Responder a pedidos de informação, reservas, test-drives e marcações — diligências pré-contratuais (art. 6.º, n.º 1, al. b) RGPD).</li><li>Envio de newsletter — consentimento (art. 6.º, n.º 1, al. a)).</li><li>Cumprimento de obrigações legais e fiscais (art. 6.º, n.º 1, al. c)).</li></ul></section>
      <section><h2>4. Conservação</h2><p>Os dados são conservados apenas pelo período necessário à finalidade ou pelo prazo legal aplicável. [Prazos a definir.]</p></section>
      <section><h2>5. Partilha</h2><p>Os dados podem ser partilhados com entidades financeiras parceiras (apenas para pedidos de financiamento, com o seu pedido expresso) e com subcontratantes de tecnologia, sujeitos a acordos de tratamento de dados.</p></section>
      <section><h2>6. Os seus direitos</h2><p>Pode exercer os direitos de acesso, retificação, apagamento, limitação, portabilidade e oposição através de {site.email}. Tem ainda direito a apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD — www.cnpd.pt).</p></section>
    </LegalPage>
  );
}
