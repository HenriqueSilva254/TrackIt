import styled from "styled-components"


const Button = styled.button`
  height: 45px;
  width: 100%;
  background-color: ${(props) => typeof props.active !== 'boolean' || props.active ? "#52B6FF" : "#888"};
  color: #FFFFFF;
  font-family: 'Lexend Deca', sans-serif;
  padding: 14px;
  ${(props) => !props.noMargin && "margin-bottom: 10px;"}
  border-radius: 4.63636px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export default Button