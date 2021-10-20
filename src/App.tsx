import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { UserInfo } from './pages/UserInfo';

function App() {
  return (
    
      <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/cadastro/info" component={UserInfo} />
        </Switch>
        </AuthContextProvider>
      </BrowserRouter>
      
  );
}

export default App;
