import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Forms from "../../components/Forms";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { urls } from "../../constants/urls";
import { UserContext } from "../../components/UserContext";

export default function Insert() {
  const { type } = useParams();
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState(null);

  function inserir(event) {
    event.preventDefault();
    const numberValue = Number(value.replace(",", "."));
    if (isNaN(numberValue)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Insira um valor válido!",
      });
      return;
    }
    setDisabled(true);
    axios
      .post(
        urls.registers,
        { value: numberValue, description, type },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then(() => {
        navigate("/registros");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
          footer: `Error status ${error.response.status}`,
        });
        setDisabled(false);
      });
  }

  return (
    <>
      <Header color={colors.text}>Nova {type}</Header>
      <Forms submit={inserir} isDisabled={disabled}>
        <input
          type="text"
          name="value"
          placeholder="Valor"
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={(event) => setDescription(event.target.value)}
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
