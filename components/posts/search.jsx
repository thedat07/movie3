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
    const [dataTv, setDataTv] = useState({});
    const [dataMovie, setDataMovie] = useState({});

    const {id} = router.query
    useEffect(() => {
        if (!router.isReady) return;
        const getData = async () => {
            setLoading(true);
            const dataMovie = await api.searchDataMovie(id,page)
            const dataTv = await api.searchDataTv(id,page)

            if (!helper.isEmptyObject(dataTv)
                && !helper.isEmptyObject(dataMovie)

            ) {
                if (
                    dataTv.hasOwnProperty("results")
                    && dataMovie.hasOwnProperty("results")

                ) {
                    setDataTv(dataTv);
                    setDataMovie(dataMovie);

                }
            }
            setLoading(false);
        };
        getData();
    }, [page,id]);
    const changePage = (page) => {
        setPage(page);
    };
    return (
        <Tabs defaultActiveKey="1" className={style.tab}>
            <TabPane tab="Movie" key="1" >
                
                    <TabPanePage data={dataMovie} page={page} loading={loading} changePage={changePage} movie={true}></TabPanePage>
                
            </TabPane>
            <TabPane tab="Tv" key="2" >
               
                    <TabPanePage data={dataTv} page={page} loading={loading} changePage={changePage} movie={false}></TabPanePage>
                
            </TabPane>

        </Tabs>

    )
}