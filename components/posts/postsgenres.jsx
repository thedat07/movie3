import style from './posts.module.css'
import { api } from '../../api/api'
import { helper } from "../../helper/helper";
import { useState, useEffect } from "react";
import { Tabs } from 'antd'
import TabPanePage from '../tabpane/tabpane'
import { useRouter } from "next/router";
import { Spin } from 'antd'
const { TabPane } = Tabs;
export default function Posts() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataGenres, setDataGenres] = useState({});
    const { id } = router.query
    const check = router.asPath.split('/').filter((x) => x)[1]
    useEffect(() => {
        if (!router.isReady) return;

        const getData = async () => {
            setLoading(true);
            if (check === 'movie') {
                const dataGenres = await api.getDataGenresMovie(id, page)
                if (
                    !helper.isEmptyObject(dataGenres)
                ) {
                    if (
                        dataGenres.hasOwnProperty("results")
                    ) {
                        setDataGenres(dataGenres);
                    }
                }
            }
            else {
                const dataGenresTv = await api.getDataGenresTv(id, page)
                if (
                    !helper.isEmptyObject(dataGenresTv)
                ) {
                    if (
                        dataGenresTv.hasOwnProperty("results")
                    ) {
                        setDataGenres(dataGenresTv);
                    }
                }
            }
            setLoading(false);
        };
        getData();
    }, [page, router.isReady, id]);
    const changePage = (page) => {
        setPage(page);
    };
    if (loading || helper.isEmptyObject(dataGenres)) {
        return (
            <Spin />
        )
    }
    
    return (
        <Tabs defaultActiveKey="1" className={style.tab}>
            <TabPane tab={`${check === 'movie'
                    ? helper.isGenresMovie(id).map((item) => item.name)
                    : helper.isGenresTv(id).map((item) => item.name)
                }`} key="1" >
                <div className={style.posts}>
                    <TabPanePage data={dataGenres} page={page} loading={loading} changePage={changePage} movie={check==='movie'}></TabPanePage>
                </div>
            </TabPane>
        </Tabs>


    )
}