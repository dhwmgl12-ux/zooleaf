
import MainSectionHeader from './MainSectionHeader'
import { MainSectionContainer, MainSectionMoreLink, MainCardList,} from './MainSection.styles.js'
import ExperienceCard from "../experience/ExperienceCard.jsx"

export default function ExperiencesSection({ experiences = [], }) {
  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="인기 체험 프로그램"
        description="보고 즐기는 것을 넘어 동물들과 특별한 순간을 만들어보세요."
      />

      <MainCardList>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <ExperienceCard experience={experience} />
          </li>
        ))}
      </MainCardList>

      <MainSectionMoreLink to="/experiences">더 둘러보기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
