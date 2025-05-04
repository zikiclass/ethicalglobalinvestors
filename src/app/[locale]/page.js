import {
  Carousel,
  CopyExperts,
  Features,
  NavBar,
  TradingViewWidget,
  WhatWeOffer,
  Cryptocurrencies,
  FinancialMarket,
  TradingPlan,
  LatestPayouts,
  Faq,
  Footer,
} from "../HomeComponents";
import { project_name } from "../../../env";
export default function Home() {
  return (
    <>
      <NavBar />

      <Carousel project_title={project_name} />
      <TradingViewWidget />
      <Features />
      <CopyExperts project_title={project_name} />
      <WhatWeOffer />
      <Cryptocurrencies />
      <FinancialMarket />
      <TradingPlan />
      <LatestPayouts />
      <Faq project_title={project_name} />

      <Footer />
    </>
  );
}
