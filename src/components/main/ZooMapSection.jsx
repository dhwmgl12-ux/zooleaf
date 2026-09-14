import MainSectionHeader from './MainSectionHeader'
import { MainSectionContainer, MainSectionMoreLink, MainCardList,} from './MainSection.styles.js'


export default function ZooMapSection({
  zoneMapImageUrl,
  zones = [],
}) {
  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="ZOOLEAF 동물원 탐험하기"
        description="ZOOLEAF 곳곳에서 기다리고 있는 동물 친구들을 만나보세요."
      />

      {zones.map((zone) => (
        <article key={zone.id}>
          <h3>{zone.name}</h3>
            
          <img
            src={zone.imageUrl}
            alt={zone.name}
          />
      
          <ul>
            {zone.popularAnimals.map((animal) => (
              <li key={animal.id}>
                <img
                  src={animal.imageUrl}
                  alt=""
                />
                <span>{animal.name}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}

      <MainSectionMoreLink to="/animals">더 많은 동물 보러가기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
