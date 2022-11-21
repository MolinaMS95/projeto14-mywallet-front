import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { UserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urls } from "../../constants/urls";
import Swal from "sweetalert2";

export default function Registers() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get(urls.registers, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        setInfo(response.data);
        let sum = 0;
        response.data.forEach((item) =>
          item.type === "entrada"
            ? (sum += Number(item.value))
            : (sum -= Number(item.value))
        );
        setBalance(sum);
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
          footer: `Error status ${error.response.status}`,
        })
      );
  }, [user, setInfo]);

  function logout() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <TopContainer color={colors.text}>
        <p>Olá, {user.name}</p>
        <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
      </TopContainer>
      <RegisterDisplay color={colors.text}>
        {info.length === 0 ? (
          "Não há registros de entrada ou saída"
        ) : (
          <>
            {info.map((item) => (
              <div key={item._id}>
                <span>
                  {item.date} <p>{item.description}</p>
                </span>
                <Value type={item.type}>{String(item.value.toFixed(2)).replace(".", ",")}</Value>
              </div>
            ))}
            <Total isPositive={balance >= 0}>
              <p>SALDO</p>
              <p>{String(Math.abs(balance.toFixed(2))).replace(".", ",")}</p>
            </Total>
          </>
        )}
      </RegisterDisplay>
      <ButtonsContainer color={colors.buttons} textColor={colors.text}>
        <button onClick={() => navigate("/inserir/entrada")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          Nova
          <br />
          entrada
        </button>
        <button onClick={() => navigate("/inserir/saida")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          Nova
          <br />
          saída
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
  padding: 15px;

  background: ${(props) => props.color};
  border-radius: 5px;

  font-family: "Raleway";
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #868686;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  div {
    width: 296px;
    margin-bottom: 15px;

    display: flex;
    justify-content: space-between;

    font-size: 16px;
  }

  span {
    display: flex;
    color: #c6c6c6;

    p {
      color: #000000;
      margin-left: 5px;
    }
  }
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

  ion-icon {
    font-size: 25px;
  }
`;

const Value = styled.p`
  color: ${(props) => (props.type === "entrada" ? "#03AC00" : "#C70000")};
`;

const Total = styled.div`
  position: absolute;
  left: 15px;
  bottom: 0px;

  p:first-child {
    font-weight: 700;
    color: #000000;
  }

  p:last-child {
    color: ${(props) => (props.isPositive ? "#03AC00" : "#C70000")};
  }
`;
