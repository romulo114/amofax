import { useEffect, useState } from "react";
import client from "../util.js/client";

const useFetch = (endpoint, options) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    const response = await client(endpoint, options)
                    setData(response)
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }
}

export default useFetch