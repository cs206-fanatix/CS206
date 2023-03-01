import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar (Organiser)'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
    return (
        <div className='flex flex-col h-screen w-full'>
            <Navbar 
                username={"AdrianH01"}
            />
            <div className='flex h-5/6'>
                <div className='flex w-1/12 flex-col py-5 gap-8 bg-[#191645]'>
                    <div className="flex flex-col gap-8 py-5 align-top">
                        <Link href="#" >
                            <text className='text-[#F9F9F9] text-center'>Dashboard</text>
                        </Link>
                        <Link href="#">
                            <text className='text-[#F9F9F9] text-center'>Artists</text>
                        </Link>
                        <Link href="#">
                            <text className='text-[#F9F9F9] text-center'>Revenue</text>
                        </Link>
                        <Link href="#">
                            <text className='text-[#F9F9F9] text-center'>My Events</text>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-8 py-5 align-bottom">
                        <Link href="#">
                            <text className='text-[#F9F9F9] text-center'>Account</text>
                        </Link>
                        <Link href="#">
                            <text className='text-[#F9F9F9] text-center'>Settings</text>
                        </Link>
                    </div>
                </div>

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
