import { createContext, ReactNode, useEffect, useState } from "react";

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
type AuthContextType = {
  user?: User;
  signIn: (user: User) => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  function signIn(userInfo: User) {
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

    sessionStorage.setItem('user', id)

  }

  return (
    <AuthContext.Provider value={{user,signIn}}>
      {props.children}
    </AuthContext.Provider>
  );
}