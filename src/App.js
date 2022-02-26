import React, { useState, useEffect } from "react";
import "./App.css";
import Formulario from "./componentes/Formulario";
import Cita from "./componentes/Cita";

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //arreglo de citas

  const [citas, guardarCitas] = useState([citasIniciales]);

  //useefectt para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  //funcion que tome las citas actuales y agregue las nuevas
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //funcion para elimnar una cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };
  //mensaje condicional
  const titulo = citas.length === 0 ? "No hay Citas" : "administrando Citas";

  return (
    <div>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            1 <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={citas.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
