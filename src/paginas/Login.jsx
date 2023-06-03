import {useState } from "react";

import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../componentes/Input";
import Button from "../componentes/button";
import Logo from "../componentes/Logo";
import Container from "../componentes/ContainerLogin";
import StyledLink from "../componentes/Links";

import Context from "../componentes/Context/contex";
import React, { useContext} from "react";
import imagemLogo from '../imagens/logo.svg'



export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dados, setDados} = useContext(Context) 

    const navigate = useNavigate();

    function logar(e){
        
    e.preventDefault();

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

    const novoLogin = {email, password};

    const promise = axios.post(URL, novoLogin);

    promise.then( resposta => {
      
      console.log(resposta.data.token);
      const Token = {...dados}
      Token.token = "Bearer " + resposta.data.token;
      setDados(Token)


      navigate('/Hoje');
      

    });
    promise.catch( erro => alert(erro.response.data.message));
    }

    return (
        <Container>
            <Logo>
                <img src={imagemLogo} alt="" />
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
