import type { NextPage } from 'next'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const SeatSelect: NextPage = () => {
    const [step, setStep] = useState(1)
    
    // test objects
    const testEventDates = {
        dates:['23rd Feb 23 6:00pm','24th Feb 23 7:00pm','25th Feb 23 7:00pm'],
        cat:[]
    }

    const nextStep = () => {
        setStep(prevStep => prevStep === 3 ? 3 : prevStep += 1 )
    }
    const previousStep = () => {
        setStep(prevStep => prevStep === 1 ? 1 : prevStep -= 1)
    }

    const RenderDateButtons = ({Dates}) => {
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

    const RenderDateTime = () => {
        return (
            <div className='flex flex-col gap-2 h-72'>
                <h1 className='text-3xl font-semibold text-secondary'>1) Select Event Date:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto '>
                    <button onClick={previousStep} className='self-start text-secondary text-lg 
                    bg-primary p-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg '>Pick a date & time:</p>
                    {console.log(testEventDates.dates)}
                    
                    <RenderDateButtons Dates={testEventDates.dates}/>
                    {/* change the label */}
                        

                    
                </div>
            </div>
        )
    }

    const RenderCat = () => {
        return (
            <div className='flex flex-col gap-2 h-80'>
                <h1 className='text-3xl font-semibold text-secondary'>2) Select Category:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={previousStep} className='self-start text-secondary text-lg 
                    bg-primary p-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg '>Pick a category:</p>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 1</button>

                </div>
            </div>
    )}

    const RenderSeats = () => {
        return (
            <div className='flex flex-col gap-2 h-80'>
                <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={previousStep} className='self-start text-secondary text-lg 
                    bg-primary p-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back</button>
                    <p className='text-secondary text-lg '>Pick a seat:</p>
                    <button onClick={nextStep} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>seat here hehe</button>

                </div>
            </div>
            )
    }

    return (
        <div className='flex flex-col p-14 h- pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5'>
            
            {step === 1 && <RenderDateTime />}
            {step === 2 && <RenderCat />}
            {step === 3 && <RenderSeats />}
        </div>
    )
}

export default SeatSelect