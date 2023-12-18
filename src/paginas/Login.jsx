import {useState } from "react";

import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../componentes/Input";
import Button from "../componentes/button";
import Logo from "../componentes/Logo";
import Container from "../componentes/ContainerLogin";
import StyledLink from "../componentes/Links";
import { ThreeDots } from 'react-loader-spinner'
import Context from "../componentes/Context/contex";
import React, { useContext} from "react";
import imagemLogo from '../imagens/logo.svg'

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dados, setDados} = useContext(Context) 
    const [Desabilitar, setDesabilitar] = useState(false);

    const navigate = useNavigate();

    function logar(e){
      
    e.preventDefault();
    setDesabilitar(true)
    setTimeout(() => {
    const URL = import.meta.env.VITE_API_SIGNIN

    const novoLogin = {email, password}
    const promise = axios.post(URL, novoLogin);

    promise.then( resposta => {

      dados.token = "Bearer " + resposta.data.token;
      dados.image = resposta.data.image

      navigate('/hoje');
    });
    promise.catch( erro => alert(erro.response.data.message));
    setDesabilitar(false)
    }, 3000)
    
    }

    return (
        <Container>
            <Logo>
                <img src={imagemLogo} alt="" />
            </Logo>
          
          <form onSubmit={logar}>
            <Input 
              disabled={Desabilitar}
              data-test="email-input"
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input 
              disabled={Desabilitar}
              data-test="password-input"
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />
            <Button disabled={Desabilitar} data-test="login-btn" type="submit">
              {Desabilitar === true ? 
              <ThreeDots color="#ffffff" height={60} width={60}/> : 'Entrar'}
            </Button>
          </form>
    
          <StyledLink data-test="signup-link" to="/cadastro">Não tem uma conta? Cadastre-se</StyledLink>
        </Container>
      )
}
