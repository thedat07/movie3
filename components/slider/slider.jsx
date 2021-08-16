import styled from './slider.module.css'
import List from '../list/list'
import { useState, useEffect } from 'react'
import { helper } from '../../helper/helper'
import { api } from '../../api/api'
import { Spin } from 'antd'

export default function Header() {
    const [loading, setLoading] = useState(false);
    const [dataMovie, setDataMovie] = useState({});
    const [dataTV, setDataTV] = useState({});
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await api.getDataPopularMovies(1);
            const dataTV = await api.getDataPopularTV(1);
            if (!helper.isEmptyObject(data) || !helper.isEmptyObject(dataTV)
            ) {
                if (
                    data.hasOwnProperty("results") ||
                    dataTV.hasOwnProperty("results") 
                ) {
                    setDataMovie(data.results);
                    setDataTV(dataTV.results);
                }
            }
            setLoading(false);
        };
        getData();
    }, []);
    if (loading || helper.isEmptyObject(dataMovie) ||  helper.isEmptyObject(dataTV)) {
        return (
            <Spin style={{ position: 'fixed', inset: 0 }} />
        );
    }
    return (
        <div className={styled.slider}>
            <h2>Popular Movies</h2>
            <List isData={dataMovie.slice(0, 12)} isLoading={loading} isMovie={true}></List>
            <h2>Popular TV</h2>
            <List isData={dataTV.slice(0, 12)}  isLoading={loading} isMovie={false}></List>
        </div>
    )
}