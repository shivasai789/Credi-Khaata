import React, { useState } from 'react'
import icon from '../../assets/icon.png'
import { Button, Menu, Portal } from "@chakra-ui/react"
import { IoPersonCircleOutline } from "react-icons/io5"
import './index.css'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"))
  const {logout} = useAuth();
  const [redirect, setRedirect] = useState(false)

  if(redirect) return <Navigate to="/login" />

  return (
    <div className='navbar-container'>
      <Link to="/">
      <img src={icon} className='icon-img' alt="icon" />
      </Link>
      <Menu.Root>
      <Menu.Trigger asChild style={{backgroundColor: "white",outline: "none"}}>
        <Button variant="outline" size="sm">
        <IoPersonCircleOutline style={{ fontSize: "40px" }} />
        <h1>Welcome User !</h1>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt">{user.email}</Menu.Item>
            <Menu.Item><button className='log-out' onClick={() => {logout(),setRedirect(true)}}>Log Out</button></Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
    </div>
  )
}
