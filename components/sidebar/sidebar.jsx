import { useState, useEffect } from "react";
import style from './sidebar.module.css'
import { api } from '../../api/api'
import { helper } from "../../helper/helper";
import Link from 'next/link'
import slugify from 'react-slugify'
export default function SideBar() {
    const [loading, setLoading] = useState(false);
    const [dataMovie, setDataMovie] = useState([]);
    const [dataTv, setDataTv] = useState([]);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const dataMovie = await api.getGenresMovie();
            const dataTv = await api.getGenresTv();
            if (!helper.isEmptyObject(dataMovie)
            && !helper.isEmptyObject(dataTv)
            ) {
                if (
                    dataMovie.hasOwnProperty("genres")
                    && dataTv.hasOwnProperty("genres")
                ) {
                    setDataMovie(dataMovie.genres);
                    setDataTv(dataTv.genres);
                }
            }
            setLoading(false);
        };
        getData();
    }, []);
    return (
        <div className={style.sidebar}>
            <div className={style.sidebarItem}>
                <span className={style.sidebarTitle}>ABOUT ME</span>
                <img
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
            </div>
            <div className={style.sidebarItem}>
                <span className={style.sidebarTitle}>GENRES MOVIE</span>
                <ul className={style.sidebarList}>
                    {
                        dataMovie ?
                        dataMovie.slice(0,12).map((item, _) => {
                                return (
                                    <li className={style.sidebarListItem} key={item.id}>

                                        <Link href={`/genres/movie/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            }) : ""
                    }
                </ul>
            </div>
            <div className={style.sidebarItem}>
                <span className={style.sidebarTitle}>GENRES TV</span>
                <ul className={style.sidebarList}>
                    {
                        dataTv ?
                        dataTv.slice(0,12).map((item, _) => {
                                return (
                                    <li className={style.sidebarListItem} key={item.id}>
                                        <Link href={`/genres/tv/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            }) : ""
                    }
                </ul>
            </div>
        </div>
    )
}