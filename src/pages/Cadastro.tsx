import '../style/login-cadastro.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import { Link, useHistory} from 'react-router-dom'
import { MainAside } from '../components/MainAside'
import { FormEvent, useState } from 'react'
import { Load } from '../components/Load'
import { useAuth } from '../hooks/useAuth'

export function Cadastro() {
    const {signIn} = useAuth()
    const history = useHistory()

    //estado utilizado para verificar se o usuário aceitou os termos de uso
    const [terms, setTerms] = useState(false)

    //estado utilizado para armazenar um objeto contendo as informações referentes ao cadastro do usuário
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

        //testa se o usuário aceitou os termos de uso
        if (terms === false) {
            erroMessage!.innerHTML = 'Você precisa aceitar os termos para se cadastrar.'
            erroMessage!.style.display = 'block'
        }

        //testa se todos os campos foram preenchidos
        else if (infoSign.nome === '' || infoSign.sobrenome === '' || infoSign.email === '' || infoSign.senha === '' || infoSign.senhaConfirma === '' || infoSign.dataNascimento === '') {
            erroMessage!.innerHTML = 'Todos os campos precisam ser preenchidos.'
            erroMessage!.style.display = 'block'
        }

        //testa se as duas senhas digitadas são idênticas
        else if (infoSign.senha !== infoSign.senhaConfirma) {
            erroMessage!.innerHTML = 'As senhas digitadas não se coincidem.'
            erroMessage!.style.display = 'block'
        }

        //testa se a senha possuí no minimo 8 caracteres
        else if (infoSign.senha.length < 8) {
            erroMessage!.innerHTML = 'As senha deve conter no minimo 8 caracteres'
            erroMessage!.style.display = 'block'
        }
        else {
            //transforma o objeto que contem os dados de cadastro em um array
            let formInfoSign = Object.entries(infoSign)
            //instancia um objeto do tipo FormData para utilizar na requisição com o formato x-www-form-urlencoded
            const dataConfigs = new FormData();
            //percorre o array de dados do cadastro e preenche a constante dataConfigs
            formInfoSign.forEach(data => {
                dataConfigs.append(data[0], data[1])
            })

            //configurações para serem utilizadas na requisição
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

            //requisição para api enviando as informações de cadastro
            fetch('http://localhost:8000/cadastro', configs)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    //verifica o status da requisição, se false, exibe um erro na tela, se true, prossegue com o cadastro
                    if (data.status === false) {
                        document.getElementById('load')!.style.display = 'none'
                        document.getElementById('form-content')!.style.display = 'flex'
                        erroMessage = document.getElementById('erroMessage')
                        erroMessage!.innerHTML = 'Esse email já foi cadastrado.'
                        erroMessage!.style.display = 'block'
                        console.log(erroMessage)
                    } else if (data.status === true) {
                        signIn(data.user)
                        history.push('/cadastro/info')
                        
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
                    <h2>Já possuí a sua conta? <Link to={'/login'}>fazer login</Link></h2>
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
                            <label htmlFor="checkTerms">Eu li e concordo com os <a href="http://localhost:3000/">termos de uso</a>  </label>
                        </div>

                        <Button className="button-cadastro" placeholder="Data de nascimento" type="submit">Cadastrar</Button>
                        <p id="erroMessage"></p>
                    </form>
                </div>



            </main>
        </div>

    )
}


