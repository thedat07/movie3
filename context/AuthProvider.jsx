import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { useRouter } from 'next/router'
import { Spin } from 'antd'

export const AuthContext = React.createContext();
export default function AuthProvoder({ children }) {
    const [user, setUser] = useState({});
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
            
                return;
            }

            // reset user info
            setUser({});
            setIsLoading(false);
            
        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [router.asPath]);
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    )
}