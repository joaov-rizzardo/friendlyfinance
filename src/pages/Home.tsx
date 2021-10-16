import '../style/Home.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'


export function Home() {

    const [infoAuth, setInfoAuth] = useState({
        'email': '',
        'senha': ''
    })
    async function handleLogin(event: FormEvent){
        event.preventDefault();
      
        console.log(infoAuth)
    }

    return (
        <div id="page-home">
            <MainAside />

            <main id="right-content">
                <img src={logo} alt="Logo frindly finance" />
                <h2>Não possuí uma conta? <Link to={'/cadastro'}>cadastre-se</Link></h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={event => {
                            setInfoAuth(prevState =>{
                                return {...prevState, 'email': event.target.value}
                            })
                        }}
                        value={infoAuth.email}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        onChange={event => {
                            setInfoAuth(prevState =>{
                                return {...prevState, 'senha': event.target.value}
                            })}}
                        value={infoAuth.senha}
                    />
                    <Button className="button-login" type="submit">Login</Button>
                </form>
                
                
            </main>
        </div>
)
    }

