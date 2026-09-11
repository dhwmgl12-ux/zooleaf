import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const DetailImageContainer = styled.div`
  width: 100%;
`

export const ThumbNailContainer = styled.div`
  border-radius: ${theme.radius.box};
  overflow: hidden;
`

export const ImgSlide = styled.ul`
  width: max(320px, 828px);
  display: flex;
`