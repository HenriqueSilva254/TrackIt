import axios from "axios"
import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Context from "../componentes/Context/contex";
import React, { useContext } from "react";
import Topo from "../componentes/Topo";
import Background from "../componentes/Background";
import Menu from "../componentes/Menu";
import dayjs from "dayjs";
import confirm from '../imagens/Vector.png'



function Hoje() {
    const { dados, setDados } = useContext(Context)
    const Dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const [menssagem, setMenssagem] = useState({texto:'Nenhum hábito concluído ainda'})
    const [Teste, setTeste] = useState([])
    const [porcentagem, setPorcentagem] = useState(0)
    // length = 4  (se cliquei em 2)  x por cento é = 50% 
    // 1/4 = 0,25 * 100 = 25 
    // 3/4 = 0,75 * 100 = 75 


    useEffect(() => {
        FazerGet()
	}, []);

    return (
        <Background>
            <Topo data-test="header">
                <h1>TrackIt </h1>
                <img src="https://pbs.twimg.com/media/Fhm7_FbWQAQShM0.jpg" alt="" />
            </Topo>

            <Day>{Dias[dayjs().day()]}, {dayjs().format('DD/MM')}</Day>
            <Alert>{menssagem.texto}</Alert>

            {Teste.map(props =>
                <Tarefas key={props.name}>
                    <div>
                        <h1>{props.name}</h1>
                        <p>Sequência atual: {props.currentSequence}</p>
                        <p>Seu recorde: {props.highestSequence}</p>
                    </div>
                    <Boxcheck color={props.done === false? '#EBEBEB':'#8FC549'} onClick={() => fazerChekin(props)} ><img src={confirm}/></Boxcheck>
                </Tarefas>
            )}

            <Footer data-test="menu">
                <Menu>
                    <Link to={"/Habitos"} data-test="habit-link" >Hábitos</Link>
                    <Link data-test="history-link" >Histórico</Link>
                </Menu>

                <Today>
                    <Link>
                        <CircularProgressbar
                            data-test="today-link"
                            value={0}
                            text='Hoje'
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#52B6FF",
                                textColor: "#FFFFFF",
                                pathColor: "white",
                                trailColor: "#52B6FF"

                            })}
                        />
                    </Link>
                </Today>
            </Footer>
        </Background>
    )

    function FazerGet(){
        const Url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const token = dados.token
        const config = {
            headers: {
                Authorization: token
            }
        }
        const promisse = axios.get(Url, config)

        promisse.then(resposta => {
            setTeste(resposta.data)
            console.log(resposta) 
            const contador = resposta.data
            let aumentar = porcentagem
            if(porcentagem === 0){
            for(let i= 0; i < contador.length; i++){
                if(contador[i].done === true){
                    aumentar = aumentar + 1
                    setPorcentagem(aumentar)
                }
            }
            
            }
            const calculo =  porcentagem / contador.length * 100
            const novaMenssagem = {...menssagem}
            novaMenssagem.texto = `${calculo}% dos hábitos concluídos`
            setMenssagem(novaMenssagem)
            
        })
        promisse.catch(erro => alert(erro.response.data.message))
    }
    

    // () => fazerChekin(props.data.done)
    function fazerChekin(props){
    console.log(dados.token)
    if(props.done === false){
        let aumentar = porcentagem
        aumentar = aumentar + 1
        setPorcentagem(aumentar)

        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`
        const body= {} 
        const config = {
            headers: {
                Authorization: dados.token
            }
        }
        const promise = axios.post(url, body, config)
        promise.then( resposta => {
        FazerGet()      
        });
        promise.catch( erro => alert(erro.response.data.message));
    }else{
        let aumentar = porcentagem
        aumentar = aumentar - 1
        setPorcentagem(aumentar)
        
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`
        const body= {} 
        const config = {
            headers: {
                Authorization: dados.token
            }
        }
        const promise = axios.post(url, body, config)
        promise.then( resposta => {
        FazerGet()      
        });
        promise.catch( erro => alert(erro.response.data.message));
    }
    
    
    }
}

export default Hoje
const Boxcheck = styled.div`
    position: absolute;
    right: 13px;
    width: 69px;
    height: 69px;
    background: ${props => props.color};
    border: 1px solid ${props => props.color};
    border-radius: 5px ;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
       width: 35.09px;
    }
`
const Tarefas = styled.div`
    position: relative;
    margin: 5px 18px 4px 18px;
    display: flex;
    padding: 13px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        padding-bottom: 7px;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
    div{

    }
`

const Alert = styled.p`
    margin-left: 18px;
    margin-bottom: 20px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #BABABA;

`


const Day = styled.h1`
    padding-top: 22px;
    margin-left: 18px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;

`

const Footer = styled.div`

`
const Today = styled.div`
    width: 91px;
    height: 91px;
    position: fixed;
    bottom: 6px;
    left: 40%;

`
