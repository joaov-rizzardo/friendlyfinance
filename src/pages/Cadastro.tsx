import '../style/Home.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'
import { Load } from '../components/Load'
import { UserInfo } from '../components/UserInfo'
import ReactDOM from 'react-dom'

export function Cadastro() {
    const [terms, setTerms] = useState(false)
    const [infoSign, setInfoSign] = useState({
        'nome': '',
        'sobrenome': '',
        'email': '',
        'senha': '',
        'senhaConfirma': '',
        'dataNascimento': ''
    })

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();
        let erroMessage = document.getElementById('erroMessage')
        if (terms === false) {
            erroMessage!.innerHTML = 'Você precisa aceitar os termos para se cadastrar.'
            erroMessage!.style.display = 'block'
        }

        else if (infoSign.nome === '' || infoSign.sobrenome === '' || infoSign.email === '' || infoSign.senha === '' || infoSign.senhaConfirma === '' || infoSign.dataNascimento === '') {
            erroMessage!.innerHTML = 'Todos os campos precisam ser preenchidos.'
            erroMessage!.style.display = 'block'
        }

        else if (infoSign.senha !== infoSign.senhaConfirma) {
            erroMessage!.innerHTML = 'As senhas digitadas não se coincidem.'
            erroMessage!.style.display = 'block'
        }

        else if (infoSign.senha.length < 8) {
            erroMessage!.innerHTML = 'As senha deve conter no minimo 8 caracteres'
            erroMessage!.style.display = 'block'
        }
        else {
            let formInfoSign = Object.entries(infoSign)
            const dataConfigs = new FormData();
            formInfoSign.map(data => {
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
            
            document.getElementById('form-content')!.style.display = 'none'
            document.getElementById('load')!.style.display = 'flex'

            fetch('http://localhost:8000/cadastro', configs)
                .then(response => {
                    return response.json()
                })
                .then(data => {

                    if (data.status === false) {
                        document.getElementById('load')!.style.display = 'none'
                        document.getElementById('form-content')!.style.display = 'flex'
                        erroMessage = document.getElementById('erroMessage')
                        erroMessage!.innerHTML = 'Esse email já foi cadastrado.'
                        erroMessage!.style.display = 'block'
                        console.log(erroMessage)
                    } else if (data.status === true) {
                        ReactDOM.render(<UserInfo />, document.getElementById('right-content'))
                    }

                })
        }


    }

    return (
        <div id="page-home">
            
            <MainAside />

            <main id="right-content">

                <Load message={'Aguarde, a sua conta está sendo criada...'} />
                
                <div id="form-content">
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
                                    setTerms(event.target.checked)
                                }}

                            />
                            <label htmlFor="checkTerms">Eu li e concordo com os <a href="#">termos de uso</a>  </label>
                        </div>

                        <Button className="button-cadastro" placeholder="Data de nascimento" type="submit">Cadastrar</Button>
                        <p id="erroMessage"></p>
                    </form>
                </div>



            </main>
        </div>

    )
}