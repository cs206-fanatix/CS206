import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import { useUserStore } from '../../../stores/user-store';

const DateSelect: NextPage = () => {
    const router = useRouter()
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
    const testTickets = [{
        id: 1,
        title: 'Aimer Live',
        artist: 'Aimer',
        imageURL: '/static/images/bp.jpg',
        dateTime: '9/3/2023',
        venue: 'Singapore indoor stadium',
    },{
        id: 2,
        title: 'Aimer Live',
        artist: 'Aimer',
        imageURL: '/static/images/bp.jpg',
        dateTime: '9/3/2023',
        venue: 'Singapore indoor stadium',
    },{
        id: 3,
        title: 'Aimer Live',
        artist: 'Aimer',
        imageURL: '/static/images/bp.jpg',
        dateTime: '9/3/2023',
        venue: 'Singapore indoor stadium',
    },{
        id: 4,
        title: 'Aimer Live',
        artist: 'Aimer',
        imageURL: '/static/images/bp.jpg',
        dateTime: '9/3/2023',
        venue: 'Singapore indoor stadium',
    },{
        id: 5,
        title: 'Aimer Live',
        artist: 'Aimer',
        imageURL: '/static/images/bp.jpg',
        dateTime: '9/3/2023',
        venue: 'Singapore indoor stadium',
    },
    ];
    const current = new Date()
    
    type Event = {
        dates: string[],
        cat: any[];
    }
    

    const RenderDateButtons = ({Dates}: { Dates: Event["dates"] }) => {
        
        let dateArray = Dates.map((date, index) => {
            return (
                <button key={index} onClick={() => Router.push('/event/' + testEvent.id + '/category-selection')} className='bg-primary rounded-lg drop-shadow
                 hover:bg-accent/90 hover:text-primary m-2 p-2 h-10 w-40'>{`${date}`}</button>
            )
        })
        
        return (
            <div className='gap-3 bg-secondary h-full p-2 rounded-lg drop-shadow m-1 '>{dateArray}</div>
        )
    }

    const RenderDateTime = () => {
        return (
            <div className='flex flex-col gap-2 h-72 max-w-4xl'>
                <h1 className='text-3xl font-semibold text-secondary '>1) Select Event Date:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                    rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={() => Router.push(`event-details/${testEvent.id}`)} className='self-start text-secondary text-md 
                        bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back
                    </button>
                    <p className='text-secondary text-lg font-semibold'>Pick a date & time:</p>
                    <RenderDateButtons Dates={testEvent.dateTime} />
                </div>
            </div>
        )
    }

    // const RenderSeats = () => {
    //     return (
    //         <div className='flex flex-col gap-2 h-120 w-120'>
    //             <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
    //             <div className='flex flex-col bg-primary h-full py-2 px-3
    //             rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
    //                 <button onClick={previousStep} className='self-start text-secondary text-md 
    //                 bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
    //                 <p className='text-secondary text-lg font-semibold'>Pick a seat:</p>
    //                 <RenderSeatDiagram />
    //             </div>
    //         </div>
    //         )
    // }

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
            ? <RenderDateTime />
            // ? <SelectionPage /> 
            : <NonVerified />}
            
        </div>
    )
}

export default DateSelect