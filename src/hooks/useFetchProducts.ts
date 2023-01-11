import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '@src/actions/Product';

export const useFetchProducts = () => {
    const [loading, setLocaLoading] = useState(false);
    const [error, setLocalError] = useState(null);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        // Local actions
        setLocaLoading(true);
        setLocalError(null);

        // Redux actions
        dispatch(setLoading(true));
        dispatch(setError(null));

        fetch('https://6222994f666291106a29f999.mockapi.io/api/v1/products')
        .then((response) => response.json())
        .then((data) => {
            // Local actions
            setLocaLoading(false);

            // Redux actions
            dispatch(setLoading(false));
            dispatch(setProducts(data));
        })
        .catch((e) => {
            // Local actions
            setLocaLoading(false);
            setLocalError(e);

            // Redux actions
            dispatch(setLoading(false));
            dispatch(setError(e));
        });
    }, []);

    return { loading, error };
};
