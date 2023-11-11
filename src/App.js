import React, { Fragment, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // Corrige la importación

import Navbar from './Components/Navbar';
import PlatillosList from './Components/PlatillosList';
import Form from './Components/Form';

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getPlatillos = () => {
      fetch('http://localhost:9000/api')
        .then((res) => res.json())
        .then((data) => setPlatillos(data))
        .catch((error) => console.error(error));
    };
    getPlatillos();
    setListUpdated(false);
  }, [listUpdated]);

  return (
    <Fragment>
      <Navbar brand='Platillos App' />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{ textAlign: 'center' }}>Lista Comida Rapida San Luis Rio Colorado</h2>
            <PlatillosList platillos={platillos} setPlatillos={setPlatillos} setListUpdated={setListUpdated} />
          </div>
          <div className="col-5">
            <h2 style={{ textAlign: 'center' }}>Agregar Un Nuevo Platillo</h2>
            <Form setPlatillos={setPlatillos} setListUpdated={setListUpdated} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(<App />);
