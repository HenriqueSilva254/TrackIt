import axios from "axios"
import styled from "styled-components"
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom"
import { useState } from "react";
import NovoHabito from "../componentes/NovoHabito";
import Context from "../componentes/Context/contex";
import React, { useContext} from "react";



function Habitos(){
    const [CriarHabito, setCriarHabito] = useState("true")
    const {display, setDisplay} = useContext(Context)
    

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

        <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
        
        <Footer data-test="menu">
            <Menu>
                <Link data-test="habit-link" >Hábitos</Link>
                <Link data-test="history-link" >Histórico</Link>
            </Menu>
            <Hoje>
                <Link>
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
        if(display === "none"){
            setDisplay("flex")
        }
         
        
    }
   
    
}
export default Habitos




const Background = styled.div`
    min-height: 100vh;
    width: 100%;
    margin-top: 70px;
    background-color: #E5E5E5;
    h2{
        padding: 0px 18px 0px 18px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        width: 100%;
        height: 100px;
    
    }
`

const MeusHabitos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 18px 0px 18px;
    margin-top: 70px;
    width: 100%;
    height: 100px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    div{
        width: 40px;
        height: 40px;
        background: #52B6FF;
        border-radius: 4.63636px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`
const Topo = styled.div`
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    top: 0px;
    padding-left: 18px;
    padding-right: 18px;
    margin-bottom: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    

    h1{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        left: 306px;
        top: 9px;
        border-radius: 98.5px;
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
const Menu = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    
    padding-left: 18px;
    padding-right: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }

`
