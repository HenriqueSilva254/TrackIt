import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MarketPage from "./pages/MarketPage"
// import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import Login from './paginas/Login'



function App() {

  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        {/* <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/market" element={<MarketPage token={token} />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

 