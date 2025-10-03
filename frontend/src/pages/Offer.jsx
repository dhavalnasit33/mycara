import CategoriesSection from "../components/CategoriesSection";
import OfferBanner from "../components/offers/offerBanner";
import SizeSection from "../components/offers/SizeSection";

export default function Offer() {
  return (
    <div>
      <OfferBanner />
      <CategoriesSection />
      <SizeSection />
    </div>
  );
};

