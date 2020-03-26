import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './componentes/Join/Join'
import Chat from './componentes/Chat/Chat'

const App = () => (
    //cuando carga la pagina se muestra el formulario de ingreso
    //con esos datos se muestra el componente del chat
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />    
    </Router>
);

export default App;