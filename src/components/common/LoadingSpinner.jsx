import { LoadingSpinnerContainer } from "./LoadingSpinner.styles";

export default function LoadingSpinner() {
  return (
    <LoadingSpinnerContainer className="loading-spinner">
      <div className="loader"></div>
      <h2>Loading...</h2>
      <p>잠시만 기다려 주세요.</p>
    </LoadingSpinnerContainer>
  );
}