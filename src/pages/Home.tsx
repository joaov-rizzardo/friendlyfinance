import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/logo.png';
import userImg from '../assets/images/userImage.png'
import { Button } from '../components/Button';
import '../style/home.scss'
export function Home() {
    return (
        <div id="page-content">
            <nav>
                <button><FontAwesomeIcon icon={faBars} /></button>
                <img src={logo} alt="Frindly Finance" />
                <div>
                    <img src={userImg} alt="Imagem do usuário" />
                    <h4>Usuario</h4>
                </div>
            </nav>
            <hr />
            <main>
                <div id="info">
                    <div className="valores valores-margin">
                        <div>
                            <h1>R$ 867,00</h1>
                            <h4>Gastos do mês</h4>
                        </div>
                    </div>

                    <div className="valores">
                        <div>
                            <h1>R$ 1500,00</h1>
                            <h4>Dinheiro total restante</h4>
                        </div>
                    </div>

                    <div className="valores valores-margin">
                        <div>
                            <h1>R$ 550,00</h1>
                            <h4>Restante do salário</h4>
                        </div>
                    </div>
                </div>
                <h1 id="dias-pagamento">Faltam 22 dias para o pagamento</h1>
                <Button>Receber pagamento</Button>

            </main>
        </div>
    )
}