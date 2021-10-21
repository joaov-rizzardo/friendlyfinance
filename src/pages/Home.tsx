import logo from '../assets/images/logo.png';
export function Home(){
    return(
        <div>
            <h1>Olá</h1>
            <nav>
                <img src={logo} alt="Frindly Finance" />
                <h4>Usuario</h4>
            </nav>
        </div>
    )
}