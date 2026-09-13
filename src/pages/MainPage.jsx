import MainHero from "../components/main/MainHero";
import {ContentContainer} from "../components/layout/ContentContainer.styles"
import ProductsSection from "../components/main/ProductsSection";
import ExperiencesSection from "../components/main/ExperiencesSection";
import ZooMapSection from "../components/main/ZooMapSection";
import GoodsSection from "../components/main/GoodsSection";
import ReviewsSection from "../components/main/ReviewsSection";


export default function MainPage () {
  return (
    <>
      <MainHero />

      <ContentContainer>
        <ProductsSection />
        <ExperiencesSection />
        <ZooMapSection />
        <GoodsSection />
        <ReviewsSection />
      </ContentContainer>
    </>
  )
}
