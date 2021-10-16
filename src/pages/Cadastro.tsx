import '../style/Home.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'
export function Cadastro() {

    const [infoSign, setInfoSign] = useState({
        'nome': '',
        'sobrenome': '',
        'email': '',
        'senha': '',
        'senhaConfirma': '',
        'dataNascimento': '',
        'terms': false
    })

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        console.log(infoSign)

        const configs = {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(infoSign)
        }

        fetch('http://localhost:8000/Controllers/AuthController.php', configs)
    }

    return (
        <div id="page-home">

            <MainAside />

            <main id="right-content">
                <img src={logo} alt="Logo frindly finance" />
                <h2>Já possuí a sua conta? <Link to={'/'}>fazer login</Link></h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={event => {
                            setInfoSign(prevState => {
                                return { ...prevState, 'nome': event.target.value }
                            })
                        }}
                        value={infoSign.nome}
                    />
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        onChange={event => {
                            setInfoSign(prevState => {
                                return { ...prevState, 'sobrenome': event.target.value }
                            })
                        }}
                        value={infoSign.sobrenome}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={event => {
                            setInfoSign(prevState => {
                                return { ...prevState, 'email': event.target.value }
                            })
                        }}
                        value={infoSign.email}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={event => {
                            setInfoSign(prevState => {
                                return { ...prevState, 'senha': event.target.value }
                            })
                        }}
                        value={infoSign.senha}
                    />
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        onChange={event => {
                            setInfoSign(prevState => {
                                return { ...prevState, 'senhaConfirma': event.target.value }
                            })
                        }}
                        value={infoSign.senhaConfirma}
                    />
                    <div id="div-date">
                        <label htmlFor="date">Data de nascimento:</label>
                        <input
                            type="date"
                            name="date"
                            onChange={event => {
                                setInfoSign(prevState => {
                                    return { ...prevState, 'dataNascimento': event.target.value }
                                })
                            }}
                            value={infoSign.dataNascimento}
                        />
                    </div>
                    <div id="div-checkbox">
                        <input
                            type="checkbox"
                            name="checkTerms"
                            onChange={event => {
                                setInfoSign(prevState => {
                                    return { ...prevState, 'terms': event.target.checked }
                                })
                            }}

                        />
                        <label htmlFor="checkTerms">Eu li e concordo com os <a href="#">termos de uso</a>  </label>
                    </div>

                    <Button className="button-login" placeholder="Data de nascimento" type="submit">Login</Button>
                </form>


            </main>
        </div>

    )
}