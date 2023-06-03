import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MarketPage from "./pages/MarketPage"
// import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import Login from './paginas/Login'
import Cadastro from "./paginas/Cadastro";
import Habitos from "./paginas/Habitos";
import Context from "./componentes/Context/contex";
import React from "react";
import Hoje from "./paginas/Hoje";




function App() {
  const [dados, setDados] = useState({token:'', display:'none', texto:'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!'});
  const [token, setToken] = useState('');

  return (
    <Context.Provider value={{dados, setDados}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Hoje" element={<Hoje/>} />
          <Route path="/Habitos" element={<Habitos/>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App

 