import { darkTheme, lightTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.35s ease;
`;

const Wrapper = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Wrapper>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
