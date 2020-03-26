import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//importar el css
import './Join.css'

const Join = () => {
    //para declarar un hook
    const [nombre, setNombre] = useState('');
    const [sala, setSala] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Ingresar</h1>
                <div><input placeholder="Nombre" className="joinInput" type="text" onChange={ (event) => setNombre(event.target.value) } /></div>
                <div><input placeholder="Sala" className="joinInput mt-20" type="text" onChange={ (event) => setSala(event.target.value) } /></div>
                <Link onClick={ event => (!nombre || !sala) ? event.preventDefault() : null } to={`/chat?nombre=${nombre}&sala=${sala}`}>
                    <button className="button mt-20" type="submit">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;