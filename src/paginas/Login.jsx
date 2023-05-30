import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  

    const navigate = useNavigate();

    function logar(e){
        
    e.preventDefault();

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

    const novoLogin = {email, password};

    const promise = axios.post(URL, novoLogin);

    promise.then( resposta => {
      
      console.log(resposta.data.token);
      
      setToken(resposta.data.token);

      navigate('/');

    });
    promise.catch( erro => alert(erro.response.data.message));
    }

    return (
        <Container>
            <Logo>
                <img src="" alt="" />
                <h1>TrackIt</h1>
            </Logo>
          
          <form onSubmit={logar}>
            <Input
              data-test="email-input"
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input
              data-test="password-input"
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />
            <Button data-test="login-btn" type="submit">Entrar</Button>
          </form>
    
          <StyledLink data-test="signup-link" to="/sign-up">Não tem uma conta? Cadastre-se</StyledLink>
        </Container>
      )
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #FFFFFF;
`
const StyledLink = styled(Link)`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52B6FF;
`
const Input = styled.input`
  height: 45px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  color: #222222;
  font-family: 'Lexend Deca', sans-serif;
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 4px;

  ::placeholder {
    color: #DBDBDB;
    font-family: 'Lexend Deca', sans-serif;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
  }
`
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
const Logo = styled.div`
  padding: 41px 0;
  font-size: 52px;
  font-family: 'Pacifico', cursive;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;


  h1{
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    color: #126BA5;
  }
`