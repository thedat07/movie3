import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { api } from "../api/api";
import { helper } from "../helper/helper";
import { useRouter } from "next/router";
export const TvContext = React.createContext();
export default function TvProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [dataTv, setDataTv] = useState({});
    const router = useRouter();
    const { id } = router.query;
   
    useEffect(() => {
        if (!router.isReady) return;
        const getData = async () => {
            setLoading(true);
            const data = await api.getDataDetailTv(id);

            if (!helper.isEmptyObject(data)) {
                const { genres, homepage, original_name, overview, first_air_date, status, backdrop_path } = data;
                setDataTv({
                    genres, homepage, original_name, overview, first_air_date, status, backdrop_path
                });
            }
            setLoading(false);
        };
        getData();
    }, [router.isReady, id]);
    if (loading || helper.isEmptyObject(dataTv)) {
        return (
            <Spin style={{ position: 'fixed', inset: 0 }} />
        );
    }
    return (
        <TvContext.Provider value={{ dataTv }}>
            { children}
        </TvContext.Provider>
    )
}