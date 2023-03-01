import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className='flex flex-col h-screen w-full'>
            <Navbar
                username={"AdrianH01"}
            />
            <div className='flex h-7/8 justify-center'>
                <Link href="/organiser_dashboard" className='text'> To organiser dashboard</Link>
            </div>
        </div>
    )
}

export default Home
