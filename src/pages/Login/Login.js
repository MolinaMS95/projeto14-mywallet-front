import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Forms from "../../components/Forms";
import { colors } from "../../constants/colors";
import { urls } from "../../constants/urls";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../components/UserContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    axios
      .post(urls.login, form)
      .then((response) => {
        setUser(response.data);
        navigate("/registers");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response.status === 422
              ? error.response.data.details[0]
              : error.response.data.message,
          footer: `Error status ${error.response.status}`,
        });
        setDisabled(false);
      });
  }

  return (
    <Body color={colors.body}>
      <Title color={colors.text}>MyWallet</Title>
      <Forms submit={login} isDisabled={disabled}>
        <input
          type="email"
          name="email"
          onChange={handleForm}
          placeholder="E-mail"
          disabled={disabled}
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleForm}
          placeholder="Senha"
          disabled={disabled}
          required
        />
        <button type="submit">
          {disabled ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Entrar"
          )}
        </button>
      </Forms>
      <div>
        <SignUpLink to="/cadastro" color={colors.text}>
          Primeira vez? Cadastre-se!
        </SignUpLink>
      </div>
    </Body>
  );
}

const Body = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
`;

const Title = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: ${(props) => props.color};
  text-align: center;

  margin-top: 159px;
`;

const SignUpLink = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.color};
`;
