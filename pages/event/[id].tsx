import type { NextPage } from 'next'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

const SeatSelect: NextPage = () => {
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [isCatSelected, setIsCatSelected] = useState(false)
     

    const toggleDateTime = () => {
        setIsDateSelected(prevState => !prevState)
    }
    const toggleCat = () => {
        setIsCatSelected(prevState => !prevState)
    }

    const RenderCat = () => {
        // code here
        return (
            <div className='flex flex-col gap-2 h-80'>
                <h1 className='text-3xl font-semibold text-secondary'>2) Select Category:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <p className='text-secondary text-lg '>Pick a category:</p>
                    <button onClick={toggleCat} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>cat 1</button>

                </div>
            </div>
    )}

    const RenderSeats = () => {
        // code here
        return (
            <div className='flex flex-col gap-2 h-80'>
                <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <p className='text-secondary text-lg '>Pick a seat:</p>
                    <button onClick={toggleCat} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>seat here hehe</button>

                </div>
            </div>
            )
    }

    return (
        <div className='flex flex-col p-14 h-full bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5'>
            <div className='flex flex-col gap-2 h-60'>
                <h1 className='text-3xl font-semibold text-secondary'>1) Select Event Date:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto '>
                    <p className='text-secondary text-lg'>Pick a date & time:</p>
                    <button onClick={toggleDateTime} className='text-primary bg-accent p-1 rounded-lg drop-shadow-md'>Date</button>
                    <fieldset>
                        <legend>Slots</legend>
                        <input 
                            type='radio'
                            id='dateTime'
                            onChange={toggleDateTime}
                        /><label htmlFor='dateTime'>{`${isCatSelected}`}</label>
                        {/* change the label */}
                        <br />
                    </fieldset>
                        
                    
                </div>
            </div>
            {isDateSelected && <RenderCat />}
            {isCatSelected && isDateSelected && <RenderSeats />}
        </div>
    )
}

export default SeatSelect