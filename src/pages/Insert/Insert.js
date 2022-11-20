import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Forms from "../../components/Forms";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

export default function Insert() {
  const { type } = useParams();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header color={colors.text}>Nova {type}</Header>
      <Forms  isDisabled={disabled}>
        <input
          type="email"
          name="valor"
          placeholder="Valor"
          disabled={disabled}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Descrição"
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
            `Salvar ${type}`
          )}
        </button>
      </Forms>
    </>
  );
}

const Header = styled.div`
  width: 326px;
  margin-top: 25px;

  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 26px;
  color: ${(props) => props.color};
`;
