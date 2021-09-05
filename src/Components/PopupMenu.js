import React from 'react'
import '../Css/PopupMenu.css'

function PopupMenu({children,toggle}) {
    return (
        <div onClick={toggle} class="popup-menu">
            <div id="popup-menu-child" onClick={(e) => {e.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
}

export default PopupMenu
