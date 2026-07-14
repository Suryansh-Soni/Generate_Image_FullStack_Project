import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "secondary" ? theme.primary : theme.primary};

  outline: none;
  border-radius: 14px;

  color: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.primary : theme.white};

  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;

  cursor: ${({ $isDisabled, $isLoading }) =>
    $isDisabled || $isLoading ? "not-allowed" : "pointer"};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: min-content;
  padding: 12px 26px;

  flex: ${({ $flex }) => ($flex ? 1 : "initial")};

  background: ${({ theme, $variant }) =>
    $variant === "secondary"
      ? "transparent"
      : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`};

  box-shadow: 0 8px 24px ${({ theme }) => theme.shadow};

  opacity: ${({ $isDisabled, $isLoading }) =>
    $isDisabled ? 0.45 : $isLoading ? 0.8 : 1};

  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
      $variant === "secondary"
        ? theme.hover
        : `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`};

    color: ${({ theme, $variant }) =>
      $variant === "secondary" ? theme.primary : theme.white};

    border-color: ${({ theme }) => theme.primary};

    transform: translateY(-2px);

    box-shadow: 0 12px 30px ${({ theme }) => theme.shadow};
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    pointer-events: none;
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 12px;

    svg {
      font-size: 18px;
    }
  }
`;

const Button = ({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  type = "primary",
  onClick,
  flex = false,
}) => {
  const handleClick = () => {
    if (!isDisabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      type="button"
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      $isDisabled={isDisabled}
      $isLoading={isLoading}
      $variant={type}
      $flex={flex}
    >
      {isLoading && <CircularProgress size={18} sx={{ color: "inherit" }} />}

      {!isLoading && leftIcon}

      {text}

      {isLoading && "..."}

      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default Button;