const express = require('express');    //en backend se utiliza require en vez de import
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

//se importan las funciones del archivo usuarios
const { agregarUsuario, removerUsuario, getUsuario, getUsuariosDeSala } = require('./usuarios');

//importar el router
const router = require('./router');

const PUERTO = process.env.PORT || 5000;

//echar a andar una instancia de socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

//se conecta el socket
io.on('connection', (socket) => {
    console.log('Tenemos una nueva conexion');

    //'join' es el mismo nombre que se le dio en el frontend
    //callback es una función que se ejecuta cuando se inicia join
    //se puede accesar desde el frontend con un tercer parametro en socket.emit
    /*
    socket.on('join', ({ nombre, sala }, callback) => {
        console.log(nombre, sala);

        const error = true;

        if(error){
            callback({error: 'Error D:'})
        }
    });*/

    socket.on('join', ({ nombre, sala }, callback) => {
        const { error, usuario } = agregarUsuario({ id: socket.id, nombre, sala });

        if(error) return callback(error);    //muestra el mensaje de error especificado en usuarios (1)

        //mesnajes generados por admin se nombra al evento 'message'
        //mensaje de bienvenida al usuario
        socket.emit('message', { usuario: 'admin', text: `${usuario.nombre}, bienvenido a la sala ${usuario.sala}`});

        //informar a los demás usuarios que 'usuario' se ha unido
        socket.broadcast.to(usuario.sala).emit('message', { usuario: 'admin', text: `${usuario.nombre} se ha unido!`});

        socket.join(usuario.sala);

        io.to(usuario.sala).emit('datosSala', { sala: usuario.sala, usuarios: getUsuariosDeSala(usuario.sala)});

        callback();
    });

    /*anteriormente message era generado en el backend pero los mensajes que manda el usuario
    se mandan desde el frontend
    se nombre 'enviarMensaje' al evento
    */
    socket.on('enviarMensaje', (mensaje, callback) => {    //mensaje viene del frontend
        const usuario = getUsuario(socket.id);

        io.to(usuario.sala).emit('message', { usuario: usuario.nombre, text: mensaje});
        io.to(usuario.sala).emit('datosSala', { sala: usuario.sala, usuarios: getUsuariosDeSala(usuario.sala)});

        callback();
    });

    //se desconecta
    socket.on('disconnect', () => {
        console.log('El usuario ha salido :(');
        const usuario = removerUsuario(socket.id);

        if(usuario){
            io.to(usuario.sala).emit('message', { user: 'admin', text: `${usuario.nombre} ha salido`});
        }
    });
});

app.use(router);

//inicializar el puerto
server.listen(PUERTO, () => console.log(`El servidor se ha iniciado en el puerto ${PUERTO}`));