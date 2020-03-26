const express = require('express');
const router = express.Router();

router.get('/', (peticion, respuesta) => {
    respuesta.send('El servidor se está ejecutando...');
});

module.exports = router;