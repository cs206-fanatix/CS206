import type { NextPage } from 'next'
import Router from 'next/router' 
import { useEffect } from 'react'

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import { useUserStore } from '../../../stores/user-store';

const CategorySelect: NextPage = () => {
    const userStore = useUserStore()
    // test objects
    const testEvent = {
        id: 1,
        title: "Aimer Live",
        artist: "Aimer",
        imageUrl: "/static/images/zankyosanka-banner.jpg",
        dateTime: ['2023-02-21 6:00:00','2023-02-22 6:00:00','2023-02-23 6:00:00'],
        venue: "Star Theatre",
    }
    const testUser = {
        email: 'SolGod99',
        hasKYC: true
    }
    const current = new Date()

    const RenderCatDiagram = () => {
        return (
            <div className='flex flex-col p-2 gap-5'>
                <div className='border border-secondary bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 1</p>
                    <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'> Stage </h1>
                    
                    <div className='grid grid-cols-3 gap-3'>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 1</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                    </div>
                </div>

                <div className='border border-secondary bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 2</p>
                    
                    <div className='grid grid-cols-5  gap-3'>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='row-start-1 row-end-3 text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <h1 className='col-span-3 text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'>Stage</h1>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='text-secondary font-medium text-md bg-primary hover:bg-green-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={() => Router.push('/event/' + testEvent.id + '/seat-selection')} className='col-span-5 text-secondary font-medium text-md bg-primary hover:bg-blue-500 hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
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
                    <button onClick={() => Router.push('/event/' + testEvent.id)} className='self-start text-secondary text-md 
                    bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg font-semibold'>Pick a category:</p>
                    <RenderCatDiagram />
                </div>
            </div>
    )}
    
    useEffect(() => {
        userStore.fetch()
    }, [userStore])

    return (
        <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
            {/* TODO: some checks for KYC here */}
            <EventBanner
                title={testEvent.title}
                imageUrl={testEvent.imageUrl}
                venue = {testEvent.venue} 
            />
            {testUser.hasKYC 
            ? <RenderCategory /> 
            : <NonVerified />}
        </div>
    )
} 
export default CategorySelect

