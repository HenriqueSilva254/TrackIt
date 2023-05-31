import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MarketPage from "./pages/MarketPage"
// import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import Login from './paginas/Login'
import Cadastro from "./paginas/Cadastro";
import Habitos from "./paginas/Habitos";
import Context from "./componentes/Context/contex";
import React from "react";

function App() {
  const [display, setDisplay] = useState('none');
  const [token, setToken] = useState('');

  return (
    <Context.Provider value={{display, setDisplay}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Habitos" element={<Habitos token={token} />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App

 