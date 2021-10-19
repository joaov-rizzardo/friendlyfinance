import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
    id: string;
    nome: string;
  }
  type AuthContextType = {
    user: User | undefined;
    signIn: (user: User) => void
  }

  type AuthContextProviderProps = {
      children: ReactNode
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();

  useEffect(()=>{
   
  },[])


  async function signIn(user:User){
    console.log(user)
  }
 
 
    return (
        <AuthContext.Provider value ={{user, signIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}