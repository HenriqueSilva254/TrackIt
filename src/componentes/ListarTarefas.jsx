import axios from "axios"
import { useContext, useState } from "react"
import styled from "styled-components"
import Context from "./Context/contex"
import Lixeira from "../imagens/Group.png"


 //Dar GET nas Tarefas 

 function ListarTarefas() {
    
    const [Dias, setDias] = useState([
        { dia: "D", cor: "white" },
        { dia: "S", cor: "white" },
        { dia: "T", cor: "white" },
        { dia: "Q", cor: "white" },
        { dia: "Q", cor: "white" },
        { dia: "S", cor: "white" },
        { dia: "S", cor: "white" }
    ])
    const [Tarefas, setTarefas] = useState(<div></div>)
    const { dados, setDados } = useContext(Context)
    const Url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    const token = dados.token
    const config = {
        headers: {
            Authorization: token
        }
    }

    const promisse = axios.get(Url, config)

    promisse.then(resposta => {
        const list = resposta.data
        
        const Txt = {...dados}
        Txt.texto = ''
        setDados(Txt)

        setTarefas(list.map(props => 
            <HabitosCreat>
                
                <Container data-test="habit-container">
                    <Nometarefa>
                        <h1 data-test="habit-name">{props.name}</h1>
                        <img data-test="habit-delete-btn" onClick={() =>  ExcluirTarefa(props.id)} src={Lixeira}/>
                    </Nometarefa>
                    <ContainerDias>
                        {Dias.map((data, index) =>
                            <Divdias 
                                data-test="habit-day"
                                key={index}
                                cores={index === props.days[0]?'#CFCFCF': 
                                index === props.days[1]? '#CFCFCF': 
                                index === props.days[2]? '#CFCFCF':
                                index === props.days[3]? '#CFCFCF':
                                index === props.days[4]? '#CFCFCF':
                                index === props.days[5]? '#CFCFCF':
                                index === props.days[6]? '#CFCFCF':'white'
                            }
                            >
                                {data.dia}
                            </Divdias>)}

                    </ContainerDias>
                </Container>

            </HabitosCreat>
            ))
    })
    promisse.catch(erro => alert(erro.response.data.message))

    return(
        <div>{Tarefas}</div>
    )
    function ExcluirTarefa(id){
        
        
        const Url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
        const config = {
            headers: {
                Authorization: dados.token
            }
        }
        const promisse = axios.delete(Url, config)

        promisse.then(resposta => {
            alert("Tarefa excluida cm sucesso")
            ListarTarefas()
        })
        promisse.catch(erro => alert(erro.response.data.message))

    }
}
export default ListarTarefas

const HabitosCreat = styled.div`
    margin: 18px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 18px 18px 18px;
    
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        text-align: start;
        padding-bottom: 10px;
    }
    img{
            height: 15px;
            width: 13px;
        }
    
`
const ContainerDias = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
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
const Nometarefa = styled.div`    
        display: flex;
        justify-content: space-between;
`