import React, { useState } from 'react'
import './index.css'
import logo from '../../assets/logo.png'
import { Button, Field, Input, Stack, Text } from "@chakra-ui/react"
import { useAuth } from '../../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)

  const {login} = useAuth()

  const handleLogin = () => {
    const isLoggedIn = login({ email, password })
    if (isLoggedIn) {
      setRedirect(true)
    } else {
      console.log("Login failed")
    }
  }

  if (redirect) return <Navigate to="/" replace />

  if(JSON.parse(localStorage.getItem("isLoggedIn"))) return <Navigate to="/" replace />

  return (
    <>
    <div className='page-cont'>
            <div className='side-container'>
              <img src={logo}></img>
              <h1 className='side-heading'>Welcome back to Credi-Khaata</h1>
            </div>
            <div className='login-container'>
              <div style={{border: "1px solid rgb(130, 130, 130)",padding: "30px",borderRadius: "10px"}}>
              <h1 className='login-heading'>Account Login</h1>
              <form style={{width: "280px",marginTop: "20px",textAlign: "center"}}>
              <Field.Root required>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field.Root>
              <Field.Root style={{marginTop: "10px"}} required>
                <Field.Label>
                  Password <Field.RequiredIndicator />
                </Field.Label>
                <Input type='password' placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Field.Root>
              <Button style={{marginTop: "15px"}} onClick={handleLogin}>Login</Button>
              <p style={{fontSize: "12px",marginTop:"10px"}}>Didn't have an account? <Link to="/signup" style={{color: "blue"}}>Signup</Link></p>
              </form>
              </div>
            </div>
        </div>
    </>
  )
}
