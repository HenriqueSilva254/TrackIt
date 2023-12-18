import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../componentes/Input";
import Button from "../componentes/button";
import Logo from "../componentes/Logo";
import Container from "../componentes/ContainerLogin";
import StyledLink from "../componentes/Links";
import imagemLogo from '../imagens/logo.svg'
import { useContext } from "react";
import Context from "../componentes/Context/contex";
import { ThreeDots } from 'react-loader-spinner'

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [Desabilitar, setDesabilitar] = useState(false);


  const navigate = useNavigate();

  function cadastrar(e) {
    e.preventDefault();
    setDesabilitar(true)
    setTimeout(() => {
    const URL = import.meta.env.VITE_API_SIGNUP

    const body = { email, name, image, password };
    const promise = axios.post(URL, body);

    promise.then(resposta => {
      navigate('/');

    });

    promise.catch(erro => {
      alert(erro.response.data.message);
      setDesabilitar(false)
    })
    }, 3000)
   
  }

  return (
    <Container>
      <Logo>
        <img src={imagemLogo} />
      </Logo>

      <form onSubmit={cadastrar}>
        <Input
          disabled={Desabilitar}
          data-test="email-input"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          disabled={Desabilitar}
          data-test="password-input"
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          disabled={Desabilitar}
          data-test="user-name-input"
          type="text"
          placeholder="Nome"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          disabled={Desabilitar}
          data-test="user-image-input"
          type="url"
          placeholder="Imagem"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button disabled={Desabilitar} data-test="signup-btn" type="submit">
          {Desabilitar === true ? 
          <ThreeDots color="#ffffff" height={60} width={60}/> : 'Cadastrar'}
        </Button>
      </form>

      <StyledLink   disabled={Desabilitar} data-test="login-link" to="/">Já possui uma conta? Faça login</StyledLink>
    </Container>
  )
}

export default Cadastro