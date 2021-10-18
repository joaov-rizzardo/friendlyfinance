import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import { Button } from '../Button'
import { useState } from 'react'
import { FormEvent } from 'react-router/node_modules/@types/react'

export function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        salario : '',
        diaPagamento : ''
    })
    async function handleSetUserInfo(event:FormEvent){
        event.preventDefault()
        const formUserInfo = Object.entries(userInfo)
        const dataConfigs = new FormData()
        formUserInfo.map(value => {
            dataConfigs.append(value[0], value[1])
        })

        const configs = {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: dataConfigs
        }

    }

    return (
        <div id="userInfo">
            <FontAwesomeIcon icon={faCheck} className="checkIcon" size="6x" />
            <h2>Estamos quase lá, precisamos de mais algumas informações para concluir o cadastro</h2>
            <form onSubmit={handleSetUserInfo}>
                <input 
                    type="number" 
                    placeholder="Nos informe o seu salário"
                    onChange={event => {
                        setUserInfo(prevState => {
                            return {...prevState, salario: event.target.value}
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
                            return {...prevState, diaPagamento: event.target.value}
                        })
                    }}
                    value={userInfo.diaPagamento}
                />
                <Button type="submit">Continuar <FontAwesomeIcon icon={faChevronRight}/></Button>
            </form>
        </div>
    )
}