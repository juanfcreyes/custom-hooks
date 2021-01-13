import { useEffect, useState, useRef } from 'react'

export const useFetch = (url) => {

    const [state, setstate] = useState({
        data: null,
        loading: true,
        error: null
    }, []);

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        setstate( (state) =>({...state,                 
            loading: true,
            data: null
        }));

        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            setTimeout(() => {
                if (!isMounted.current) {
                    return;
                }
                setstate( (state) =>({...state,                 
                    loading: false,
                    data
                }));
            }, 1000);
           
        }).catch(() => {
            setstate( (state) =>({...state,                 
                loading: false,
                data: null,
                error: 'No se puedo cargar la informacion'
            }));
        });
    }, [url]);

    return state;
    
}
