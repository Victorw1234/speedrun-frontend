import React,{useContext,useEffect,useState} from 'react'
import { APIContext } from './APIContext'
import CategoryExtensionsList from './CategoryExtensionsList'
import TimesList from './TimesList'

const emptyGameInfo = {admins:[],categoryExtensions:[],title:"",urlTitle:""}

function Game({match,history}) {

    const API = useContext(APIContext)
    const [gameInfo,setGameInfo] = useState(null)

    async function fetchGameInfo() {
        let gameInfo = await fetch(`${API}/api/Game/ByString/${match.params.title}`)
        if (gameInfo.status >= 400 && gameInfo.status <=499) {
            return emptyGameInfo;
        }
        gameInfo = gameInfo.json();
        return gameInfo;
    }


    useEffect(() => {

        let gameInfo = fetchGameInfo();
        gameInfo.then((data) => {
            if (data == emptyGameInfo) {
                history.push("/404")
            }
            console.log(data)
            setGameInfo(data)
        })

    },[])



    return (
        <div>
            {gameInfo != null && gameInfo.title}



            {gameInfo != null && <CategoryExtensionsList list={gameInfo.categoryExtensions} 
                                                         gameUrl={match.params.title} />}

            selected category extension:{match.params.categoryExtension}
            
            {match.params.categoryExtension != undefined && <TimesList gameUrl={match.params.title}
                                                                       categoryExtensionUrl={match.params.categoryExtension}/>}

            </div>
    )
}

export default Game
