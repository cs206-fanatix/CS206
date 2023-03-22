import type { NextPage } from 'next'
import Link from "next/link"
import { useEffect } from 'react'


interface props {
    current: Date;
    dateTime: Array<string>;
}

const EarlyAccess: NextPage = () => {
    const testEvent = {
        id: 1,
        name: "Aimer Live",
        artist: "Aimer",
        imageUrl: "/static/images/zankyosanka-banner.jpg",
        eventDateTime: ['2023-02-21 6:00:00','2023-02-22 6:00:00','2023-02-23 6:00:00'],
        venue: "Star Theatre",
    }
    const currentDate = new Date()
    return (
        <div className='flex flex-col bg-primary h-60 w-120 py-2 px-3
            rounded-lg drop-shadow-md gap-3 justify-between min-h-min overflow-y-auto'>
            <div className='p-6 text-center'>
                <svg aria-hidden="true" className="mx-auto mb-4 text-accent w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>The buying of tickets starts at: <b>{testEvent.eventDateTime[0]}</b> </p>
                <p>The current date time is: <b>{currentDate.getFullYear()}-{currentDate.getMonth()+1}-{currentDate.getDate()} {String(currentDate.getHours()).padStart(2, '0')}:{currentDate.getMinutes()}:{currentDate.getSeconds()}</b> </p>
                <h3 className='mb-5 text-lg font-normal text-accent dark:text-primary'>You have to be verified to get early access.</h3>
                
                <Link href="#">
                    <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">Verify now</a>
                </Link>
                <Link href={`../pages/event-details/${testEvent.id}`}>
                    <a className="text-semibold text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-md">Go back</a>
                </Link>
            </div>
        </div>
    )
}

export default EarlyAccess