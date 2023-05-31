import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../componentes/Input";
import Button from "../componentes/button";
import Logo from "../componentes/Logo";
import Container from "../componentes/ContainerLogin";
import StyledLink from "../componentes/Links";




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
    
          <StyledLink data-test="signup-link" to="/Cadastro">Não tem uma conta? Cadastre-se</StyledLink>
        </Container>
      )
}
