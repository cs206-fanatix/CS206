import type { NextPage } from 'next'
import Router from 'next/router' 
import { useEffect, useState } from 'react'
import { Dropdown } from "@nextui-org/react";
import { ChevronDoubleUpIcon,ChevronDoubleDownIcon } from '@heroicons/react/20/solid';

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import { useUserStore } from '../../../stores/user-store';

const SeatSelect: NextPage = () => {
    const userStore = useUserStore()
    
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

    // test objects
    const testEvent = {
        id: 1,
        name: "Aimer Live",
        artist: "Aimer",
        imageUrl: "/static/images/zankyosanka-banner.jpg",
        eventDateTime: ['2023-02-21 6:00:00','2023-02-22 6:00:00','2023-02-23 6:00:00'],
        venue: "Star Theatre",
        tickets: [],
    }
    const testUser = {
        email: 'SolGod99',
        hasKYC: true
    }
    const testTickets:Ticket[] = [{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 1,
        price: 160.5,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 2,
        price: 160,
        status: "sold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 3,
        price: 161,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 4,
        price: 163.5,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 5,
        price: 160.5,
        status: "unsold",
        ownerId: "null",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834888",
        level: 1,
        category: 2,
        seatNo: 6,
        price: 170.5,
        status: "sold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },
    ];

    interface SeatButtonProps {
        key: number
        count: number
        ticket: Ticket
    };
    
    const SeatButton = (props: SeatButtonProps) => {
        const index = props.count
        let isSold = false
        if (props.ticket.status == 'sold'){
            isSold = true
        }

        return (
            <>{
                isSold ?
                <p className='bg-primary/40  text-secondary font-semibold rounded h-full w-full text-center'> sold </p>
                : 
                <Dropdown>
                    <Dropdown.Trigger><button className='bg-primary hover:bg-accent text-secondary hover:text-primary font-semibold rounded h-full w-full'> {testTickets[index].seatNo} </button></Dropdown.Trigger>
                    <Dropdown.Menu disabledKeys={["level","cat","seat","price","status","owner", "add to cart"]} aria-label="Seat Details">
                        <Dropdown.Section title="Seat Details">
                            <Dropdown.Item key="level" withDivider>
                                <p className='text-secondary h-5'> Level: <b>{props.ticket.level}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="cat">
                                <p className='text-secondary h-5'> Category: <b>{props.ticket.category}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="seat">
                                <p className='text-secondary h-5'> Seat No.: <b>{props.ticket.seatNo}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="price">
                                <p className='text-secondary h-5'> Price: <b>S${props.ticket.price}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="status">
                                <p className='text-secondary h-5'> Status: <b>{props.ticket.status}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="owner">
                                <p className='text-secondary h-5 overflow-y-hidden'> Owner: <b>{props.ticket.ownerId}</b></p>
                            </Dropdown.Item>
                        </Dropdown.Section>
                        
                        <Dropdown.Item key="add to cart" color="error" withDivider>
                                {/* onclick add to cart */}
                            <button onClick={() => addToCart(testTickets[index])} className='text-primary font-bold w-full bg-accent/90 hover:bg-accent hover:text-secondary/70 rounded p-2'>Add to Cart</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }</>
        )
    }

    const RenderSeatDiagram = () => {
        let count = 0;
        let seatArray = testTickets.map((ticket) => {
            return (
                <SeatButton key={count++} count={count} ticket={ticket} />
            )
        })
        return (
            <div className='flex flex-col p-2 gap-5'>
                <div className='bg-secondary p-3 rounded'>
                    <div className='flex justify-around'>
                        <ChevronDoubleUpIcon className='h-5 w-5 text-accent'/>
                        <ChevronDoubleUpIcon className='h-5 w-5 text-accent'/>
                        <ChevronDoubleUpIcon className='h-5 w-5 text-accent'/>
                    </div>
                    <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'>Towards Stage </h1>
                    
                    <div className='grid grid-cols-5 gap-3 '>
                        {seatArray}
                    </div>
                    <h1 className='text-center p-2 bg-secondary/70 text-primary my-4 drop-shadow-sm font-semibold'>Towards Exit </h1>
                    <div className='flex justify-around'>
                        <ChevronDoubleDownIcon className='h-5 w-5 text-accent'/>
                        <ChevronDoubleDownIcon className='h-5 w-5 text-accent'/>
                        <ChevronDoubleDownIcon className='h-5 w-5 text-accent'/>
                    </div>
                </div>
            </div>
        )
    }
    
    const [cart, setCart] = useState<Ticket[]>([])

    const addToCart = ( newTicket: Ticket) => {
        setCart([...cart, newTicket])
    }
    const removeFromCart = ( ticketToRemove: Ticket) => {
        const newCart = cart.filter((ticket) => ticket != ticketToRemove)
        setCart(newCart)
    }

    // useeffect for change in cart
    const RenderCartItems = () => {
        let count = 1;
        let itemArray = cart.map((ticket: Ticket) => {
            return (
                <div key={count} className='flex bg-primary rounded-lg drop-shadow
                 m-2 p-2 h-15 w-90 justify-around content-end'>
                    <p className='px-2'><b className='text-base'>{count++}.</b></p>
                    <p className='text-base'>Seat Number: <b>{ticket.seatNo}</b> </p>
                    <button onClick={() => removeFromCart(ticket)} className='bg-accent hover:bg-accent/90 text-primary hover:text-secondary/90 px-2 rounded font-semibold text-center'>Remove from cart</button>
                </div>
            )
        })
        // console.log(count)
        return <>{itemArray}</>
    }

    const RenderCartTable = () => {
        
        return (
            <div className='flex flex-col p-2 gap-3'>
                <div className='bg-secondary p-3 rounded'>
                    <h1 className='text-left p-2 bg-secondary/70 text-primary my-1 drop-shadow-sm font-semibold'>Cart: </h1>
                    <div className='flex flex-col bg-primary/90 h-72 gap-1 align-center overflow-auto p-3 rounded'>
                        {cart.length > 0 ? <RenderCartItems /> : <p className='font-bold text-center'>Cart is empty</p>}
                    </div>
                </div>
            </div>
        )
    }

    const RenderSeats = () => {
        return (
            <div className='flex flex-col gap-2 h-220 w-120'>
                <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                        rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={() => Router.push('/event/' + testEvent.id + '/category-selection')} className='self-start text-secondary text-md 
                        bg-primary px-4 py-2 rounded-lg drop-shadow hover:bg-accent/90 hover:text-primary'>&lt; Back
                    </button>
                    <p className='text-secondary text-lg font-semibold'>Pick a category:</p>
                    <RenderSeatDiagram />
                    <RenderCartTable />
                    {/* TODO: payment page after button click*/}
                    <button onClick={() => Router.push('/')} className='text-primary font-bold w-full bg-accent/90 hover:bg-accent hover:text-secondary/70 rounded p-2'>Checkout</button>
                </div>
            </div>
    )}

    useEffect(() => {
        userStore.fetch()
    }, [])

    return (
        <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
            {/* TODO: some checks for KYC here */}
            <EventBanner
                name={testEvent.name}
                imageUrl={testEvent.imageUrl}
                venue = {testEvent.venue} 
            />
            {testUser.hasKYC 
                ? <RenderSeats /> 
                : <NonVerified 
                    eventId={String(testEvent.id)} 
                    dateTime={testEvent.eventDateTime[0]} />}
            
        </div>
    )
} 

export default SeatSelect

