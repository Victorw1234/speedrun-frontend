import { useState, useEffect } from "react";

function useFetch(url, defaultvalue = null) {
    const [state, setState] = useState({ data: defaultvalue, loading: false });

    useEffect(() => {
        setState({ data: state.data, loading: true });
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setState({ data: data, loading: false });
            });
        setState({ data: state.data, loading: false });
    }, [url]);

    return [state.data, state.loading];
}

export default useFetch;
