import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/page-404.webp';
import { Container } from './NotFoundPage.styles';

export default function NotFoundPage() {
  return (
    <Container aria-labelledby="not-found-title">
      <img src={notFoundImage} alt="" />
      <h1 id="not-found-title">404 · 페이지를 찾을 수 없어요</h1>
      <p>
        요청하신 페이지가 존재하지 않거나 주소가 변경되었어요.
        <br />
        입력한 주소를 확인하거나 메인 페이지로 이동해 주세요.
      </p>
      <Link to="/" replace>메인으로 이동</Link>
    </Container>
  );
}
