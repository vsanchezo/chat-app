import React from 'react';

import './Input.css';

//{ sala } viene dada dinamicamente desde chat
const Input = ({ mensaje, setMensaje, enviarMensaje }) => (
    <form className="form">
        <input
        className="input"
        type="text"
        placeholder="Escribe un mensaje..."
        value={mensaje}
        onChange={(event) => setMensaje(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? enviarMensaje(event) : null}
         />
        <button className="sendButton" onClick={(event) => enviarMensaje(event)}>Enviar</button>
    </form>
)

export default Input;