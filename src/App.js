import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Registers from "./pages/Registers/Registers";
import Insert from "./pages/Insert/Insert";
import { colors } from "./constants/colors";
import { UserContext } from "./components/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle color={colors.body} />
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/registros" element={<Registers />} />
            <Route path="/inserir" element={<Insert />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
