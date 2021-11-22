import { faBars, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/logo.png';
import { Button } from '../components/Button';
import '../style/home.scss'
export function Home() {
    return (
        <div id="page-content">
            <nav>
                <img src={logo} alt="Frindly Finance" />
                <button><FontAwesomeIcon icon={faBars} /></button>
            </nav>

            <hr />

            <main>
                
                <h1>Visão geral</h1>
                <section id="info">
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
                </section>
                <h1 id="dias-pagamento">Faltam 22 dias para o pagamento</h1>
                <Button id="btn-pag">Receber pagamento</Button>
                <h1>Despesas</h1>
                
                <section id="despesas">
                    <table>
                        <thead>
                            <th>Titulo</th>
                            <th className="table-descricao">Descrição</th>
                            <th>Parcela</th>
                            <th>Valor</th>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Carro</td>
                                <td className="table-descricao">Carro comprado</td>
                                <td>05/24</td>
                                <td>R$ 550,00</td>
                                <td className="table-buttons">
                                    <button><FontAwesomeIcon icon={faEye} /></button>
                                    <button><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>

                            <tr>
                                <td>Carro</td>
                                <td className="table-descricao">Carro comprado</td>
                                <td>05/24</td>
                                <td>R$ 550,00</td>
                                <td className="table-buttons">
                                    <button><FontAwesomeIcon icon={faEye} /></button>
                                    <button><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>

                            <tr>
                                <td>Carro</td>
                                <td className="table-descricao">Carro comprado</td>
                                <td>05/24</td>
                                <td>R$ 550,00</td>
                                <td className="table-buttons">
                                    <button><FontAwesomeIcon icon={faEye} /></button>
                                    <button><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
            </main>
        </div>
    )
}