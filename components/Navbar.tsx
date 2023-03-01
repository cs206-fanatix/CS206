import Image from 'next/image'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'
import Button from '../components/Button'

interface props {
    username: string
}

const Navbar = (props: props) => {
    return (
        <div className='bg-black flex items-center justify-between p-4 h-full'>
            <div className='flex flex-col justify-center'>
                
                <img src="/logo.png" alt="Logo" className="h-12"></img>
                
            </div>
            
            <div className='flex h-full c-full gap-4'>
                    <a href="#" className="text-white">Create event</a>
                    <a href="#" className="text-white">Sign in</a>
                    <a href="#" className="text-white">{props.username}</a>
            </div>
        </div>
    )
}

export default Navbar