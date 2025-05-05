import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const isLoggedin = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(isLoggedin === true);
    },[])

    const login = ({email,password}) => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if(storedUser?.email === email && storedUser?.password === password){
            localStorage.setItem("isLoggedIn",true)
            setIsLoggedIn(true)
            return true
        }
        return false
    }

    const signUp = ({email,password}) => {
        const user = {email,password}
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("isLoggedIn", true);
        return true
    }

    const logout = () => {
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false)
        return true
    }

    return (
        <AuthContext.Provider value={{isLoggedIn,login,logout,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)