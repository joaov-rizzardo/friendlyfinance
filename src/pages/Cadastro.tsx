import '../style/Home.scss'
import logo from '../assets/images/logo.png'
import { Button } from '../components/Button/index'
import financa from '../assets/images/financa.png'
import { Link } from 'react-router-dom'
import { MainAside } from '../components/MainAside'
export function Cadastro() {
    return (
        <div id="page-home">

            <MainAside />

            <main id="right-content">
                <img src={logo} alt="Logo frindly finance" />
                <h2>Já possuí a sua conta? <Link to={'/'}>fazer login</Link></h2>
                <form action="">
                    <input type="text" placeholder="Nome" />
                    <input type="text" placeholder="Sobrenome" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <input type="password" placeholder="Confirme a senha" />
                    <div id="div-date">
                        <label htmlFor="date">Data de nascimento:</label>
                        <input type="date" name="date" />
                    </div>
                    <div id="div-checkbox">
                        <input type="checkbox" name="checkTerms" />
                        <label htmlFor="checkTerms">Eu li e concordo com os <a href="#">termos de uso</a>  </label>
                    </div>

                    <Button className="button-login" placeholder="Data de nascimento" type="submit">Login</Button>
                </form>


            </main>
        </div>

    )
}