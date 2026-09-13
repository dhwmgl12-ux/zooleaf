import { MainSectionHeaderContainer } from "./MainSectionHeader.styles";

export default function MainSectionHeader({
  title,
  description,
}) {

  return (
    <MainSectionHeaderContainer className="section-title">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </MainSectionHeaderContainer>
  );
}
