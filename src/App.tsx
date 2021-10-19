import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cadastro" component={Cadastro} />
        </Switch>
      </BrowserRouter>
      </AuthContextProvider>
  );
}

export default App;
