import React from 'react';

import scrollToBottom from 'react-scroll-to-bottom';

import Mensaje from '../Mensaje/Mensaje';

import './Mensajes.css';

//{ sala } viene dada dinamicamente desde chat
const Mensajes = ({ mensajes, nombre }) => (
    <scrollToBottom className="messages">
        {mensajes.map((mensaje, i) => <div key={i}><Mensaje mensaje={mensaje} nombre={nombre} /></div>)}
    </scrollToBottom>
)

export default Mensajes;