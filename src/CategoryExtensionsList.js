import React,{useEffect,useContext} from 'react'
import {Link } from "react-router-dom";
import { UserContext } from './UserContext';

function CategoryExtensions({list,gameUrl}) {

    const username = useContext(UserContext);

    const listOfCategoryExtensionsJSX = list.map((data,index) => {
        return  <li key={index}>
                    {username != null &&
                    <Link to={`/Game/${gameUrl}/${data.urlTitle}/addtime`}>
                        <button>
                            +
                        </button>
                    </Link>}

                    <Link to={`/Game/${gameUrl}/${data.urlTitle}`}>
                        {data.title}
                    </Link>
                </li>
    })

    return (
        <div id="list-of-category-extensions">
            <ul>
            {listOfCategoryExtensionsJSX}
            </ul>
        </div>
    )
}

export default CategoryExtensions
