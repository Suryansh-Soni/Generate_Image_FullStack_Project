import React from "react";
import styled from "styled-components";
import Button from "./button.jsx";
import {
  AddRounded,
  ExploreRounded,
  BrushRounded,
  LightModeRounded,
  DarkModeRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  padding: 18px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px ${({ theme }) => theme.shadow};

  @media (max-width: 600px) {
    padding: 14px 18px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0.5px;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  svg {
    font-size: 32px;
    color: ${({ theme }) => theme.primary};
    -webkit-text-fill-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 600px) {
    font-size: 24px;

    svg {
      font-size: 28px;
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const ThemeButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
    border-color: ${({ theme }) => theme.primary};
    transform: rotate(180deg);
    box-shadow: 0 6px 20px ${({ theme }) => theme.shadow};
  }

  svg {
    font-size: 24px;
  }
`;

const NavBar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <BrushRounded />
        CanvasAI
      </Logo>

      <Right>
        <ThemeButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeRounded /> : <DarkModeRounded />}
        </ThemeButton>

        {path[1] === "post" ? (
          <Button
            onClick={() => navigate("/")}
            text="Explore Gallery"
            leftIcon={<ExploreRounded />}
          />
        ) : (
          <Button
            onClick={() => navigate("/post")}
            text="Create Artwork"
            leftIcon={<AddRounded />}
            type="secondary"
          />
        )}
      </Right>
    </Container>
  );
};

export default NavBar;
