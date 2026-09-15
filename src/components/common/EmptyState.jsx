import { EmptyStateContainer } from "./EmptyState.styles";

export default function EmptyState({
  title,
  description,
  onButtonClick,
  buttonText,
}) {
  return (
    <EmptyStateContainer className="empty-state">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      {buttonText && onButtonClick && (
        <button type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </EmptyStateContainer>
  );
}

