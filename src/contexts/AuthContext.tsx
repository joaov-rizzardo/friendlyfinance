import { createContext, ReactNode, useState } from "react";

//Type para as informações do usuário
type User = {
  isAutenticated: boolean;
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  salario: number | null;
  diaSalario: number | null;

}

//Type para o AuthContext
type AuthContextType = {
  user?: User;
  signIn: (user: User) => void
}

//Type para o children do AuthContext
type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  //estado que ira armazenar as informações referentes ao usuário
  const [user, setUser] = useState<User>();

  async function signIn(userInfo: User) {
    const { id, nome, sobrenome, email, senha, dataNascimento, salario, diaSalario } = userInfo
    
    setUser({
      isAutenticated: true,
      id: id,
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha,
      dataNascimento: dataNascimento,
      salario: salario,
      diaSalario: diaSalario
    })
  
    //seta os dados do usuário em localStorage
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <AuthContext.Provider value={{user,signIn}}>
      {props.children}
    </AuthContext.Provider>
  );
}