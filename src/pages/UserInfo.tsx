import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../components/Button"
import { MainAside } from "../components/MainAside"
import { useAuth } from "../hooks/useAuth"
import '../style/Home.scss'

export function UserInfo() {
    const history = useHistory()
    const {user} = useAuth()
    const [userInfo, setUserInfo] = useState({
        salario: '',
        diaPagamento: ''
    })
    async function handleSetUserInfo(event: FormEvent) {
        event.preventDefault()
        const formUserInfo = Object.entries(userInfo)
        const dataConfigs = new FormData()
        formUserInfo.map(value => {
            dataConfigs.append(value[0], value[1])
        })

        dataConfigs.append('id', user!.id)
        const configs = {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: dataConfigs
        }

        fetch('http://localhost:8000/cadastro/info', configs)
        .then(response => {
            return response.json()
        })
        .then(status => {
            console.log(status)
        })

    }
    return (
        <div id="page-home">
            <MainAside />

            <main id="right-content">
                <div id="userInfo">
                    <FontAwesomeIcon icon={faCheck} className="checkIcon" size="6x" />
                    <h2>Estamos quase lá, precisamos de mais algumas informações para concluir o cadastro</h2>
                    <form onSubmit={handleSetUserInfo}>
                        <input
                            type="number"
                            placeholder="Nos informe o seu salário"
                            onChange={event => {
                                setUserInfo(prevState => {
                                    return { ...prevState, salario: event.target.value }
                                })
                            }}
                            value={userInfo.salario}
                        />

                        <input
                            type="number"
                            max="31"
                            min="1"
                            placeholder="Informe o dia de pagamento"
                            onChange={event => {
                                setUserInfo(prevState => {
                                    return { ...prevState, diaPagamento: event.target.value }
                                })
                            }}
                            value={userInfo.diaPagamento}
                        />
                        <Button type="submit">Continuar <FontAwesomeIcon icon={faChevronRight} /></Button>
                    </form>
                </div>

            </main>
        </div>
    )
}