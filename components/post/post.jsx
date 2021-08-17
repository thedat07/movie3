
import Link from 'next/link'
import style from './post.module.css'
import slugify from 'react-slugify'

export default function Posts({ backdrop_path, original_title, release_date, overview, genres = [], LinkURL = 1, movie = false }) {
    return (
        <div className={style.post}>
            <Link href={
                movie ?
                    `/movie/${LinkURL}~${slugify(original_title)}` :
                    `/tv/${LinkURL}~${slugify(original_title)}`
            } >
                {
                    backdrop_path ?
                        <img
                            className={style.postImg}
                            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                            alt=""
                        />
                        :
                        <img
                            className={style.postImg}
                            alt=""
                        />
                }
            </Link>
            <div className={style.postInfo}>
                <div className={style.postCats}>
                    {

                        genres.map((item, index) => {
                            return (
                                <Link href={`/genres/${movie?'movie':'tv'}/${item.id}`} key={item.id}>
                                    <span className={style.postCat} >{item.name}</span>
                                </Link>
                            )
                        })
                    }

                </div>
                <span className={style.postTitle}>
                    {original_title}
                </span>
                <hr></hr>
                <span className={style.postDate}>{release_date}</span>
                <p className={style.postDesc}>{overview}</p>
            </div>
        </div>
    )
}