import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Featured } from "@/components/home/featured";
import { Categories } from "@/components/home/categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { WorkshopBlock } from "@/components/home/workshop-block";
import { Testimonials } from "@/components/home/testimonials";
import { Location } from "@/components/home/location";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Featured />
      <Categories />
      <HowItWorks />
      <WorkshopBlock />
      <Testimonials />
      <Location />
      <Newsletter />
    </>
  );
}
