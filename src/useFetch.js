import { useState, useEffect } from "react";

function useFetch(url, defaultvalue = null,options = null) {
    const [state, setState] = useState({ data: defaultvalue, loading: true });

    useEffect(() => {
        setState({data: state.data, loading:true})
        fetch(url,options)
            .then((res) => res.json())
            .then((data) => {setState({ data: data, loading: false })})
    }, [url]);

    return [state.data, state.loading];
}

export default useFetch;
