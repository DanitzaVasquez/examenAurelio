import React, { useState } from "react";

const PlatillosList = ({ platillos, setListUpdated }) => {
  const [filter, setFilter] = useState({
    nombre_platillo: "",
    ingredientes: "",
    precio: "",
    tiempo_preparacion: "",
    disponibilidad: "",
  });

  const [updatingPlatillo, setUpdatingPlatillo] = useState({});

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredPlatillos = platillos.filter((platillo) => {
    return (
      platillo.nombre_platillo.toLowerCase().includes(filter.nombre_platillo.toLowerCase()) &&
      platillo.ingredientes.toLowerCase().includes(filter.ingredientes.toLowerCase()) &&
      platillo.precio.toString().includes(filter.precio) &&
      platillo.tiempo_preparacion.toString().includes(filter.tiempo_preparacion) &&
      platillo.disponibilidad.toLowerCase().includes(filter.disponibilidad.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    const requestInit = {
      method: "DELETE",
    };
    fetch(`http://localhost:9000/api/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        setListUpdated(true);
      })
      .catch((error) => console.error('Error deleting:', error));
  };

  const handleUpdate = (id) => {
    const platilloToUpdate = platillos.find((platillo) => platillo.idplatillos === id);

    if (!platilloToUpdate) {
      console.error("Could not find platillo to update");
      return;
    }

    setUpdatingPlatillo(platilloToUpdate);
  };

  const handleUpdateSubmit = () => {
    const { idplatillos, ...rest } = updatingPlatillo;

    const requestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    };

    fetch(`http://localhost:9000/api/${updatingPlatillo.idplatillos}`, requestInit)
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        setUpdatingPlatillo({});
        setListUpdated(true);
      })
      .catch((error) => console.error('Error updating:', error));
  };

  return (
    <div>
      <div>
        <label>Filtrar por Nombre Platillo:</label>
        <input type="text" name="nombre_platillo" value={filter.nombre_platillo} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Filtrar por Precio:</label>
        <input type="text" name="precio" value={filter.precio} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Filtrar por Disponibilidad:</label>
        <input type="text" name="disponibilidad" value={filter.disponibilidad} onChange={handleFilterChange} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Platillo</th>
            <th>Ingredientes</th>
            <th>Precio</th>
            <th>Tiempo de Preparación</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlatillos.map((platillo) => (
            <tr key={platillo.idplatillos}>
              <td>{platillo.idplatillos}</td>
              <td>{platillo.nombre_platillo}</td>
              <td>{platillo.ingredientes}</td>
              <td>{platillo.precio}</td>
              <td>{platillo.tiempo_preparacion}</td>
              <td>{platillo.disponibilidad}</td>
              <td>
                <div className="mb-3">
                  <button onClick={() => handleDelete(platillo.idplatillos)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
                <div className="mb-3">
                  <button onClick={() => handleUpdate(platillo.idplatillos)} className="btn btn-dark">
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updatingPlatillo.idplatillos && (
        <div>
          <h2>Actualizar Platillo</h2>
          <div>
            <label>Nombre Platillo:</label>
            <input
              type="text"
              name="nombre_platillo"
              value={updatingPlatillo.nombre_platillo}
              onChange={(e) => setUpdatingPlatillo({ ...updatingPlatillo, nombre_platillo: e.target.value })}
            />
          </div>
          <div>
            <label>Ingredientes:</label>
            <input
              type="text"
              name="ingredientes"
              value={updatingPlatillo.ingredientes}
              onChange={(e) => setUpdatingPlatillo({ ...updatingPlatillo, ingredientes: e.target.value })}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="text"
              name="precio"
              value={updatingPlatillo.precio}
              onChange={(e) => setUpdatingPlatillo({ ...updatingPlatillo, precio: e.target.value })}
            />
          </div>
          <div>
            <label>Tiempo de Preparación:</label>
            <input
              type="text"
              name="tiempo_preparacion"
              value={updatingPlatillo.tiempo_preparacion}
              onChange={(e) => setUpdatingPlatillo({ ...updatingPlatillo, tiempo_preparacion: e.target.value })}
            />
          </div>
          <div>
            <label>Disponibilidad:</label>
            <input
              type="text"
              name="disponibilidad"
              value={updatingPlatillo.disponibilidad}
              onChange={(e) => setUpdatingPlatillo({ ...updatingPlatillo, disponibilidad: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateSubmit} className="btn btn-primary">
            Actualizar Platillo
          </button>
        </div>
      )}
    </div>
  );
};

export default PlatillosList;
