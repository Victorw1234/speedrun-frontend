import { useState, useEffect } from "react";

function useFetch(url, defaultvalue = null) {
    const [state, setState] = useState({ data: defaultvalue, loading: true });

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {console.log(data);setState({ data: data, loading: false })});
    }, [url]);

    return [state.data, state.loading];
}

export default useFetch;
