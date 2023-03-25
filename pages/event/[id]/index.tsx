import axios from 'axios'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import NotLogin from '../../../components/NotLogin'
import { useUserStore } from '../../../stores/user-store';

const DateSelect: NextPage = () => {
    interface Ticket {
        id: string;
        level: number;
        category: number;
        seatNo: number;
        price: number;
        status: string;
        ownerId: string;
        eventId: string;
    }

    interface Event{
        id: number
        name: string
        artist: string
        imageUrl: string
        eventDateTime: string
        venue: string
        tickets: Array<Ticket>
    }


    const router = useRouter()
    const userStore = useUserStore()
    const [eventDetails, setEventDetails] = useState<Event>();
    const [HTTPStatus, setHTTPStatus] = useState<any>(null);
    
    useEffect(() => {
        if (userStore.user == null) {
            userStore.fetch()
        }
    }, [userStore.user])

    useEffect(() => {
        async function fetchEvent() {
            try {
                const result = await axios.get('/api/events/' + router.query.id);
                if (result.data == null){
                    setHTTPStatus(404)
                } else {
                    console.log(result.data)
                    setEventDetails(result.data);
                    setHTTPStatus(200)
                }
            } catch (error: any) {
                if (error.response.status === 404) {
                    setHTTPStatus(error.response.status)
                    console.log('Data not found');
                } else {
                    setHTTPStatus(error.response.status)
                    console.log('An error occurred', error);
                }
            }
        }
    
        fetchEvent();
    }, [router])


    // test objects
    const testEvent = {
        id: 1,
        name: "Aimer Live",
        artist: "Aimer",
        imageUrl: "/static/images/zankyosanka-banner.jpg",
        eventDateTime: '2023-02-21 6:00:00',
        venue: "Star Theatre",
    }
    

    const RenderDateButtons = ({eventDateTime}: { eventDateTime: Event["eventDateTime"] }) => {
        const dateTime = new Date(eventDateTime)
        const formattedDateTime = 
            `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()} 
            ${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}:${String(dateTime.getSeconds()).padStart(2, '0')}`

        return (
            <div className='flex gap-3 bg-secondary h-full p-4 rounded-lg drop-shadow m-1 justify-center'>
                <button onClick={() => Router.push('/event/' + router.query.id + '/category-selection')} className='bg-primary rounded-lg drop-shadow
                 hover:bg-accent/90 hover:text-primary m-2 p-2 h-10 w-70'> {`${formattedDateTime}`} </button>
            </div>
        )
    }

    const RenderDateTime = () => {
        const eventDate = eventDetails?.eventDateTime as string

        return (
            <div className='flex flex-col gap-2 h-120 max-w-4xl'>
                <h1 className='text-3xl font-semibold text-secondary '>1) Select Event Date:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                    rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={() => Router.push(`../event-details/${router.query.id}`)} className='self-start text-secondary text-md 
                        bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back
                    </button>
                    <p className='text-secondary text-lg font-semibold'>Pick an available date & time:</p>
                    <RenderDateButtons eventDateTime={eventDate} />
                </div>
            </div>
        )
    }

    if (userStore.user == null) {
        const eventId = router.query.id as string
        return (
            <div className="flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center">
                {/* TODO: change to static if josh doesnt wants static */}
                <NotLogin eventId={eventId} />
            </div>
        )
    }

    if (HTTPStatus != 200) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-120 max-w-4xl">
                <p className='text-red-500 text-xl font-semibold'>Error {HTTPStatus}</p>
                <p className='text-secondary text-lg font-semibold'>Something went wrong...</p>
            </div>
        )
    }
    
    if (eventDetails){
        return (
            <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
                
                <EventBanner
                    name={testEvent.name}
                    imageUrl={testEvent.imageUrl}
                    venue = {testEvent.venue} 
                />
                {userStore.user?.hasCompletedKyc 
                    ? <RenderDateTime />
                    : <NonVerified 
                        eventId={String(eventDetails.id)} 
                        dateTime={eventDetails.eventDateTime}/>}
                
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center gap-2 h-120 max-w-4xl">
            <div
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 text-accent border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"> 
                <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
            <p className='text-secondary text-lg font-semibold'>Loading</p>
        </div>
    )
}

export default DateSelect