import { ErrorStateContainer } from "./ErrorState.styles.jsx";

export default function ErrorState({
  title,
  description,
  onButtonClick,
  buttonText = "다시 시도하기",
}) {
  return (
    <ErrorStateContainer className="error-state">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      {buttonText && onButtonClick && (
        <button type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </ErrorStateContainer>
  );
}