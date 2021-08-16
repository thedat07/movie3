import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { useRouter } from 'next/router'
import { Spin } from 'antd'

export const MessContext = React.createContext();
export default function MessProvider({ children }) {
    const [messages, setMess] = useState({});
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((messages) => {
            if (messages) {
                const {
                    text,
                    uid,
                    photoURL,
                    displayName,
                    movieId
                } = messages;
                setMess({
                    text,
                    uid,
                    photoURL,
                    displayName,
                    movieId
                });
                setIsLoading(false);
                return;
            }

            // reset user info
            setMess({});
            setIsLoading(false);

        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [router.asPath]);
    return (
        <MessContext.Provider value={{ messages }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </MessContext.Provider>
    )
}