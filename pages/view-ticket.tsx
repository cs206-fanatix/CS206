import type { NextPage } from 'next'
import { useState } from 'react'
import Image from "next/image";
import EventCard from '../components/EventCard';
import data from "../pages/event"

const viewTicket: NextPage = () => {
    const cards = data.map(item => {
        return (
            <EventCard
                key={item.id}
                id={item.id}
                event_name={item.title}
                artist = {item.artist}
                event_start_date={item.dateTime}
                image={item.imageURL}
            />
        )
    })

    return (
        <div className='flex flex-col h-screen w-full bg-primary'>
            <div className='flex ml-40 mt-5 p-2 bg-secondary w-max rounded-lg'>
                <Image src="/static/images/profile.png" width={150} height={150} className="rounded-full"></Image>
                <div className='flex mt-3 gap-2'>
                    <div className='flex rounded-lg bg-primary w-40 h-7 p-2 items-center'>
                        <h3 className='text-secondary'>Total tickets</h3>
                        <p className='text-secondary ml-auto'>{data.length}</p>
                    </div>
                    <div className='flex rounded-lg bg-primary w-40 h-7 p-2 items-center'>
                        <h3 className='text-secondary'>Listed Tickets</h3>
                        <p className='text-secondary ml-auto'>0</p>
                    </div>
                </div>
            </div>
            <hr className='h-0.5 w-10/12 mx-auto my-3 bg-gray-300'></hr>
            <div className='flex gap-3 ml-40 flex-wrap'>
                {cards}
            </div>
        </div>
    )
}

export default viewTicket