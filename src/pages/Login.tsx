import '../style/login-cadastro.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link, useHistory } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Load } from '../components/Load'

export function Login() {
    //estado utilizado para armazenar as informações de login
    const [infoAuth, setInfoAuth] = useState({
        'email': '',
        'senha': ''
    })
    const history = useHistory()

    //recuperando função de signIn do hook useAuth
    const { signIn } = useAuth()

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        //convertendo o objeto com os dados de login em array
        let formInfoSignIn = Object.entries(infoAuth)

        //instanciando um objeto do tipo FormData
        const dataConfigs = new FormData();

        //percorre o array de dado de cadastro e preenche o objeto FormData com seus valores
        formInfoSignIn.forEach(data => {
            dataConfigs.append(data[0], data[1])
        })

        //configurações que serão utilizadas para a requisição posteriormente
        const configs = {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: dataConfigs
        }

        //exibe a tela de load em quanto aguarda o termino da requisição
        document.getElementById('form-content')!.style.display = 'none'
        document.getElementById('load')!.style.display = 'flex'

        fetch('http://localhost:8000/login', configs)
            .then(response => {
                return response.json()
            })
            .then(data => {
                document.getElementById('form-content')!.style.display = 'flex'
                document.getElementById('load')!.style.display = 'none'
                console.log(data)
                //verifica o retorno da api, se false, exibe uma mensagem de erro na tela, se true, prossegue com o login
                if (data.status === false) {
                    const erroMessage = document.getElementById('erroMessage')
                    erroMessage!.innerHTML = 'Email e/ou senha inválidos'
                    erroMessage!.style.display = 'block'

                } else if (data.status === true) {
                    signIn(data.user)

                    //rediriciona para a página principal após efetuar o login
                    history.push('/')
                }
            })
    }

    return (
        <div id="page-home">
            <MainAside />

            <main id="right-content">
                <Load message={'Aguarde, estamos verificando as suas credenciais...'} />
                <div id="form-content">
                    <img src={logo} alt="Logo frindly finance" />
                    <h2>Não possuí uma conta? <Link to={'/cadastro'}>cadastre-se</Link></h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={event => {
                                setInfoAuth(prevState => {
                                    return { ...prevState, 'email': event.target.value }
                                })
                            }}
                            value={infoAuth.email}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={event => {
                                setInfoAuth(prevState => {
                                    return { ...prevState, 'senha': event.target.value }
                                })
                            }}
                            value={infoAuth.senha}
                        />
                        <Button className="button-login" type="submit">Login</Button>
                        <p id="erroMessage"></p>
                    </form>

                </div>


            </main>
        </div>
    )
}

