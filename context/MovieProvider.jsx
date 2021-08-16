import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { api } from "../api/api";
import { helper } from "../helper/helper";
import { useRouter } from "next/router";
export const MovieContext = React.createContext();
export default function MovieProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [dataMovie, setDataMovie] = useState({});
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!router.isReady) return;
        const getData = async () => {
            setLoading(true);
            const data = await api.getDataDetailMovie(id);

            if (!helper.isEmptyObject(data)) {
                const { genres, homepage, original_title, overview, release_date, status, backdrop_path, imdb_id } = data;
                setDataMovie({
                    genres, homepage, original_title, overview, release_date, status, backdrop_path, imdb_id
                });
            }
            setLoading(false);
        };
        getData();
    }, [router.isReady, id]);
    if (loading || helper.isEmptyObject(dataMovie)) {
        return (
            <Spin style={{ position: 'fixed', inset: 0 }} />
        );
    }
    return (
        <MovieContext.Provider value={{ dataMovie }}>
            { children}
        </MovieContext.Provider>
    )
}