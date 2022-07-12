import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../util/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')
        if (recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const loggedUser = user
            localStorage.setItem('user', JSON.stringify(loggedUser))
            setUser(loggedUser)
            navigate('/')

        } catch (error) {
            alert("Ops... Encontramos alguma divergência no login. Por favor, tente novamente.")
        }
    }

    const logout = async () => {
        await signOut(auth)
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return(
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

