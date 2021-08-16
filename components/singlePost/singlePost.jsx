import styled from './singlePost.module.css'
import { useEffect } from 'react'
import Comment from '../comment/comment'
import CommentBox from '../commentBox/commentbox'
import Breadcrumb from '../breadcrumb/breadcrumb'
import { useContext } from 'react';
import { MovieContext } from '../../context/MovieProvider'
import { AuthContext } from '../../context/AuthProvider'
import { useRouter } from "next/router";
import Link from 'next/link'
export default function SinglePost() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router])
  const { dataMovie } = useContext(MovieContext)
  const { user: {
    displayName
  } } = useContext(AuthContext)
  return (
    <div className={styled.singlePost}>
      <Breadcrumb></Breadcrumb>
      <div className={styled.singlePostWrapper}>
        {
          dataMovie.backdrop_path ?
            <img
              className={styled.singlePostImg}
              src={`https://image.tmdb.org/t/p/original/${dataMovie.backdrop_path}`}
              alt=""
            />
            :
            <img
              className={styled.singlePostImg}
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
        }
        <h1 className={styled.singlePostTitle}>
          {dataMovie.original_title}
          <div className={styled.singlePostIcons}>

            <a href={dataMovie.homepage} target="_blank" rel = "noopener noreferrer">
              <i className={styled.singlePostIcon + " fas fa-home"}> </i>
            </a>

            <a href={`https://www.imdb.com/title/${dataMovie.imdb_id}/`} target="_blank" rel = "noopener noreferrer">
              <i className={styled.singlePostIcon + " fab fa-imdb"}></i>
            </a>


          </div>
        </h1>
        <div className={styled.singlePostInfo}>
          <span>
            Status:
            <b className={styled.singlePostAuthor}>
              {" " + dataMovie.status}
            </b>
          </span>
          
          <span>{dataMovie.release_date}</span>
        </div>
        <div className={styled.singlePostInfo}>
          <span>
            Genres:
                <b className={styled.singlePostAuthor}>
              {
                dataMovie.genres.map((item, index) => {
                  return (
                    <Link href={`/genres/tv/${item.id}`} key={item.id}>
                      {item.name}
                    </Link>
                  )
                }

                )
              }
            </b>
          </span>

        </div>
        <p className={styled.singlePostDesc}>
          {dataMovie.overview ? dataMovie.overview : `We don't have an overview translated in English. Help us expand our database by adding one.`}
        </p>
      </div>
      <div className={styled.headingComment}>
        <span>Comment</span>
      </div>
      {
        displayName ? <CommentBox></CommentBox> : <></>
      }
      <Comment></Comment>
    </div>
  )
}