import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import './components.css';
import culiacan from './images/cul.svg'
import guasave from './images/gsv.svg'

import { Button } from 'react-bootstrap';

const socket = io('http://localhost:3000');

function App() {
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nuevoMensaje2, setNuevoMensaje2] = useState('');
  const [score1, setScore1] = useState("0");
  const [score2, setScore2] = useState("0");

  useEffect(() => {
    socket.on('1', setScore1);
    socket.on('2', setScore2);

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }

  }, []);

  const visitaDecrement = () => {
    socket.emit('1', nuevoMensaje);
  }

  const localDecrement = () => {
    socket.emit('2', nuevoMensaje2);
  }
  return (
    <>

    <div className="container">
    <div className='visita'>

          <div className="App local-decrement">
          <div class="square">
            <img className="imglocal" src={culiacan} />
          </div>
         
            <ul>
              {/* {mensajes.map(mensaje => (
              
                <label> {mensaje.mensaje}</label>
              ))} */}{score1}
            </ul>
            <input
              type="text"
              onChange={ e => setNuevoMensaje(e.target.value)}
            />
            <Button  className="btn" onClick={visitaDecrement}>visita</Button>
            </div>       

          </div>  
      <h3>VS</h3>

      <div className='local'>

          <div className="App local-decrement">
          <div class="square">
            <img className="imglocal" src={guasave} />
          </div>
        
          <ul>
            {/* {mensajes.map(mensaje => (
              <label> {mensaje.mensaje2}</label>
            ))} */}
            {score2}
          </ul>
          <input
            type="text"
            onChange={e => setNuevoMensaje2(e.target.value)}
          />
          <Button className="btn" onClick={localDecrement}>local</Button>
        </div>       
      
      </div>
   </div>
  </>

  );
}

export default App;