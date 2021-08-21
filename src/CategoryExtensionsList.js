import React,{useEffect} from 'react'
import {Link } from "react-router-dom";

function CategoryExtensions({list,gameUrl}) {

    

    const listOfCategoryExtensionsJSX = list.map((data,index) => {
        return <li key={index}><Link to={`/Game/${gameUrl}/${data.urlTitle}`}>{data.title}</Link></li>
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
