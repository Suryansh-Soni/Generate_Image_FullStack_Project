import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const SearchBarContainer = styled.div`
  max-width: 550px;
  display: flex;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.text_secondary + "90"};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 12px;
  gap: 6px;
  align-items: center;
`;

const SearchBar = ({ search, handleChange }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined />
      <input
        type="text"
        placeholder="Search with prompt!"
        value={search}
        onChange={handleChange}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          color: "inherit",
          fontSize: "16px",
          background: "transparent",
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
