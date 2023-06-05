import { Link } from "react-router-dom";
import Background from "../componentes/Background";
import Topo from "../componentes/Topo";
import styled from "styled-components";
import { useContext } from "react";
import Context from "../componentes/Context/contex";

export default function Historico(){
const {dados, setDados} = useContext(Context)
    return (
        <Background>
             <Topo data-test="header">
                <h1>TrackIt </h1>
                <img src={dados.image} alt="" />
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
                <Link to="/hoje">
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
    width: 338px;
    height: 74px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
`