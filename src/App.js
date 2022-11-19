import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Registers from "./pages/Registers/Registers";
import Insert from "./pages/Insert/Insert";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/registros" element={<Registers />} />
          <Route path="/inserir" element={<Insert />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
