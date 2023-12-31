import React from 'react';
import Home from './pages/home/home';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pag_principal from './pages/Logado/pag_prin';
import Activation from './pages/Activation';
import Reset_Password from './pages/Reset_password';
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logado" element={<Pag_principal />} />
        <Route path='/activate/:uid/:token' element={<Activation />} />
        <Route path='/password-reset/:uid/:token' element={<Reset_Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;