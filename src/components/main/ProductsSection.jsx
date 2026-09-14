
import ProductCard from '../product/ProductCard.jsx'
import MainSectionHeader from './MainSectionHeader.jsx'
import { MainSectionContainer, MainSectionMoreLink, MainCardList,} from './MainSection.styles.js'

export default function ProductsSection({products = [],}) {
  return (
    <MainSectionContainer className='section-products'>
      <MainSectionHeader 
        title="추천 티켓 & 패키지"
        description="나에게 딱 맞는 이용권으로 ZOOLEAF를 만나보세요."
      />

      <MainCardList>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </MainCardList>

      <MainSectionMoreLink to="/products">더 둘러보기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
