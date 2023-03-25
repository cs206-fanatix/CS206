import axios from 'axios'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import NotLogin from '../../../components/NotLogin'
import { useUserStore } from '../../../stores/user-store';

const CategorySelect: NextPage = () => {
    interface Event{
        id: number
        name: string
        artist: string
        imageUrl: string
        eventDateTime: string
        venue: string
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

    const RenderCatDiagram = () => {
        return (
            <div className='flex flex-col p-2 gap-5'>
                <div className='bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 1</p>
                    <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'> Stage </h1>
                    
                    <div className='grid grid-cols-3 gap-3'>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 1</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                    </div>
                </div>

                <div className='border border-secondary bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 2</p>
                    
                    <div className='grid grid-cols-5  gap-3'>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='row-start-1 row-end-3 text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <h1 className='col-span-3 text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'>Stage</h1>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + router.query.id + '/seat-selection')} className='col-span-5 text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                    </div>
                </div>
            </div>
        )
    }

    const RenderCategory = () => {
        return (
            <div className='flex flex-col gap-2 h-180 w-120'>
                <h1 className='text-3xl font-semibold text-secondary'>2) Select Category:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={() => Router.push('/event/' + router.query.id)} className='self-start text-secondary text-md 
                    bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg font-semibold'>Pick a category:</p>
                    <RenderCatDiagram />
                </div>
            </div>
    )}

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
                {/* TODO: some checks for KYC here */}
                <EventBanner
                    name={eventDetails.name}
                    imageUrl={eventDetails.imageUrl}
                    venue = {eventDetails.venue} 
                />
                {userStore.user?.hasCompletedKyc 
                    ? <RenderCategory /> 
                    : <NonVerified
                        eventId={String(eventDetails.id)} 
                        dateTime={eventDetails.eventDateTime} />}
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
export default CategorySelect

