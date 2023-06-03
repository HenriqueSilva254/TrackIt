import React, { useContext } from "react";
import { useState } from "react"
import styled from "styled-components"
import Input from "./Input"
import Button from "../componentes/button";
import Context from "./Context/contex";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListarTarefas from "./ListarTarefas";


export default function NovoHabito() {
    const [Dias, setDias] = useState([
        { dia: "D", cor: "white" },
        { dia: "S", cor: "white" },
        { dia: "T", cor: "white" },
        { dia: "Q", cor: "white" },
        { dia: "Q", cor: "white" },
        { dia: "S", cor: "white" },
        { dia: "S", cor: "white" }
    ])
    const [ArrayDias, setArrayDias] = useState([])
    const [name, setname] = useState('')
    const { dados, setDados } = useContext(Context)
    const navigate = useNavigate();
    

    return (
        <div>
            <HabitosCreat display={dados.display}>
                <Container>
                    <Input
                        type="text"
                        placeholder="nome do hábito"
                        required
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                    <ContainerDias>
                        {Dias.map((data, index) =>
                            <Divdias
                                key={index}
                                onClick={() => mudaCorDia(index)}
                                cores={data.cor}
                            >
                                {data.dia}
                            </Divdias>)}

                    </ContainerDias>

                    <Save>
                        <div onClick={desabiliatar}>Cancelar</div>
                        <Button onClick={DarPost}>Salvar</Button>
                    </Save>
                </Container>

            </HabitosCreat>
            <ListarTarefas />
            <h2>{dados.texto}</h2>
        </div>
    )
    function DarPost(e) {
        e.preventDefault();

        const Url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const token = dados.token
        const body = {
            name,
            days: ArrayDias
        }
        const config = {
            headers: {
                Authorization: token
            }
        }
        const promisse = axios.post(Url, body, config)

        promisse.then(resposta => {
            alert("Tarefa Salva cm sucesso")
            console.log(resposta)
            navigate('/Hoje')
            ListarTarefas()
        })
        promisse.catch(erro => alert(erro.response.data.message))
    }
    function desabiliatar() {
        if (dados.display !== "none") {
            const Arraydados = { ...dados }
            Arraydados.display = "none"
            setDados(Arraydados)

        }
    }

   


    function mudaCorDia(index) {
        const Novacor = [...Dias]
        let novoDia = 0
        if (Novacor[index].cor !== "#CFCFCF") {
            Novacor[index].cor = "#CFCFCF"
            setDias(Novacor)
            ArrayDias.push(index)

        } else {
            Novacor[index].cor = "white"
            setDias(Novacor)
            novoDia = ArrayDias.pop()
        }

    }

}
const HabitosCreat = styled.form`
    margin: 18px;
    display: ${props => props.display};
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 19px;
    
`
const ContainerDias = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
`
const Save = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    position: relative;
    div{
        position: absolute;
        left: 40%;
        bottom: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
    }
    button{
        position: absolute;
        right: 0px;
        bottom: -13px;
        width: 84px;
        height: 35px;
    }
`
const Divdias = styled.div`
    width: 30px;
    height: 30px;
    left: 240px;
    top: 218px;
    background: ${props => props.cores};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 2px;
    
    text-align: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.cores === "white" ? '#D5D5D5' : 'white'};
`