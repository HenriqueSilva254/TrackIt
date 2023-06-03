import axios from "axios"
import styled from "styled-components"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import NovoHabito from "../componentes/NovoHabito";
import Context from "../componentes/Context/contex";
import React, { useContext} from "react";
import Topo from "../componentes/Topo";
import Background from "../componentes/Background";
import MeusHabitos from "../componentes/meushabitos";
import Menu from "../componentes/Menu";


function Habitos(){
    const [CriarHabito, setCriarHabito] = useState("true")
    const {dados, setDados} = useContext(Context)

   

    return (
        <Background>
        <Topo data-test="header">
            <h1>TrackIt </h1>
            <img src="https://pbs.twimg.com/media/Fhm7_FbWQAQShM0.jpg" alt="" />
        </Topo>

        <MeusHabitos>
            <p>Meus hábitos</p>
            <div onClick={AdicionarHabitos} data-test="habit-create-btn">+</div>
        </MeusHabitos>

        <NovoHabito />
        
        <Footer data-test="menu">
            <Menu>
                <Link data-test="habit-link" >Hábitos</Link>
                <Link data-test="history-link" >Histórico</Link>
            </Menu>
            <Hoje>
                <Link to="/Hoje">
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

    function AdicionarHabitos(){
        // const habito = <NovoHabito />
        // const novoArray = habito;
        if(dados.display === "none"){
            const Arraydados = {...dados}
            Arraydados.display = "flex"
            setDados(Arraydados)
        }
        
        
    }
   
    
}
export default Habitos







const Footer = styled.div`

`
const Hoje = styled.div`
    width: 91px;
    height: 91px;
    position: fixed;
    bottom: 6px;
    left: 40%;

`
