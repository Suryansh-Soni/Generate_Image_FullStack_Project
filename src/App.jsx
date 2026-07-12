import { darkTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";

const Container = styled.div`
width:100%
height:100%;
display:flex;
background:${({ theme }) => {
  theme.bg;
}}
color:${({ theme }) => {
  theme.text_primary;
}}
overflow-x:hidden;
overflow-y:hidden;
transition :all 0.2s ease;
`;
const Wrapper = styled.div`
  heigth: 100%;
  position: relative;
  display: flex;
  flex-directio: column;
  justify-content: space-between;
  flex: 3;
`;
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/post" element={<CreatePost />} exact />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
