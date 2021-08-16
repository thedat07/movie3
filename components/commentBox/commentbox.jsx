import styled from './commentbox.module.css'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from "next/router";
import firebase, { db } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider'
import { from } from 'antd'
export default function CommentBox() {
    const router = useRouter();
    const { id } = router.query;
    const [inputValue, setInputValue] = useState('')
    const { user: {
        uid,
        photoURL,
        displayName
    } } = useContext(AuthContext)
    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady, id]);
    let tvMovie = router.pathname.split('/').filter((x) => x)[0]
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value)
    }
    const handleOnSubmit = () => {
        db.collection('messages').add({
            text: inputValue,
            uid,
            photoURL,
            comment: id,
            displayName,
            tvMovie: tvMovie,
            createdAd: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInputValue('')
    }
    return (
        <div className={styled.container}>
            <div className={styled.box}>
                <h2>Leave Us a Comment</h2>
                <div onSubmit={handleOnSubmit}>
                    <textarea
                        className={styled.comment}
                        placeholder='Add Your Comment'
                        onChange={handleInputChange}
                        value={inputValue}
                    ></textarea>
                    <div className={styled.btn}>
                        <input type='submit' value='Comment' className={styled.submit} onClick={handleOnSubmit}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}