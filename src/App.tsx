import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/cadastro" component={Cadastro}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
