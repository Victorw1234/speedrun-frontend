import React,{useContext,useState} from 'react'
import { TextField, Button } from "@material-ui/core";
import { APIContext } from '../APIContext';
function AddCategory() {

    const [category,setCategory] = useState("")

    function handleSubmit(e) {
        console.log(category)
    }

    return (
        <div style={{'background':'white','padding':'16px','marginTop':'160px'}}>
            <form>
                <TextField value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                <Button onClick={handleSubmit}>Add Category</Button>
            </form>
        </div>
    )
}

export default AddCategory
