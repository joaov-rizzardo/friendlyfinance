import '../style/Home.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type LoginInfo = {
    email : string;
    senha : string;
}

export function Home() {

    const [infoAuth, setInfoAuth] = useState({
        'email': '',
        'senha': ''
    })

    const {signIn} = useAuth()

    async function handleLogin(event: FormEvent){
        event.preventDefault();
        
        let formInfoSignIn = Object.entries(infoAuth)
            const dataConfigs = new FormData();
            formInfoSignIn.map(data => {
                dataConfigs.append(data[0], data[1])
            })
            const configs = {
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: dataConfigs
            }

        fetch('http://localhost:8000/login', configs)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.status == false){
                const erroMessage = document.getElementById('erroMessage')
                erroMessage!.innerHTML = 'Email e/ou senha inválidos'
                erroMessage!.style.display = 'block'

            }else if(data.status == true){
                signIn(data.user)
            }
        })
        
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
                    <p id="erroMessage"></p>
                </form>
                
                
            </main>
        </div>
)
    }

