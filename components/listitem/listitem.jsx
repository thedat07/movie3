import styled from './listitem.module.css'
import Link from 'next/link'
import slugify from 'react-slugify'; 
export default function ListItem({ isImage, isLink, isMovie, isName}) {
    return (
        <>
        {
            isMovie ? 
            <Link 
            href={`/movie/${isLink}~${slugify(isName)}`}>
                <div className={styled.listItem}>
                    <img src={`https://image.tmdb.org/t/p/original/${isImage}`}></img>
                </div>
            </Link>
            :
            <Link 
            href={`/tv/${isLink}~${slugify(isName)}`}>
                <div className={styled.listItem}>
                    <img src={`https://image.tmdb.org/t/p/original/${isImage}`}></img>
                </div>
            </Link>
        }
        </>
       
    )
}