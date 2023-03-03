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
            <div className='flex'>
                <div className='flex flex-col w-1/12 gap-4 py-5 bg-blue-500'>
                    <div>
                        Hello
                    </div>
                    <div>
                        Artist
                    </div>
                    <div>
                        Revenue
                    </div>
                </div>
                {/* <video autoPlay muted loop id="bg-video">
                    <source src="/background.mp4" type="video/mp4"/>
                </video> */}
                <div className='flex justify-between w-11/12 gap-10 overflow-auto'>
                    <div className='w-full flex flex-col'>
                    
                        {/* Upcoming event corner */}
                        <div className='text-4xl font-semibold'>
                            Upcoming Event
                        </div>

                        <div className='flex flex-col h-full gap-6'>
                            <div className='bg-red-400 h-40 p-4 flex flex-col justify-end'>
                                <div className='flex flex-col gap-1'>
                                    <div className=''>
                                        Taylorswift
                                    </div>
                                    <div>
                                        Time
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                Taylorswift
                            </div>
                            <div>
                                Taylorswift
                            </div>
                            <div className='bg-red-400 h-40 p-4 flex flex-col justify-end'>
                                <div className='flex flex-col gap-1'>
                                    <div className=''>
                                        Taylorswift
                                    </div>
                                    <div>
                                        Time
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                Taylorswift
                            </div>
                            <div>
                                Taylorswift
                            </div>
                            <div className='bg-red-400 h-40 p-4 flex flex-col justify-end'>
                                <div className='flex flex-col gap-1'>
                                    <div className=''>
                                        Taylorswift
                                    </div>
                                    <div>
                                        Time
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                Taylorswift
                            </div>
                            <div>
                                Taylorswift
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        Ticket Sales
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Home
