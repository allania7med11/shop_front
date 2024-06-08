import { useEffect, useState } from 'react';
import { ApiError } from '@/data/error';

const useErrors = (error, setError, getValues) => {
    const values = getValues()
    const fields = values ? Object.keys(getValues()) : []
    const apiError = error as ApiError;
    const [globalErrors, setGlobalErrors] = useState([]);
    useEffect(() => {
        if (apiError) {
            let arr = []
            if (apiError.originalStatus >= 500) {
                arr.push("Internal Server Error. Please try again later.");
            } else {
                for (let key in apiError.data) {
                    if (
                        fields.includes(key)
                    ) {
                        setError(key, {
                            type: "server",
                            message: apiError.data[key].join("\n"),
                        });
                    } else {
                        let fieldErrors = apiError.data[key]
                        if (!Array.isArray(fieldErrors)) {
                            fieldErrors = [fieldErrors]
                        }
                        fieldErrors = fieldErrors.map(err => `${key}: ${err}`)
                        arr = [...arr, ...fieldErrors]
                    }
                }

            }
            setGlobalErrors(arr)
        }

    }, [apiError, fields])
    return { globalErrors, setGlobalErrors }
};

export default useErrors;