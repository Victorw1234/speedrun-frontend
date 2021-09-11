import React,{useState,useContext,useEffect} from 'react'
import {Link } from "react-router-dom";
import { UserContext } from './UserContext';
import PopupMenu from './Components/PopupMenu';
import AddTime from './AddTime';

function CategoryExtensions({list,gameUrl}) {

    const username = useContext(UserContext);
    const [showPopup,setShowPopup] = useState(false);
    {/*const [test,setTest] = useState([{urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
    {urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},
{urlTitle:'asdfasdfasdf',title:'avzxcvzxcv'},])*/}

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
        
        return  <div style={
            {'padding':'8px',
             'borderRadius':'2px',
             'boxShadow':'0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)',
             'display':'inline'}
        } id="category-extension-entry">
                    <Link to={`/Game/${gameUrl}/${categoryExtension}`}>
                        
                        {data.title}

                    </Link>
                    {username != null &&
                        <button onClick={(e) => {
                                e.stopPropagation()
                                addTimeClick(categoryExtension)
                            }}>
                            + 
                        </button>
                    }
                </div>
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
        <div style={{'display':'flex',
                     'flexWrap':'wrap'}} id="list-of-category-extensions">
            
            {listOfCategoryExtensionsJSX}
            
            
        </div>
        </>
    )
}

export default CategoryExtensions
