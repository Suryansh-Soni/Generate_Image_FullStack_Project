import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: 14px;

  color: ${({ theme }) => theme.white};
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

  background: ${({ $variant, theme }) =>
    $variant === "secondary"
      ? `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`
      : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`};

  box-shadow: 0 8px 24px ${({ theme }) => theme.primary + "35"};

  opacity: ${({ $isDisabled, $isLoading }) =>
    $isDisabled ? 0.45 : $isLoading ? 0.8 : 1};

  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px ${({ theme }) => theme.primary + "55"};
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 14px;
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
