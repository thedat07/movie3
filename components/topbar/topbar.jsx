import styles from './topbar.module.css'
import { useContext, useState } from 'react';
import firebase, { auth, db } from '../../firebase/config'
import { AuthContext } from '../../context/AuthProvider'
import { Avatar } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function TopBar() {
    const router = useRouter()
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo?.isNewUser) {
            db.collection('users').add({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
            });
        }
    };
    const { user: {
        displayName,
        photoURL
    } } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value)
    }
    const handleOnSubmit = () => {
        router.push({
            pathname: `/search/${inputValue}`,
        })
    }
    return (
        <div className={styles.top}>
            <div className={styles.topLeft}>
                <input className={styles.topInput}  onChange={handleInputChange} value={inputValue} ></input>
                <button
                    type="button"
                    onClick={handleOnSubmit}>
                    <i className={styles.topIcon + " fas fa-search"}></i>
                </button>

            </div>
            <div className={styles.topCenter}>
                <ul className={styles.topList}>
                    <li className={styles.topListItem}>
                        <Link href="/">
                            HOME
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link href="/movie">
                            MOVIES
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link href="/tv">
                            TV SHOWS
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link href="/blog">
                            BLOG
                        </Link>
                    </li>

                </ul>

            </div>
            <div className={styles.topRight}>
                <div className={styles.topList}>
                    {
                        displayName ?
                            <button onClick={() => auth.signOut()} className={styles.topListItem}>  <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar> LOGOUT</button>
                            :
                            <button onClick={() => handleLogin(fbProvider)} className={styles.topListItem}>LOGIN</button>
                    }
                    {/* <i className={styles.topSearchIcon + " fas fa-search"}></i> */}
                </div>

            </div>
            <div className={styles.topBot}></div>
        </div>
    )
}