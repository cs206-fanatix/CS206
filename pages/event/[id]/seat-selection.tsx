import axios from 'axios'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router' 
import { useEffect, useState } from 'react'
import { Dropdown } from "@nextui-org/react";
import { ChevronDoubleUpIcon,ChevronDoubleDownIcon,ShoppingCartIcon } from '@heroicons/react/20/solid';

import EventBanner from '../../../components/EventBanner'
import NonVerified from '../../../components/NonVerified'
import { useUserStore } from '../../../stores/user-store';
import NotLogin from '../../../components/NotLogin';

const SeatSelect: NextPage = () => {

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
    const testTickets:Ticket[] = [{
        id: "8315b749-cbac-4a8e-8c27-5f3982834881",
        level: 1,
        category: 2,
        seatNo: 1,
        price: 160.5,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834882",
        level: 1,
        category: 2,
        seatNo: 2,
        price: 160,
        status: "sold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834838",
        level: 1,
        category: 2,
        seatNo: 3,
        price: 161,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982834688",
        level: 1,
        category: 2,
        seatNo: 4,
        price: 163.5,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3982534888",
        level: 1,
        category: 2,
        seatNo: 5,
        price: 160.5,
        status: "unsold",
        ownerId: "null",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3482834888",
        level: 1,
        category: 2,
        seatNo: 6,
        price: 170.5,
        status: "sold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },{
        id: "8315b749-cbac-4a8e-8c27-5f3482834188",
        level: 1,
        category: 2,
        seatNo: 7,
        price: 170.5,
        status: "unsold",
        ownerId: "78d14e9a-a891-4902-9850-4a2dc6e38e20",
        eventId: "2fa2b8ed-90ba-4f6d-9d1a-7f53ee4e240e"
    },
    ];
    
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

    const [cart, setCart] = useState<Ticket[]>([])

    const addToCart = ( newTicket: Ticket) => {
        setCart([...cart, newTicket])
    }
    const removeFromCart = ( ticketToRemove: Ticket) => {
        const newCart = cart.filter((ticket) => ticket != ticketToRemove)
        setCart(newCart)
    }

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
        console.log(cart.includes(props.ticket), cart, props.ticket )

        return (
            <>{isSold 
                ? <p className='bg-primary/40  text-secondary font-semibold rounded h-full w-full text-center'> Sold </p>
                : <Dropdown>
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
                                <p className='text-secondary h-5 overflow-y-hidden'> Owner: <b>{props.ticket.ownerId === 'null' ? 'Not owned' : props.ticket.ownerId}</b></p>
                            </Dropdown.Item>
                        </Dropdown.Section>
                        
                        <Dropdown.Item key="add to cart" withDivider>
                            {cart.length >= 4 
                                ? <p>Cart is full! For each event, you can only buy 4 tickets.</p>
                                : cart.some(ticketInCart => ticketInCart.id == props.ticket.id)
                                    ? <p>Added to cart.</p>
                                    :<button onClick={() => addToCart(testTickets[index])} className='text-primary font-bold w-full bg-accent/90 hover:bg-accent hover:text-secondary/70 rounded p-2'>Add to Cart</button> 
                                
                                }
                            
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
    

    // useeffect for change in cart
    const RenderCartItems = () => {
        let count = 1;
        let itemArray = cart.map((ticket: Ticket) => {
            return (
                <div key={count} className='flex bg-primary rounded-lg drop-shadow
                 m-2 p-2 h-15 w-90 justify-between items-center'>
                    <p className='px-2'><b className='text-base'>{count++}.</b></p>
                    <div>
                        <p className='text-base'>Seat Number: <b>{ticket.seatNo}</b> </p>
                        <p className='text-base'>Price: <b>${ticket.price}</b> </p>
                    </div>
                    <button onClick={() => removeFromCart(ticket)} className='bg-accent hover:bg-accent/90 text-primary hover:text-secondary/90 px-2 w-20 h-10 rounded font-semibold text-center'>Remove</button>
                </div>
            )
        })
        return <>{itemArray}</>
    }

    const RenderCartTable = () => {
        const formatPrice = (price: number) => {
            return new Intl.NumberFormat('en-SG', {
                style: 'currency',
                currency: 'SGD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(price);
        }

        return (
            <div className='flex flex-col p-2 gap-3'>
                <div className='bg-secondary p-3 rounded'>
                    <div className='flex items-center'>
                        <ShoppingCartIcon className='h-5 w-5 m-2 text-accent'/>
                        <h1 className='text-left text-lg p-2 bg-secondary/70 text-primary my-1 drop-shadow-sm font-semibold'>Cart: </h1>
                    </div>
                    <h1 className='text-left p-2 bg-secondary/70 text-primary my-1 drop-shadow-sm font-semibold'>Total cost: 
                        <h1 className='bg-primary text-secondary text-right font-bold rounded px-2 py-0.5 m-2'>{formatPrice(cart.reduce((partialSum, individualTicket) => partialSum + individualTicket.price, 0))} </h1> 
                    </h1>
                    <div className='flex flex-col bg-primary/90 h-72 gap-1 align-center overflow-auto p-3 rounded'>
                        {cart.length > 0 ? <RenderCartItems /> : <p className='font-bold text-center'>Cart is empty</p>}
                    </div>
                </div>
            </div>
        )
    }

    const RenderSeats = () => {
        return (
            <div className='flex flex-col gap-2 h-240 w-120'>
                <h1 className='text-3xl font-semibold text-secondary'>3) Select Seat:</h1>
                <div className='flex flex-col bg-primary h-full py-2 px-3 
                        rounded-lg drop-shadow-md gap-3 min-h-min overflow-y-auto'>
                    <button onClick={() => Router.push('/event/' + router.query.id + '/category-selection')} className='self-start text-secondary text-md 
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
                    name={testEvent.name}
                    imageUrl={testEvent.imageUrl}
                    venue = {testEvent.venue} 
                />
                {userStore.user?.hasCompletedKyc 
                    ? <RenderSeats /> 
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

export default SeatSelect

