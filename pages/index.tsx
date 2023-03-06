import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        
    }, [])

    const cats: any[] = []
    return (
        <div className='h-screen'>
            <Navbar 
                num={number}
            />

            <div className='flex h-[80%]'>
                <div className='flex flex-col w-24 gap-4 py-5 bg-blue-500'>
                    <div>
                        {
                            number
                        }
                    </div>
                    <div
                        onClick={() => setNumber(number + 1)}
                    >
                        Artist
                    </div>
                    <div>
                        Revenue
                    </div>

                    {
                        cats.map((cat) => {
                            return (
                                <div key="abc">
                                    {cat}
                                </div>
                            )
                        })
                    }

                    {
                        cats.length != 0 ? (
                            <div>
                                {cats[0]}
                            </div>
                        )
                        :
                        <div>
                            Nothing here
                        </div>

                    }
                </div>

                <div className='flex justify-between w-full gap-10 overflow-auto'>
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
