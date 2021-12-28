import React,{useState,useEffect,useRef} from 'react'

/**/
function Sorter({array,setArray}) {

    const [sort,setSort] = useState('-')
    const [showDash,setShowDash] = useState(true)

    useEffect(() => {
        if (sort != '-'){
            setShowDash(false)
        }
        if (sort === "alphabetical") {
            var sorted = [...array]
            sorted.sort((a,b) => a.title.localeCompare(b.title));
            setArray(sorted);
        }
    }, [sort])

    return (
        <div style={{'display':'flex','justifyContent':'center'}}>
            <select onChange={e => {setSort(e.target.value)}} value={sort} name="sort">
                {showDash && <option value="-">-</option>}
                <option value="alphabetical">Alphabetical</option>
                <option value="popularity">Popularity</option>
                
            </select>

        </div>
    )
}

export default Sorter
