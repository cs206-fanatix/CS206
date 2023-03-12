import type { NextPage } from 'next'
import Image from "next/image";
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const SeatSelect: NextPage = () => {
    const [step, setStep] = useState(1)
    
    // test objects
    const testEvent = {
        id: 1,
        title: "Aimer Live",
        artist: "Aimer",
        imageUrl: "/static/images/zankyosanka-banner.jpg",
        dateTime: ['2023-02-21 6:00:00','2023-02-22 6:00:00','2023-02-23 6:00:00'],
        venue: "Star Theatre",
        cat: {
            1: ["A1", "E12"],
            2: ["F1", "J12"],
            3: ["K1", "O12"]
        }
    }
    const tickets = [{
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

    const nextStep = () => {
        setStep(prevStep => prevStep === 3 ? 3 : prevStep += 1 )
    }
    const previousStep = () => {
        setStep(prevStep => prevStep === 1 ? 1 : prevStep -= 1)
    }
    
    type Event = {
        dates: string[],
        cat: any[];
    }
    
    function EventBanner() {
        return <div className='bg-black overflow-hidden rounded-lg drop-shadow-md w-full min-w-fit  '>
            <div className=''>
                <Image src={testEvent.imageUrl} alt="Banner" layout='fill' objectFit='cover'
                    className='absolute opacity-50' />
            </div>
            <div className='p-2'>
                <h1 className='text-3xl text-primary relative m-3 font-semibold'>{testEvent.title}</h1>
                <h2 className='text-xl text-primary relative m-3 font-light'>{testEvent.venue}</h2>
            </div>
        </div>;
    }

    const RenderDateButtons = ({Dates}: { Dates: Event["dates"] }) => {
        console.log(Dates)
        let dateArray = Dates.map((date, index) => {
            return (
                <button key={index} onClick={nextStep} className='bg-primary p-2 rounded-lg drop-shadow
                 hover:bg-accent/90 hover:text-primary m-2 h-10 w-40'>{`${date}`}</button>
            )
        })
        
        return (
            <div className='gap-3 bg-secondary h-full p-2 rounded-lg drop-shadow m-1'>{dateArray}</div>
        )
    }
    
    // const RenderDateTime = () => {
    //     return (
    //         <div className='flex flex-col gap-2 h-72'>
    //             <h1 className='text-3xl font-semibold text-secondary'>1) Select Event Date:</h1>
    //             <div className='flex flex-col bg-primary h-full py-2 px-3 
    //             rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto '>
    //                 <button onClick={previousStep} className='self-start text-secondary text-lg 
    //                 bg-primary p-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
    //                 <p className='text-secondary text-lg '>Pick a date & time:</p>
    //                 {console.log(testEventDates.dates)}
                    
    //                 <RenderDateButtons Dates={testEventDates.dates}/>
    //                 {/* change the label */}
                        

                    
    //             </div>
    //         </div>
    //     )
    // }

    const RenderDateTime = () => {
        return (
            <div className='flex flex-col gap-2 h-72 max-w-4xl'>
                <h1 className='text-3xl font-semibold text-secondary '>1) Select Event Date:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                    rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <p className='text-secondary text-lg font-semibold'>Pick a date & time:</p>
                    <RenderDateButtons Dates={testEvent.dateTime} />
                </div>
            </div>
        )
    }

    const RenderCatDiagram = () => {
        return (
            <div className='flex flex-col p-2 w-120 gap-5'>
                <div className='border border-secondary bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 1</p>
                    <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'> Stage </h1>
                    
                    <div className='grid grid-cols-3 gap-3'>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 1</button>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                    </div>
                </div>

                <div className='border border-secondary bg-secondary p-3 rounded'>
                    <p className='text-accent text-lg  text-center font-semibold'>Level 2</p>
                    
                    <div className='grid grid-cols-5  gap-3'>
                        <button onClick={nextStep} className='row-start-1 row-end-3 text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <h1 className='col-span-3 text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'>Stage</h1>
                        <button onClick={nextStep} className='text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 3</button>
                        <button onClick={nextStep} className='col-span-3 text-secondary font-medium text-md bg-primary hover:bg-accent hover:text-primary p-1 h-20 rounded-lg drop-shadow-md'>cat 2</button>
                    </div>
                </div>
            </div>
        )
    }

    const RenderCat = () => {
        return (
            <div className='flex flex-col gap-2 h-180'>
                <h1 className='text-3xl font-semibold text-secondary'>2) Select Category:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={previousStep} className='self-start text-secondary text-md 
                    bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg font-semibold'>Pick a category:</p>
                    <RenderCatDiagram />
                </div>
            </div>
    )}

    const RenderSeatDiagram = () => {
        return (
            <div className='flex-col p-2 '>
                
                <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'> Stage </h1>
                <div className='grid grid-cols-3 gap-3'>
                    <button onClick={nextStep} className='text-secondary hover:bg-accent p-1 rounded-lg drop-shadow-lg'>cat 1</button>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 1</button>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 1</button>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 3</button>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 2</button>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 3</button>
                </div>
            </div>
        )
    }

    const RenderSeats = () => {
        return (
            <div className='flex flex-col gap-2 h-180 max-w-4xl'>
                <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={previousStep} className='self-start text-secondary text-md 
                    bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg font-semibold'>Pick a seat:</p>
                    <RenderSeatDiagram />
                </div>
            </div>
            )
    }

    return (
        <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
            {/* TODO: some checks for KYC here */}
            {EventBanner()}
            {step === 1 && <RenderDateTime />}
            {step === 2 && <RenderCat />}
            {step === 3 && <RenderSeats />}
        </div>
    )
}

export default SeatSelect