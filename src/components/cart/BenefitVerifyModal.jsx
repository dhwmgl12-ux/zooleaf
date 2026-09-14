import { useRef, useState } from "react";
import Modal from "../common/Modal";
import { isLastWednesday } from "../../utils/cartBenefits";
import {
  ModalButtonArea,
  ModalCancelButton,
} from "../../pages/CartPage.styles";
import {
  Form,
  Field,
  ErrorMessage,
  ApplyButton,
  HighlightText,
} from "./BenefitVerifyModal.styles";

export default function BenefitVerifyModal({ benefit, onClose, onApply }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const isDateBenefit = benefit.id === "cultureDay";

  const handleSubmit = (event) => {
    event.preventDefault();

    let message = "";

    if (isDateBenefit) {
      if (!value) {
        message = "이용 예정일을 선택해주세요.";
      } else if (!isLastWednesday(value)) {
        message = "매월 마지막 수요일을 선택해주세요.";
      }
    } else if (!value) {
      message = `${benefit.inputLabel}를 입력해주세요.`;
    } else if (!/^\d+$/.test(value)) {
      message = "번호는 숫자로만 입력해주세요.";
    } else if (value.length !== benefit.digits) {
      message = `숫자 ${benefit.digits}자리를 입력해주세요.`;
    }

    if (message) {
      setError(message);
      inputRef.current?.focus();
      return;
    }

    // 날짜만 화면의 할인 계산에 전달하고 번호는 전달하지 않음
    onApply(benefit.id, isDateBenefit ? value : "");
  };

  return (
    <Modal variant="cart" isOpen onClose={onClose} title="결제 혜택 확인">
      <Form onSubmit={handleSubmit} noValidate>
        <p>{benefit.label}</p>

        {isDateBenefit ? (
          <p>
            <HighlightText>매월 마지막 수요일</HighlightText>을 선택하면 대상
            입장권에 30% 할인이 적용됩니다. 이 날짜 선택은 할인 화면 확인용이며
            방문일 예약은 아닙니다.
          </p>
        ) : (
          <p>
            화면 확인용 절차입니다. 실제 번호 대신 테스트 숫자를 입력해주세요.
          </p>
        )}

        <Field>
          <label htmlFor="benefit-verification">
            {isDateBenefit ? "이용 예정일" : benefit.inputLabel}
          </label>

          <input
            ref={inputRef}
            id="benefit-verification"
            type={isDateBenefit ? "date" : "text"}
            inputMode={isDateBenefit ? undefined : "numeric"}
            autoComplete="off"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "benefit-error" : undefined}
          />

          {error && (
            <ErrorMessage id="benefit-error" role="alert">
              {error}
            </ErrorMessage>
          )}
        </Field>

        <ModalButtonArea data-modal-actions>
          <ModalCancelButton data-modal-cancel type="button" onClick={onClose}>
            취소
          </ModalCancelButton>

          <ApplyButton data-modal-confirm type="submit">
            적용
          </ApplyButton>
        </ModalButtonArea>
      </Form>
    </Modal>
  );
}
