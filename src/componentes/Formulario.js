import React, {useState} from "react";
import {v4 as uuid} from "uuid";
uuid();

const Formulario = ({crearCita}) => {
  //crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  //mostrarele al usuario el error
  const [error, actualizarError] = useState(false);

  // funcion que se ejecuta cada que el usuario escribe en un imput
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //extraer los  valores
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  //cuando el usuaria presiona el boton de enviar
  const submitCita = (e) => {
    e.preventDefault();

    //validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas === ""
    ) {
      actualizarError(true);
      return;
    }
    //elimat el mensaje previo

    actualizarError(false);

    //asignar id
    cita.id = uuid();

    //crear cita

    crearCita(cita);

    //reinicar el from

    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <div>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error">Todos los Campos Son Obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label> Nombre Mascota</label>
        <input
          type="text"
          className="u-full-width"
          name="mascota"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label> Nombre del Dueño</label>
        <input
          type="text"
          className="u-full-width"
          name="propietario"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={actualizarState}
          value={hora}
        />

        <label> Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </div>
  );
};

export default Formulario;
