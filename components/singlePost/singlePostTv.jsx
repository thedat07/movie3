import styled from './singlePost.module.css'
import { useEffect } from 'react'
import Comment from '../comment/comment'
import CommentBox from '../commentBox/commentbox'
import Breadcrumb from '../breadcrumb/breadcrumb'
import { useContext } from 'react';
import { TvContext } from '../../context/TvProvider'
import { AuthContext } from '../../context/AuthProvider'
import Link from 'next/link'
export default function SinglePost() {
  const { dataTv } = useContext(TvContext)
  const { user: {
    displayName
  } } = useContext(AuthContext)
  return (
    <div className={styled.singlePost}>
      <Breadcrumb></Breadcrumb>
      <div className={styled.singlePostWrapper}>
        {
          dataTv.backdrop_path ?
            <img
              className={styled.singlePostImg}
              src={`https://image.tmdb.org/t/p/original/${dataTv.backdrop_path}`}
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
          {dataTv.original_name}
          <div className={styled.singlePostIcons}>
            <a href={dataTv.homepage} target="_blank" rel = "noopener noreferrer">
              <i className={styled.singlePostIcon + " fas fa-home"}> </i>
            </a>
          </div>
        </h1>
        <div className={styled.singlePostInfo}>
          <span>
            Status:
                <b className={styled.singlePostAuthor}>
              {" " + dataTv.status}
            </b>
          </span>
          <span>{dataTv.first_air_date}</span>
        </div>
        <div className={styled.singlePostInfo}>
          <span>
            Genres:
                <b className={styled.singlePostAuthor}>
              {
                dataTv.genres.map((item, index) => {
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
          {dataTv.overview ? dataTv.overview : `We don't have an overview translated in English. Help us expand our database by adding one.`}
        </p>
      </div>
      <div className={styled.headingComment}>
        <span>Comment</span>
      </div>
      {
        displayName ?
          <>
            <CommentBox></CommentBox>
          </>
          : <></>
      }
      <Comment></Comment>
    </div>
  )
}