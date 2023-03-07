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


const createEvent: NextPage = () => {
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
                    <div className="flex w-3/4 align-middle">                                                
                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Name" required/>
                                </div>
                                <div>
                                    <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Venue" required/>
                                </div>
                                <div>
                                    <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Date & Time</label>
                                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Date & Time" required/>
                                </div>  
                                <div>
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist Lineup</label>
                                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Artist Lineup" required/>
                                </div>
                                <div>
                                    <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotions & Discounts</label>
                                    <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Promotions & Discounts" required/>
                                </div>
                                <div>
                                    <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Image</label>
                                    <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Image" required/>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Tags</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Tags" required/>
                            </div> 
                            <div className="mb-6">
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social Media Links</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Social Media Links" required/>
                            </div> 
                            
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                                </div>
                                <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default createEvent;
