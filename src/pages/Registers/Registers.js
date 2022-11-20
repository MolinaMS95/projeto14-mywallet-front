import { useContext } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { UserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function Registers() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <TopContainer color={colors.text}>
        <p>Olá, Fulano</p>
        <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
      </TopContainer>
      <RegisterDisplay color={colors.text}>
        Não há registros de entrada ou saída
      </RegisterDisplay>
      <ButtonsContainer color={colors.buttons} textColor={colors.text}>
        <button>
          <ion-icon name="add-circle-outline"></ion-icon>
          Nova<br/>entrada
        </button>
        <button>
          <ion-icon name="remove-circle-outline"></ion-icon>
          Nova<br/>saída
        </button>
      </ButtonsContainer>
    </>
  );
}

const TopContainer = styled.div`
  width: 326px;
  margin: 25px 0px;

  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: ${(props) => props.color};

  display: flex;
  justify-content: space-between;

  ion-icon:hover {
    cursor: pointer;
  }
`;

const RegisterDisplay = styled.div`
  width: 326px;
  height: 446px;
  margin-bottom: 13px;

  background: ${(props) => props.color};
  border-radius: 5px;

  font-family: "Raleway";
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #868686;

  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  width: 326px;
  display: flex;
  justify-content: space-between;

  button {
    width: 155px;
    height: 114px;
    background: ${(props) => props.color};
    border: none;
    border-radius: 5px;

    font-family: "Raleway";
    font-weight: 700;
    font-size: 17px;
    color: ${(props) => props.textColor};

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    text-align: left;
  }

  ion-icon{
    font-size: 25px;
  }
`;
