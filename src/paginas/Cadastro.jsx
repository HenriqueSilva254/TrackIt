import { useState } from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../componentes/Input";
import Button from "../componentes/button";
import Logo from "../componentes/Logo";
import Container from "../componentes/ContainerLogin";
import StyledLink from "../componentes/Links";
import imagemLogo from '../imagens/logo.svg'

function Cadastro(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

  function cadastrar(e){
    e.preventDefault();

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

    const novo = { email, name, image, password};

    const promise = axios.post(URL, novo);

    promise.then( resposta => {
      alert('Você foi cadastrado com sucesso!');
      // navegar para pagina de login
      navigate('/');
    });

    promise.catch( erro => alert(erro.response.data.message));

  }

    return (
        <Container>
        <Logo>
            <img src={imagemLogo}/>
        </Logo>
      
      <form onSubmit={cadastrar}>
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
        <Input
          data-test="user-name-input"
          type="text"
          placeholder="Nome"
          required
          value={name}
          onChange={ (e) => setName(e.target.value)}
        />
        <Input
          data-test="user-image-input"
          type="url"
          placeholder="Imagem"
          required
          value={image}
          onChange={ (e) => setImage(e.target.value)}
        />
        <Button data-test="login-btn" type="submit">Entrar</Button>
      </form>

      <StyledLink data-test="login-link" to="/">Já possui uma conta? Faça login</StyledLink>
    </Container>
    )
}

export default Cadastro