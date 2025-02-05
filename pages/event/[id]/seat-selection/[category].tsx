import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router' 
import { useEffect, useState } from 'react'
import { Dropdown } from "@nextui-org/react";
import { ChevronDoubleUpIcon,ChevronDoubleDownIcon,ShoppingCartIcon } from '@heroicons/react/20/solid';
import { CheckCircleTwoTone, FrownTwoTone } from '@ant-design/icons';
import EventBanner from '../../../../components/EventBanner'
import NonVerified from '../../../../components/NonVerified'
import { useUserStore } from '../../../../stores/user-store';
import NotLogin from '../../../../components/NotLogin';
import Link from 'next/link';
import { checkout } from "../../../../checkout"

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

    function SeatNoCompare( a : Ticket, b : Ticket ) {
        if ( a.seatNo < b.seatNo ){
          return -1;
        }
        if ( a.seatNo > b.seatNo ){
          return 1;
        }
        return 0;
    }
    eventDetails?.tickets.sort(SeatNoCompare)

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
        ticket: Ticket
    };
    
    const SeatButton = (props: SeatButtonProps) => {
        let isSold = false
        if (props.ticket.status == 'sold'){
            isSold = true
        }
        
        return (
            <>{isSold 
                ? <p className='bg-primary/40  text-secondary font-semibold rounded h-full w-full text-center'> Sold </p>
                : <Dropdown>
                    <Dropdown.Trigger><button className='bg-primary hover:bg-accent text-secondary hover:text-primary font-semibold rounded h-full w-full'> {props.ticket.seatNo} </button></Dropdown.Trigger>
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
                                <p className='text-secondary h-5'> Status: <b>{props.ticket.status.charAt(0).toUpperCase() + props.ticket.status.slice(1)}</b></p>
                            </Dropdown.Item>
                            <Dropdown.Item key="owner">
                                <p className='text-secondary h-5 overflow-y-hidden'> Owner: <b>{props.ticket.ownerId == null ? 'Not owned' : props.ticket.ownerId}</b></p>
                            </Dropdown.Item>
                        </Dropdown.Section>
                        
                        <Dropdown.Item key="add to cart" withDivider>
                            {(cart.length + boughtTickets.length) >= 4 
                                ? <p>You have hit the limit! For each event, you can only buy 4 tickets.</p>
                                : cart.some(ticketInCart => ticketInCart.id == props.ticket.id)
                                    ? <p>Added to cart.</p>
                                    :<button onClick={() => addToCart(props.ticket)} className='text-primary font-bold w-full bg-accent/90 hover:bg-accent hover:text-secondary/70 rounded p-2'>Add to Cart</button> 
                                
                                }
                            
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }</>
        )
    }

    const RenderSeatDiagram = () => {
        const currentCategory = parseInt(router.query.category as string, 10)
        
        const catN = eventDetails?.tickets.filter((ticket) => {
            return ticket.category == currentCategory
        }) as Array<Ticket>

        let count = 0;
        let seatArray = catN.map((ticket) => {
            return (
                <SeatButton key={count++} ticket={ticket} />
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
    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const [failedPurchases, setfailedPurchases] = useState<Ticket[]>([])
    const [completedPurchases, setCompletedPurchases] = useState<Ticket[]>([])
    const handleCheckout = async () => {
        const checkoutIndividual = async (ticketId: string, isUnsold: boolean) => {
            try {
                let response;
                if (isUnsold) {
                    response = await axios.post(`/api/tickets/${ticketId}/purchase`, {
                        ownerId: userStore.user?.id
                    });
                } else {
                    response = await axios.post(`/api/tickets/${ticketId}/transfer`, {
                        newOwnerId: userStore.user?.id
                    });
                }
                
                if (response.status === 200) {
                    const matchedTicket = cart.find(item => item.id == ticketId) as Ticket
                    setCompletedPurchases([...completedPurchases, matchedTicket])
                } else {
                    const matchedTicket = cart.find(item => item.id == ticketId) as Ticket
                    setfailedPurchases([...failedPurchases, matchedTicket])
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (cart.length == 0){
            return
        }
        cart.forEach((ticket) => {
            checkoutIndividual(ticket.id, ticket.status == 'unsold')
        })
        checkout()
        //setIsCheckedOut(!isCheckedOut)
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
                    <p className='text-secondary text-lg font-semibold'>Pick a seat:</p>
                    <RenderSeatDiagram />
                    <RenderCartTable />
                    {cart.length === 0
                        ? <p className='text-secondary text-center font-bold w-full bg-secondary/50  rounded p-2'>Checkout</p>
                        : <button onClick={() => handleCheckout()} className='text-primary font-bold w-full bg-accent/90 hover:bg-accent hover:text-secondary/70 rounded p-2'>Checkout</button>
                    }
                </div>
            </div>
    )}

    if (userStore.user == null) {
        const eventId = router.query.id as string
        return (
            <div className="flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center">
                
                <NotLogin 
                    loginLink="../../../login"
                    signupLink="../../../signup" 
                    backLink={`../../../event-details/${eventId}`}
                />
            </div>
        )
    }

    if (HTTPStatus != 200 && HTTPStatus != null && !eventDetails) {
        console.log(eventDetails)
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-120 max-w-4xl">
                <p className='text-red-500 text-xl font-semibold'>Error {HTTPStatus}</p>
                <p className='text-secondary text-lg font-semibold'>Something went wrong... Try refreshing</p>
            </div>
        )
    }

    if (isCheckedOut){
        
        if (failedPurchases.length != 0){
            return (
                <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
                <div className='flex flex-col bg-primary h-60 w-120 py-2 px-3
                    rounded-lg drop-shadow-md gap-3 justify-between min-h-min overflow-y-auto'>
                    <div className='p-6 text-center'>
                        <FrownTwoTone twoToneColor="#e01414" style={{ fontSize: '52px' }}/>
                        <h3 className='mb-5 text-lg font-normal text-accent my-5'>Purchase failed</h3>
                        
                        <Link href="../../../view-ticket">
                            <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">View Tickets</a>
                        </Link>
                        <Link href='.'>
                            <a className="text-semibold text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-md">Back</a>
                        </Link>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className='flex flex-col p-14 pt-24 bg-gradient-to-b from-primary via-secondary/20 to-primary gap-5 items-center'>
                <div className='flex flex-col bg-primary h-60 w-120 py-2 px-3
                    rounded-lg drop-shadow-md gap-3 justify-between min-h-min overflow-y-auto'>
                    <div className='p-6 text-center'>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '52px' }}/>
                        <h3 className='mb-5 text-lg font-normal text-accent my-5'>Purchase completed</h3>
                        
                        <Link href="../../../view-ticket">
                            <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">View Tickets</a>
                        </Link>
                        <Link href='../../../'>
                            <a className="text-semibold text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-md">Home</a>
                        </Link>
                    </div>
                </div>
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
                        <svg aria-hidden="true" className="mx-auto mb-4 text-accent w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className='mb-5 text-lg font-normal text-accent my-5'>You have reached the maximum amount of tickets one can buy</h3>
                        
                        <Link href="../../../view-ticket">
                            <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">View Tickets</a>
                        </Link>
                        <Link href='../../../'>
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
                    ? <RenderSeats /> 
                    : <NonVerified 
                        dateTime={eventDetails.eventDateTime}
                        kycLink="../../../kyc"
                        backLink={`../../../event-details/${eventDetails.id}`} />}
                
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

