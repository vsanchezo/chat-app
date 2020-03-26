import React, {useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Mensajes from '../Mensajes/Mensajes';

let socket;

const Chat = ({ location }) => {
    //copiados de join
    const [nombre, setNombre] = useState('');
    const [sala, setSala] = useState('');
    //para los mensajes
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);

    const ENDPOINT = 'https://chat-aplicacion.herokuapp.com/';

    //hook
    useEffect(() => {
        //extraer los datos que el usuario ha ingresado cuando se unio a una sala
        //const data = queryString.parse(location.search);
        //console.log(location.data);
        //console.log(data);

        //se puede separar los datos de data (lo de arriba se puede eliminar, pero se deja como referencia de aplicacion)
        const { nombre, sala } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setNombre(nombre);
        setSala(sala);

        //el 3er parametro es para manejar la respuesta callback del backend
        /*socket.emit('join', { nombre, sala }, ({ error }) => {
            alert(error);
        });*/
        socket.emit('join', { nombre, sala }, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);    //solo si endpoint  y location.search cambian se llama a useEffect

    //para el manejo de mensajes
    useEffect(() => {
        socket.on('message', mensaje => {   //con socket.on uno "escucha" los mensajes; (mensaje) es el mensaje de bienvenida del backend
            setMensajes(mensajes => [...mensajes, mensaje]);   //agrega los mensajes de admin al arreglo de mensajes
        })
    }, []);    //si le pongo [mensajes] duplica los mensajes mostrados

    //funcion para mandar mensajes
    const enviarMensaje = (event) => {
        event.preventDefault();

        if(mensaje){
            //el evento 'enviarMensaje' es el mismo nombre que en el backend
            socket.emit('enviarMensaje', mensaje, () => setMensaje(''));
        }
    }

    console.log(mensaje, mensajes);

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar sala={sala} />
                <Mensajes mensajes={mensajes} nombre={nombre} />
                <Input mensaje={mensaje} setMensaje={setMensaje} enviarMensaje={enviarMensaje} />
            </div>
        </div>
    )
}

export default Chat;