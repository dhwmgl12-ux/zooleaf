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
      if (!isLastWednesday(value)) {
        message = "매월 마지막 수요일에 해당하는 날짜를 선택해주세요.";
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

    // 입력값은 저장·전송하지 않고 확인 결과만 전달
    onApply(benefit.id);
  };

  return (
    <Modal isOpen onClose={onClose} title="결제 혜택 확인">
      <Form onSubmit={handleSubmit} noValidate>
        <p>{benefit.label}</p>

        <p>
          {isDateBenefit
            ? "선택한 입장권의 이용일도 해당 날짜 조건을 충족해야 합니다."
            : "화면 확인용 절차입니다. 실제 번호 대신 테스트 숫자를 입력해주세요."}
        </p>

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
              // 문자를 지워버리지 않아 숫자 검증 메시지를 표시할 수 있음
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

        <ModalButtonArea>
          <ModalCancelButton type="button" onClick={onClose}>
            취소
          </ModalCancelButton>

          <ApplyButton type="submit">적용</ApplyButton>
        </ModalButtonArea>
      </Form>
    </Modal>
  );
}
