import loadGif from '../../assets/gifs/load.gif'
import './styles.scss';
type LoadProps = {
    message : string;
}
export function Load({message}:LoadProps){
    return(
        <div id="load">
            <img src={loadGif} alt="Carregando" />
            <h4>{message}</h4>
        </div>
    )
}