import styled from "styled-components";
import { colors } from "../constants/colors";

export default function Forms({ children, isDisabled, submit }) {
  return (
    <Form onSubmit={submit} color={colors} isDisabled={isDisabled}>
      {children}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 13px;
  margin: 30px 0px;

  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    padding-left: 15px;
    background: ${(props) => props.isDisabled && "#F2F2F2"};

    font-family: "Raleway", sans-serif;
    font-size: 20px;
  }

  input::placeholder {
    color: ${(props) => props.color.placeholder};
  }

  button {
    width: 326px;
    height: 46px;

    opacity: ${(props) => props.isDisabled && 0.7};
    background-color: ${(props) => props.color.buttons};

    border: none;
    border-radius: 5px;

    font-family: "Raleway", sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.color.text};

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
