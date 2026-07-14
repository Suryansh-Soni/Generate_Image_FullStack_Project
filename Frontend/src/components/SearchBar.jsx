import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const SearchBarContainer = styled.div`
  width: 90%;
  max-width: 650px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 18px;

  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.input};

  color: ${({ theme }) => theme.text_primary};

  box-shadow: 0 8px 24px ${({ theme }) => theme.shadow};

  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card_light};
    box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card};

    box-shadow:
      0 0 0 4px ${({ theme }) => `${theme.primary}20`},
      0 12px 32px ${({ theme }) => theme.shadow};

    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 12px 14px;
    border-radius: 14px;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  color: ${({ theme }) => theme.primary};
  font-size: 24px !important;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  flex: 1;

  border: none;
  outline: none;
  background: transparent;

  color: ${({ theme }) => theme.text_primary};

  font-size: 16px;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
    opacity: 1;
  }
`;

const SearchBar = ({ search, handleChange }) => {
  return (
    <SearchBarContainer>
      <SearchIcon />
      <Input
        type="text"
        placeholder="Search by prompt or author..."
        value={search}
        onChange={handleChange}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
