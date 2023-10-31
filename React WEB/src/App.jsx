import React from 'react';
import Home from './pages/home/home';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pag_principal from './pages/Logado/pag_prin';
import Teste from './pages/Teste/Teste';
import Activation from './pages/Activation';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logado" element={<Pag_principal />} />
        <Route path="/teste" element={<Teste />} />
        <Route path='/activate/:uid/:token' element={<Activation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;