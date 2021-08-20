import React,{useState,useEffect} from 'react'


function getSavedValue(key,initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    return initialValue
}

function useLocalStorage(key,initialValue) {
    const [value,setValue] = useState(() => {return getSavedValue(key,initialValue)})


    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value))
    },[value])

    return [value,setValue]
}

export default useLocalStorage
