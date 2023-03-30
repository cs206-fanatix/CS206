import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import NotLogin from '../../../components/NotLogin'
import { useUserStore } from '../../../stores/user-store';
import { format } from "date-fns";

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
    const [boughtTickets, setBoughtTickets] = useState<Ticket[]>([])
    
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

    const RenderDateButtons = ({eventDateTime}: { eventDateTime: Event["eventDateTime"] }) => {
        const dateTime = new Date(eventDateTime)
        const formattedDateTime = format(new Date(dateTime), "dd/MM/yyyy kk:mm (EEE)");
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
                
                <NotLogin 
                    loginLink="../../login"
                    signupLink="../../signup" 
                    backLink={`../../event-details/${eventId}`}
                />
            </div>
        )
    }

    if (HTTPStatus != 200 && HTTPStatus != null) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-120 max-w-4xl">
                <p className='text-red-500 text-xl font-semibold'>Error {HTTPStatus}</p>
                <p className='text-secondary text-lg font-semibold'>Something went wrong... Try refreshing</p>
            </div>
        )
    }
    
    eventDetails?.tickets.forEach((ticket) => {
        if (ticket.ownerId == userStore.user?.id && !boughtTickets.includes(ticket)){
            setBoughtTickets([...boughtTickets, ticket])
        }
    })
    
    if (boughtTickets.length >= 4){
        return (
            <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
                <div className='flex flex-col bg-primary h-60 w-120 py-2 px-3
                    rounded-lg drop-shadow-md gap-3 justify-between min-h-min overflow-y-auto'>
                    <div className='p-6 text-center'>
                        <svg aria-hidden="true" className="mx-auto mb-4 text-accent w-14 h-14 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className='mb-5 text-lg font-normal text-accent  my-5'>You have reached the maximum amount of tickets one can buy</h3>
                        
                        <Link href="../../view-ticket">
                            <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">View Tickets</a>
                        </Link>
                        <Link href='../../'>
                            <a className="text-semibold text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-md">Home</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    
    if (eventDetails){
        return (
            <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
                
                <EventBanner
                    name={eventDetails.name}
                    imageUrl={eventDetails.imageUrl}
                    venue = {eventDetails.venue} 
                />
                {userStore.user?.hasCompletedKyc 
                    ? <RenderDateTime />
                    : <NonVerified 
                        dateTime={eventDetails.eventDateTime}
                        kycLink="../kyc"
                        backLink={`../event-details/${eventDetails.id}`} />}
                
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