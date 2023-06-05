import { Link } from "react-router-dom";
import Background from "../componentes/Background";
import Topo from "../componentes/Topo";
import styled from "styled-components";
import { useContext } from "react";
import Context from "../componentes/Context/contex";
import Menu from "../componentes/Menu";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Historico(){
const {dados, setDados} = useContext(Context)
    return (
        <Background>
             <Topo data-test="header">
                <h1>TrackIt </h1>
                <img data-test="avatar" src={dados.image} alt="" />
            </Topo>
            <Footer data-test="menu">
            <Titulo>
            Histórico
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>    
            </Titulo>
            <Menu>
                <Link to={"/habitos"} data-test="habit-link" >Hábitos</Link>
                <Link to={"/historico"} data-test="history-link" >Histórico</Link>
            </Menu>
            <Hoje>
                <Link to="/hoje" data-test="today-link">
                    <CircularProgressbar
                        data-test="today-link"
                        value={66}
                        text='Hoje'
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor:"#52B6FF",
                        textColor: "#FFFFFF",
                        pathColor: "white",
                        trailColor: "#52B6FF"
                        
                        })}
                    />
                </Link>
            </Hoje>
        </Footer>
        </Background>
    )
}
const Titulo = styled.div`

    color:#126BA5;
    padding-top: 22px;
    margin-left: 18px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    P{
    padding-top: 22px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    }
    
`
const Footer = styled.div`

`   
const Hoje = styled.div`
    width: 91px;
    height: 91px;
    position: fixed;
    bottom: 6px;
    left: 40%;

`
