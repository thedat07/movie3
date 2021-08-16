import style from './posts.module.css'
import { api } from '../../api/api'
import { helper } from "../../helper/helper";
import { useState, useEffect } from "react";
import { Tabs } from 'antd'
import TabPanePage from '../tabpane/tabpane'
import { useRouter } from "next/router";
const { TabPane } = Tabs;
export default function Posts() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataPopularMovies, setDataPopularMovies] = useState({});
    const [dataNowPlayingMovies, setDataNowPlayingMovies] = useState({});
    const [dataUpcomingMovies, setDataUpcomingMovies] = useState({});
    const [dataTopRatedMovies, setDataTopRatedMovies] = useState({});
    const [dataPopularTV, setDataPopularTV] = useState({});
    const [dataTodayTV, setDataTodayTV] = useState({});
    const [dataOnTV, setDataOnTV] = useState({});
    const [dataTopRatedTV, setDataTopRatedTV] = useState({});
    useEffect(() => {
        if (!router.isReady) return;
        const getData = async () => {
            setLoading(true);
            const dataPopular = await api.getDataPopularMovies(page)
            const dataNowPlaying = await api.getDataNowPlayingMovies(page)
            const dataUpcoming = await api.getDataUpcomingMovies(page)
            const dataTopRated = await api.getDataTopRatedMovies(page)
            const dataPopularTV = await api.getDataPopularTV(page)
            const dataTodayTV = await api.getAiringTodayTV(page)
            const dataOnTV = await api.getOnTheAirTV(page)
            const dataTopRatedTV = await api.getTopRatedTV(page)
            if (!helper.isEmptyObject(dataPopular)
                || !helper.isEmptyObject(dataNowPlaying)
                || !helper.isEmptyObject(dataUpcoming)
                || !helper.isEmptyObject(dataTopRated)
                || !helper.isEmptyObject(dataPopularTV)
                || !helper.isEmptyObject(dataTodayTV)
                || !helper.isEmptyObject(dataOnTV)
                || !helper.isEmptyObject(dataTopRatedTV)
            ) {
                if (
                    dataPopular.hasOwnProperty("results")
                    || dataNowPlaying.hasOwnProperty("results")
                    || dataUpcoming.hasOwnProperty("results")
                    || dataTopRated.hasOwnProperty("results")
                    || dataPopularTV.hasOwnProperty("results")
                    || dataTodayTV.hasOwnProperty("results")
                    || dataOnTV.hasOwnProperty("results")
                    || dataTopRatedTV.hasOwnProperty("results")
                ) {
                    setDataPopularMovies(dataPopular);
                    setDataNowPlayingMovies(dataNowPlaying);
                    setDataUpcomingMovies(dataUpcoming)
                    setDataTopRatedMovies(dataTopRated)
                    setDataPopularTV(dataPopularTV)
                    setDataTodayTV(dataTodayTV)
                    setDataOnTV(dataOnTV)
                    setDataTopRatedTV(dataTopRatedTV)
                }
            }
            setLoading(false);
        };
        getData();
    }, [page]);
    const changePage = (page) => {
        setPage(page);
    };

    return (
        <Tabs defaultActiveKey="1" className={style.tab}>
            {
                router.asPath.split('/').filter((x) => x)[0] === 'movie' ?
                    <>
                        <TabPane tab="Popular" key="1" >
                            <div className={style.posts}>
                                <TabPanePage data={dataNowPlayingMovies} page={page} loading={loading} changePage={changePage} movie={true}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="Now Playing" key="2" >
                            <div className={style.posts}>
                                <TabPanePage data={dataPopularMovies} page={page} loading={loading} changePage={changePage} movie={true}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="Upcoming" key="3" >
                            <div className={style.posts}>
                                <TabPanePage data={dataUpcomingMovies} page={page} loading={loading} changePage={changePage} movie={true}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="Top Rated" key="4" >
                            <div className={style.posts}>
                                <TabPanePage data={dataTopRatedMovies} page={page} loading={loading} changePage={changePage} movie={true}></TabPanePage>
                            </div>
                        </TabPane>
                    </>
                    :
                    <>
                        <TabPane tab="Popular" key="1" >
                            <div className={style.posts}>
                                <TabPanePage data={dataPopularTV} page={page} loading={loading} changePage={changePage} movie={false}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="Airing Today" key="2" >
                            <div className={style.posts}>
                                <TabPanePage data={dataTodayTV} page={page} loading={loading} changePage={changePage} movie={false}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="On TV" key="3" >
                            <div className={style.posts}>
                                <TabPanePage data={dataOnTV} page={page} loading={loading} changePage={changePage} movie={false}></TabPanePage>
                            </div>
                        </TabPane>
                        <TabPane tab="Top Rated" key="4" >
                            <div className={style.posts}>
                                <TabPanePage data={dataTopRatedTV} page={page} loading={loading} changePage={changePage} movie={false}></TabPanePage>
                            </div>
                        </TabPane>
                    </>
            }
        </Tabs>

    )
}