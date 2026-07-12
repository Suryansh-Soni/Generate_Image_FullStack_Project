import React from "react";
import styled from "styled-components";
import Button from "./button.jsx";
const Container = styled.div``;

const NavBar = () => {
  return (
    <Container>
      GenAI
      <Button text="Create new Post" />
    </Container>
  );
};

export default NavBar;
