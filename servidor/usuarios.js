const usuarios = [];

const agregarUsuario = ({ id, nombre, sala }) => {
    nombre = nombre.trim().toLowerCase();
    sala = sala.trim().toLowerCase();

    //checar si hay un usuario con el mismo nombre en la sala
    const usuarioExistente = usuarios.find((usuario) => usuario.sala === sala && usuario.nombre === nombre);

    if(usuarioExistente){
        return { error: 'Nombre de usuario ya en uso' };    //(1)
    }

    //se crea el usuario
    const usuario = { id, nombre, sala };

    //se agrega a la lista de usuarios
    usuarios.push(usuario);

    return { usuario };
}

const removerUsuario = (id) => {
    const indice = usuarios.findIndex((usuario) => usuario.id === id);

    if(indice !== -1){
        return usuarios.splice(indice, 1)[0];
    }
}

const getUsuario = (id) => usuarios.find((usuario) => usuario.id === id);

const getUsuariosDeSala = (sala) => usuarios.filter((usuario) => usuario.sala === sala);

module.exports = { agregarUsuario, removerUsuario, getUsuario, getUsuariosDeSala };