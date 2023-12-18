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
    const [tarefas, settarefas] = useState([])
    const [porcentagem, setPorcentagem] = useState(0)


    useEffect(() => {
        FazerGet()
	}, []);

    return (
        <Background>
            <Topo data-test="header">
                <h1>TrackIt </h1>
                <img data-test="avatar" src={dados.image} alt="" />
            </Topo>

            <Day data-test="today">{Dias[dayjs().day()]}, {dayjs().format('DD/MM')}</Day>
            <Alert data-test="today-counter" color={porcentagem === 0?  '#BABABA':'#8FC549'}>
            {porcentagem === 0? 'Nenhum hábito concluído ainda' : `${(porcentagem/tarefas.length * 100).toFixed(0)}% dos hábitos concluídos`} 
            </Alert>

            {tarefas.map(props =>
                <Tarefas data-test="today-habit-container" key={props.name}>
                    <div>
                        <h1 data-test="today-habit-name">{props.name}</h1>
                        
                        <Sequencia data-test="today-habit-sequence" color={props.done === false? '#666666':'#8FC549'}>
                        Sequência atual: <p> {props.currentSequence} dias</p> 
                        </Sequencia>

                        <Recorde data-test="today-habit-record" color={props.done === false? '#666666' : props.highestSequence > props.currentSequence? '#666666':'#8FC549'}>
                            Seu recorde: <p>{props.highestSequence} dias</p>
                        </Recorde>
                    </div>
                    <Boxcheck data-test="today-habit-check-btn" color={props.done === false? '#EBEBEB':'#8FC549'} onClick={() => fazerChekin(props)} ><img src={confirm}/></Boxcheck>
                </Tarefas>
            )}

            <Footer data-test="menu">
                <Menu>
                    <Link to={"/habitos"} data-test="habit-link" >Hábitos</Link>
                    <Link to={"/historico"} data-test="history-link" >Histórico</Link>
                </Menu>

                <Today>
                    <Link to={"/hoje"} data-test="today-link">
                        <CircularProgressbar
                            
                            value={porcentagem/tarefas.length * 100}
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
        
        const Url = import.meta.env.VITE_API_HABITS_TODAY
        const token = dados.token
        const config = {
            headers: {
                Authorization: token
            }
        }
        const promisse = axios.get(Url, config)

        promisse.then(resposta => {
            settarefas(resposta.data)
            const contador = resposta.data
            let aumentar = 0
            if(aumentar === 0){
            
            for(let i= 0; i < contador.length; i++){
                if(contador[i].done === true){
                    aumentar = aumentar + 1
                }
            }
            
            }
            setPorcentagem(aumentar)
            
            
        })
        promisse.catch(erro => alert(erro.response.data.message))
    }
    

    // () => fazerChekin(props.data.done)
    function fazerChekin(props){
    if(props.done === false){
        let aumentar = porcentagem
        aumentar = aumentar + 1
        setPorcentagem(aumentar)

        const url = `${import.meta.env.VITE_API_HABITS}/${props.id}/check`
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
        
        const url = `${import.meta.env.VITE_API_HABITS}/${props.id}/uncheck`
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

    color: ${props => props.color};

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
const Sequencia = styled.div`
display: flex;
align-items: center;

p{
    padding: 4px;
    color: ${props => props.color};
}
    
`

const Recorde = styled.div`
display: flex;
align-items: center;

p{
    padding: 4px;
    color: ${props => props.color};
}
   
`


