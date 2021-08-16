
import { useRouter } from "next/router";
import { useMemo, useEffect, useState, useContext } from 'react'
import useFirestore from '../../hook/useFirestore'
import styled from './comment.module.css'
import firebase, { db } from '../../firebase/config';
import { formatRelative } from 'date-fns'
import { AuthContext } from '../../context/AuthProvider'
export default function Comm() {
    const router = useRouter();
    const [visiable, setVisiable] = useState(4);
    const [inputValue, setInputValue] = useState('')
    const [isReply, setIsReply] = useState(false)
    const [clickedComment, setClickedComment] = useState('')
    const { id } = router.query;
    const { user: {
        uid
    } } = useContext(AuthContext)
    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady, id]);
    const condition = useMemo(
        () => ({
            fieldName: 'comment',
            operator: '==',
            compareValue: id,
        }),
        [id]
    );

    let tvMovie = router.pathname.split('/').filter((x) => x)[0]
    const messages = useFirestore('messages', condition);
    const formatDay = (seconds) => {
        let formatDate = '';
        if (seconds) {
            formatDate = formatRelative(new Date(seconds * 1000), new Date());
            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
        }
        return formatDate
    }
    const changeIsReply = (clickedId) => {
        setIsReply(!isReply)
        setClickedComment(clickedId)
    }
    const showMoreItems = () => {
        setVisiable(visiable + visiable)
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value)
    }
    const handleOnSubmit = (doc) => {
        db.collection('messages').doc(doc).update({
            text: inputValue,
            createdAd: firebase.firestore.FieldValue.serverTimestamp()
        });
        setIsReply(!isReply)
    }
    const handleOnDelete = (doc) => {
        db.collection('messages').doc(doc).delete();
    }


    return (
        <div className={styled.container} >
            {
                messages.filter(mess => mess.tvMovie == tvMovie).slice(0, visiable).map((mess, index) => {
                    return (
                        <div className={styled.container} key={index} >
                            <div className={styled.box} >
                                <div className={styled.boxTop}>
                                    <div className={styled.profile}>
                                        <div className={styled.profileImg}>
                                            <img src={mess.photoURL}></img>
                                        </div>
                                        <div className={styled.nameUser}>
                                            <strong>{mess.displayName}</strong>
                                            <span>{formatDay(mess.createdAd?.seconds)}</span>
                                        </div>
                                    </div>
                                    <div className={styled.profile}>
                                        {
                                            uid == mess.uid
                                                ? <>
                                                    <button onClick={() => changeIsReply(mess.id)}>
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button onClick={() => handleOnDelete(mess.id)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button></>
                                                : <></>
                                        }

                                    </div>
                                </div>
                                {isReply && clickedComment == mess.id ?
                                    <>
                                        <textarea
                                            placeholder='Add Your Comment'
                                            onChange={handleInputChange}
                                            className={styled.commentBox}
                                            defaultValue={mess.text}

                                        ></textarea>
                                        <input
                                            className={styled.submit}
                                            type='submit'
                                            value='Edit'
                                            onClick={() => handleOnSubmit(mess.id)}>
                                        </input>
                                    </> :
                                    <div className={styled.comment}>
                                        <p>{mess.text}</p>
                                    </div>
                                }


                                {/* <div className={styled.comment}>
                                    <p>{mess.text}</p>
                                </div>
                                <textarea
                                    placeholder='Add Your Comment'
                                    onChange={handleInputChange}
                                    className={styled.commentBox}
                                    defaultValue={mess.text}

                                ></textarea>
                                <input
                                    className={styled.submit}
                                    type='submit'
                                    value='Edit'
                                    onClick={() => handleOnSubmit(mess.id)}>
                                </input> */}
                            </div>
                        </div>
                    )
                })
            }
            {

                messages.length <= visiable
                    ? <></> : <button onClick={showMoreItems} className={styled.loadMore}>Load More</button>

            }

        </div >
    )
}