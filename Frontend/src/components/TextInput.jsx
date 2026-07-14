import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  padding-left: 4px;
`;

const OutlinedInput = styled.div`
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.text_primary};

  padding: 14px 16px;

  display: flex;
  align-items: flex-start;

  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 6px 18px ${({ theme }) => theme.shadow};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.primary}33,
      0 8px 24px ${({ theme }) => theme.shadow};
    transform: translateY(-1px);
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  resize: none;

  background: transparent;
  color: ${({ theme }) => theme.text_primary};

  font-size: 15px;
  font-family: inherit;
  line-height: 1.6;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  textarea& {
    min-height: 120px;
  }
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handelChange,
  textArea,
  rows,
  columns,
}) => {
  return (
    <Container>
      <Label>{label}</Label>

      <OutlinedInput>
        <Input
          as={textArea ? "textarea" : "input"}
          name={name}
          rows={rows}
          columns={columns}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handelChange(e)}
        />
      </OutlinedInput>
    </Container>
  );
};

export default TextInput;
