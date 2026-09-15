import { useEffect, useState } from "react";

import { getMainData } from "../api/mainApi";
import { getExperiences } from "../api/experienceApi"
import MainHero from "../components/main/MainHero";
import { ContentContainer } from "../components/layout/ContentContainer.styles"
import ProductsSection from "../components/main/ProductsSection";
import ExperiencesSection from "../components/main/ExperiencesSection";
import ZooMapSection from "../components/main/ZooMapSection";
import GoodsSection from "../components/main/GoodsSection";
import ReviewsSection from "../components/main/ReviewsSection";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";


export default function MainPage () {
  const [mainData, setMainData] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMainPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [mainResult, experienceResult] =
          await Promise.all([
            getMainData(controller.signal),
            getExperiences(controller.signal),
          ]);

        setMainData(mainResult);
        setExperiences(experienceResult);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMainPageData();

    return () => {
      controller.abort();
    };
  }, []);

  const {
    recommendedProducts = [],
    zones = [],
    recommendedGoods = [],
    visitorReviews = [],
  } = mainData ?? {};

  return (
    <>
      <MainHero />

      <ContentContainer>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState 
            title=""
            description=""
            buttonText=""
            onButtonClick={() => window.location.reload()}
          />
        ) : (
          <>
            <ProductsSection products={recommendedProducts} />
            <ExperiencesSection experiences={experiences} />
            <ZooMapSection zones={zones} />
            <GoodsSection goods={recommendedGoods} />
            <ReviewsSection reviews={visitorReviews} />
          </>
        )}
      </ContentContainer>
    </>
  )
}
