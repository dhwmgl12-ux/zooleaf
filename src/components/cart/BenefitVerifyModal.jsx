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
  BenefitHeading,
  BenefitDescription,
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
        <BenefitHeading>{benefit.label}</BenefitHeading>

        {isDateBenefit ? (
          <BenefitDescription id="benefit-description">
            <span><HighlightText>매월 마지막 수요일</HighlightText>을 선택해주세요.</span>
            <span>대상 입장권에 30% 할인이 적용됩니다.</span>
            <small>할인 확인용 날짜이며 방문일 예약은 아닙니다.</small>
          </BenefitDescription>
        ) : (
          <BenefitDescription id="benefit-description">
            <span>테스트 숫자 {benefit.digits}자리를 입력해주세요.</span>
            <small>화면 확인용 절차로, 실제 번호는 입력하지 마세요.</small>
          </BenefitDescription>
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
            placeholder={isDateBenefit ? undefined : "예: 1234"}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "benefit-description benefit-error" : "benefit-description"}
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
