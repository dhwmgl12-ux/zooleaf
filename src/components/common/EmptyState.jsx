
export default function EmptyState({
  title,
  description,
  onButtonClick,
  buttonText,
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      {buttonText && onButtonClick && (
        <button type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

