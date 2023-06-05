import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MarketPage from "./pages/MarketPage"
// import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import Login from './paginas/Login'
import Cadastro from "./paginas/Cadastro";
import Habitos from "./paginas/Habitos";
import Context from "./componentes/Context/contex";
import React from "react";
import Hoje from "./paginas/hoje";
import Display from "./componentes/Context/adicionar";




function App() {
  const [dados, setDados] = useState({token:'', disabled:false, image:'' , texto:'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!'});
  const [display, setDisplay] = useState('none');

  return (
    <Context.Provider value={{dados, setDados}}>
      <BrowserRouter>
      <Display.Provider value={{display, setDisplay}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje/>} />
          <Route path="/habitos" element={<Habitos/>} />
        </Routes>
      </Display.Provider>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App

 