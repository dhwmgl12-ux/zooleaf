import styled from "@emotion/styled";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

const StyledInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`
export default function AuthInput({label, type = 'text', name, value, onChange, placeholder }) {
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput 
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  )
}