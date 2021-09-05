import React,{useState,useContext,useEffect} from 'react'
import {Link } from "react-router-dom";
import { UserContext } from './UserContext';
import PopupMenu from './Components/PopupMenu';
import AddTime from './AddTime';

function CategoryExtensions({list,gameUrl}) {

    const username = useContext(UserContext);
    const [showPopup,setShowPopup] = useState(false);

    /* passed as prop to AddTime
       makes sure time gets submitted to the correct category extension*/ 
    const [addTimeFor,setAddTimeFor] = useState('')



    function togglePopup() {
        setShowPopup(!showPopup)
    }

    function addTimeClick(categoryExtension) {
        if (!showPopup) {
            setAddTimeFor(categoryExtension)
            togglePopup()

        }
    }

    const listOfCategoryExtensionsJSX = list.map((data,index) => {
        let categoryExtension = data.urlTitle
        return  <li key={index}>
                    {username != null &&
                        <button onClick={() => {addTimeClick(categoryExtension)}}>
                            + 
                        </button>
                    }

                    <Link to={`/Game/${gameUrl}/${categoryExtension}`}>
                        {data.title}
                    </Link>
                </li>
    })

    return (
        <>
        { showPopup === true && 
        <PopupMenu toggle={togglePopup}> 
            <div style={{'backgroundColor':'white',
                         'marginTop':'16px',
                         'padding':'12px',
                         'borderRadius':'4px',
                         'boxShadow':'box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)'}} onClick={(e) => {e.stopPropagation()}}>
                <AddTime gameUrl={gameUrl} categoryExtension={addTimeFor}/>
            </div>
        </PopupMenu> 
        }
        <div id="list-of-category-extensions">
            <ul>
            {listOfCategoryExtensionsJSX}
            </ul>
        </div>
        </>
    )
}

export default CategoryExtensions
