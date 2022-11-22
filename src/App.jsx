import './App.css';
import Movimientos from './Componentes/Movimientos';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Componentes/Navbar";
import Todos from './Componentes/Todos';


const baseUrl = "http://localhost:3001";

function App() {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    axios.get(baseUrl + "/movimientos").then((response) => {
      setMovimientos(response.data);
    });
  }, [movimientos]);

  return (
    <div class="container-xxl App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Navbar />
              <Movimientos movimientos={movimientos} baseUrl={baseUrl} />
              </>
            }
          />
          <Route
            path="/stock"
            element={
              <>
              <Navbar />
              <Todos baseUrl={baseUrl}/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
