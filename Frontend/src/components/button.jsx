import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ $isDisabled, $isLoading }) =>
    $isDisabled || $isLoading ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;

  background: ${({ $variant, theme }) =>
    $variant === "secondary" ? theme.secondary : theme.primary};

  opacity: ${({ $isDisabled, $isLoading }) =>
    $isDisabled ? 0.4 : $isLoading ? 0.8 : 1};

  flex: ${({ $flex }) => ($flex ? 1 : "initial")};

  @media (max-width: 600px) {
    padding: 8px 12px;
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
