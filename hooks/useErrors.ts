import { useEffect, useState } from 'react';
import { ApiError } from '@/data/error';

const useErrors = (error, setError, getValues) => {
    const values = getValues()
    const fields = values ? Object.keys(getValues()) : []
    const apiError = error as ApiError;
    const [globalErrors, setGlobalErrors] = useState([]);
    useEffect(() => {
        if (apiError) {
            for (let key in apiError.data) {
                if (
                    fields.includes(key)
                ) {
                    setError(key, {
                        type: "server",
                        message: apiError.data[key].join("\n"),
                    });
                } else {
                    setGlobalErrors(apiError.data["non_field_errors"]);
                }
            }
        }

    }, [apiError, fields])
    return { globalErrors, setGlobalErrors }
};

export default useErrors;