import React, { useState } from 'react';

const Form = ({ setListUpdated }) => {
  const [formPlatillo, setFormPlatillo] = useState({
    nombre_platillo: '',
    ingredientes: '',
    precio: '',
    tiempo_preparacion: '',
    disponibilidad: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'precio' || name === 'tiempo_preparacion') {
      setFormPlatillo((prevPlatillo) => ({
        ...prevPlatillo,
        [name]: value,
      }));
    } else {
      if (value.trim() === '') {
        alert('Este campo es obligatorio');
        return;
      }

      setFormPlatillo((prevPlatillo) => ({
        ...prevPlatillo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const { nombre_platillo, ingredientes, precio, tiempo_preparacion, disponibilidad } = formPlatillo;

    // Validación de los datos
    if (nombre_platillo === '' || ingredientes === '' || precio <= 0 || tiempo_preparacion.trim() === '' || disponibilidad === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Consulta
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPlatillo),
    };
    fetch('http://localhost:9000/api', requestInit) // Cambia la URL de la API según tu configuración
      .then((res) => res.text())
      .then((res) => console.log(res));

    // Reiniciando el estado de platillos
    setFormPlatillo({
      nombre_platillo: '',
      ingredientes: '',
      precio: '',
      tiempo_preparacion: '',
      disponibilidad: '',
    });

    setListUpdated(true);
  };

  return (
    <div>
      {/* Formulario */}
      <form>
        <div className="mb-3">
          <label htmlFor="nombre_platillo" className="form-label">Nombre del Platillo</label>
          <input value={formPlatillo.nombre_platillo} name="nombre_platillo" onChange={handleChange} type="text" id="nombre_platillo" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="ingredientes" className="form-label">Ingredientes</label>
          <input value={formPlatillo.ingredientes} name="ingredientes" onChange={handleChange} type="text" id="ingredientes" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input value={formPlatillo.precio} name="precio" onChange={handleChange} type="number" id="precio" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="tiempo_preparacion" className="form-label">Tiempo de Preparación</label>
          <input value={formPlatillo.tiempo_preparacion} name="tiempo_preparacion" onChange={handleChange} type="text" id="tiempo_preparacion" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="disponibilidad" className="form-label">Disponibilidad</label>
          <input value={formPlatillo.disponibilidad} name="disponibilidad" onChange={handleChange} type="text" id="disponibilidad" className="form-control" />
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Form;
