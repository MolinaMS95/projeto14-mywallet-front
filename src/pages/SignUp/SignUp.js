import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Forms from "../../components/Forms";
import { colors } from "../../constants/colors";
import { urls } from "../../constants/urls";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function createAccount(event) {
    event.preventDefault();
    setDisabled(true);
    axios
      .post(urls.signup, form)
      .then(() => navigate("/"))
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
      <Forms submit={createAccount} isDisabled={disabled}>
      <input
          name="name"
          placeholder="Nome"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
         
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleForm}
          disabled={disabled}
          required
        />
        <input
          name="confirm"
          type="url"
          onChange={handleForm}
          placeholder="Confirme a senha"
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
            "Cadastrar"
          )}
        </button>
      </Forms>
      <LoginLink
        to="/"
        color={colors.text}
      >
        Já tem uma conta? Entre agora!
      </LoginLink>
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

const LoginLink = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  color: ${(props) => props.color};
`;