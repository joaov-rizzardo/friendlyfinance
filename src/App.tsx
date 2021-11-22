import { BrowserRouter, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { UserInfo } from './pages/UserInfo';
import './style/global.scss'
function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/cadastro/info" component={UserInfo} />
          {sessionStorage.user ? (
          <Route path="/" exact component={Home} />
          ) : (
            <Redirect to={{pathname : '/login'}}/>
          )}
        </Switch>
      </BrowserRouter>
      </AuthContextProvider>
      
  );
}

export default App;
