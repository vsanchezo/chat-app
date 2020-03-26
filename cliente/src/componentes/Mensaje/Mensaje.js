import React from 'react';

import './Mensaje.css';

import ReactEmoji from 'react-emoji';

//{ sala } viene dada dinamicamente desde chat
const Mensaje = ({ mensaje: { usuario, text }, nombre }) => {
    let enviadoPorUsuarioActual = false;

    const nombreEditado = nombre.trim().toLowerCase();

    if(usuario === nombreEditado){
        enviadoPorUsuarioActual = true;
    }

    return(
        enviadoPorUsuarioActual
        ?(
            <div className="messageContainer justifyEnd">
                <p className="sentText">{nombreEditado}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{usuario}</p>
            </div>
        )
    )
}

export default Mensaje;