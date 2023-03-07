import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Event_Card from '../components/Organiser-Dashboard/Event_Card'
import Purchases from '../components/Organiser-Dashboard/Purchases'
import RevenueChart from '../components/Organiser-Dashboard/RevenueChart'
import Footer from '../components/Footer'
import Carousel from '../components/Organiser-Dashboard/Carousel'


const Home: NextPage = () => {
    const generate_event_cards=()=> {
        var event_cards = []
        for (var i = 0; i < 10; i++) {
            event_cards.push(<Event_Card event_name="Aimer" event_start_date="2021-01-01" event_end_date="2021-01-01" image="/zankyosanka-photo.jpg" />)
        }
        return event_cards
    }

    const generate_purchases=()=> {
        var purchases = []
        for (var i = 0; i < 10; i++) {
            // Generate random profit
            var profit_amt = (Math.random() * 1000).toString()
            // round off to 2 decimal places
            profit_amt = profit_amt.substring(0, profit_amt.indexOf('.') + 3)

            purchases.push(
            <li className="py-3 sm:py-4">
                <Purchases image="/profile.png" username="SOLgod99" event="Aimer Live" profit={profit_amt} />
            </li>)
        }
        return purchases
    }

    const [open, setOpen] = useState(false)
    useEffect(() => {
        console.log("Hello")
    }, [])


    return (
        <div className='flex flex-col h-auto w-full pt-20'>
            <div className='flex h-auto w-full pt-1'>
                {/* Side panel */}
                <div className="px-3 pb-4 overflow-y-auto bg-secondary">
                <ul className="space-y-2 pt-4">
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">dataset</span>
                        <span className="ml-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">person</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">My Artists</span>
                        </a>
                    </li>                  
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">stadium</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">My Events</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">confirmation_number</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">Ticketing</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">credit_card</span>   
                        <span className="flex-1 ml-3 whitespace-nowrap">Payment</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">settings</span>                    
                        <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </a>
                    </li>
                </ul>
                </div>
                <div className='flex flex-col w-full h-screen overflow-auto no-scroll-bar'>
                    <div className='text-4xl font-semibold pt-10 pb-4 pl-4 bg-primary'>
                        Up next
                    </div>

                    {/* Latest upcoming event */}
                    {/* <div className="flex bg-gray-200 border border-gray-200 rounded-lg w-3/4 h-3/4 pt-10 pr-80 justify-center drop-shadow-md justify-center align-middle">
                        <img src="/one_ok_rock.webp" className="w-full h-full" />
                    </div> */}

                    <Carousel
                        img1="/one_ok_rock.webp"
                    />

                    {/* Main content */}
                    <div className='flex justify-between w-auto bg-primary gap-10'>
                        
                        <div className='w-full flex flex-col pl-10'>
                            {/* Upcoming event corner */}
                            <div className='text-4xl font-semibold pt-10 pb-4 pl-2'>
                                Upcoming Event
                            </div>

                            <div className='flex flex-col h-screen gap-6 align-center overflow-auto no-scroll-bar'>
                                {generate_event_cards()}
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div className='text-4xl font-semibold pt-10 pb-4 pl-2'>
                                Ticket Sales
                            </div>
                            <div className="h-1/3 w-2/3 p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Purchases</h5>
                                    <a href="#" className="text-sm font-medium hover:underline dark:text-blue-400">
                                        View all
                                    </a>
                                </div>  
                                <div className="h-full flex flow-root overflow-auto no-scroll-bar">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {generate_purchases()}
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Home;
