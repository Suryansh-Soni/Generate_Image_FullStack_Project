import React from "react";
import styled from "styled-components";
import Button from "./button.jsx";
import {
  AddRounded,
  ExploreRounded,
  LightModeRounded,
  DarkModeRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Toggle = styled.div`
  width: 62px;
  height: 32px;
  border-radius: 50px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  cursor: pointer;
  transition: 0.3s;
`;

const Thumb = styled.div`
  position: absolute;
  top: 3px;
  left: ${({ darkMode }) => (darkMode ? "31px" : "3px")};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ darkMode }) => (darkMode ? "#3b82f6" : "#facc15")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: all 0.3s ease;
`;

const NavBar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>GenAI</Logo>

      <Right>
        <Toggle onClick={() => setDarkMode(!darkMode)}>
          <Thumb darkMode={darkMode}>
            {darkMode ? (
              <DarkModeRounded style={{ fontSize: 16 }} />
            ) : (
              <LightModeRounded style={{ fontSize: 16 }} />
            )}
          </Thumb>
        </Toggle>

        {path[1] === "post" ? (
          <Button
            onClick={() => navigate("/")}
            text="Explore Post"
            leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
          />
        ) : (
          <Button
            onClick={() => navigate("/post")}
            text="Create New Post"
            leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
            type="secondary"
          />
        )}
      </Right>
    </Container>
  );
};

export default NavBar;
