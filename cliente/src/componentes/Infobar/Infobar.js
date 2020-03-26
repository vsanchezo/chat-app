import React from 'react';

//importar iconos
import closeIcon from '../../iconos/closeIcon.png';
import onlineIcon from '../../iconos/onlineIcon.png';

import './Infobar.css';

//{ sala } viene dada dinamicamente desde chat
const Infobar = ({ sala }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="imagen en linea" />
            <h3>{sala}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="imagen cerrar" /></a>
        </div>
    </div>
)

export default Infobar;