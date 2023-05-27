import { useState, useEffect } from "react";
import axios from "axios";

export default async function GetData(setDataktp1) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log('axios.get');
                const response = await axios.get(
                    `localhost:5000/db/get_ktp1`
                );

                setData(response.data);
                setError(null);
                console.log(data);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [data,loading]);
    console.log()

    !loading && console.log('is loading data',data);
    //setDataktp1(JSON.stringify(data));
    return ( 'ok')
}

