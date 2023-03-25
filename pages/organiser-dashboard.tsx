import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Event_Card from '../components/Organiser-Dashboard/Event_Card'
import Purchases from '../components/Organiser-Dashboard/Purchases'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useUserStore } from "../stores/user-store";
import Image from 'next/image'
import RevenueChart from '../components/Organiser-Dashboard/RevenueChart'
import { LikeOutlined } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, theme } from 'antd';
import { Col, Radio, Row, Select, Typography, Statistic} from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { size } from 'lodash-es'
import Paragraph from 'antd/lib/skeleton/Paragraph'
import axios from 'axios'

interface UserItem {
    email: string;
    gender: string;
    name: {
      first: string;
      last: string;
      title: string;
    };
    nat: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
}

const fakeDataUrl ='https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;


dayjs.extend(dayLocaleData);
const Home: NextPage = () => {
    const router = useRouter();
    const userStore = useUserStore();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const [allEvents, setAllEvents] = useState<any[]>([])

    useEffect(() => {	
		userStore.fetch();
        if (userStore.user) {
            setisLoggedIn(false);
        }
        
	}, [userStore])

    useEffect(() => {
		async function getEvents() {
			try {
				let res = await axios.get("/api/events");
				let data = await res.data;
				setAllEvents(data);
                
			  } catch (error) {
				console.log(error);
			  }
		}
		getEvents()
	}, [])

    // Sort and get event closest to today
    const today = dayjs();
    const sortedEvents = allEvents.sort((a, b) => {
        const aDate = dayjs(a.date);
        const bDate = dayjs(b.date);
        return aDate.diff(today) - bDate.diff(today);
    });

    // Most recent event
    const recentEvent = sortedEvents[0];

    const purchases = [
        {
            user: 'SOLgod99',
            event: 'Aimer - Live',
        },
        {
            user: 'SOLgod99',
            event: 'Aimer - Live',
        },
        {
            user: 'SOLgod99',
            event: 'Aimer - Live',
        },
        {
            user: 'SOLgod99',
            event: 'Aimer - Live',
        },
      ];

    const artists = [
        {
            name: 'Ado',
            ranking: 1,
        },
        {
            name: 'One ok rock',
            ranking: 2,
        },
        {
            name: 'SOL GOD',
            ranking: 3,
        },
        {
            name: 'LISA',
            ranking: 4,
        },
        {
            name: 'Aimer',
            ranking: 5,
        },
    ];
    
    if (isLoggedIn) {
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='text-xl font-semibold'>You need to be logged in to access.</div>
            </div>
        );
    }

    if (userStore.user === null) {
        router.push('/organiser-login');
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='text-xl font-semibold'>Redirecting...</div>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-auto w-full bg-primary'>            
            <div className='flex h-auto w-full'>
                {/* Side panel */}
                <div className="px-3 pb-4 overflow-y-auto bg-secondary pt-20">
                <ul className="space-y-2 pt-4 ">
                    <li>
                        <Link href="/organiser-dashboard" passHref>
                            <div className="flex items-center p-2 pr-8 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                                <span className="material-symbols-outlined">dataset</span>
                                <span className="ml-3">Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        <span className="material-symbols-outlined">person</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">My Artists</span>
                        </a>
                    </li>                  
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        <span className="material-symbols-outlined">stadium</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">My Events</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        <span className="material-symbols-outlined">confirmation_number</span>
                        <span className="flex-1 ml-3 whitespace-nowrap">Ticketing</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        <span className="material-symbols-outlined">credit_card</span>   
                        <span className="flex-1 ml-3 whitespace-nowrap">Payment</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                        <span className="material-symbols-outlined">settings</span>                    
                        <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </a>
                    </li>
                </ul>
                </div>
                
                {/* Right screen */}
                <div className='flex flex-col h-screen w-full overflow-auto no-scroll-bar'>
                    {/* Main content */}
                    <div className='flex flex-col pt-24 px-44 pb-24'>
                        <div className='flex flex-col gap-8'>
                            {/* Greetings */}
                            <div className='flex flex-row justify-between items-center pt-4'>
                                <div className='flex flex-row items-center'>
                                    <div className='flex flex-col'>
                                        <Title level={3}> Hello, {userStore.user.name}! </Title>
                                        <Text> Welcome back to your dashboard. </Text>
                                        
                                    </div>
                                </div>
                                <div className='flex flex-col justify-end gap-4'>
                                    <div className="flex justify-end gap-2 pt-4">
                                        {/* Export */}
                                        <button className='flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700'>
                                            <span className="material-symbols-outlined">file_download</span>
                                            <span className="ml-2">Export</span>
                                        </button>

                                        {/* Insight */}
                                        <button className='flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700'>
                                            <span className="material-symbols-outlined">analytics</span>
                                            <span className="ml-2">Insight</span>
                                        </button>

                                        {/* Add Event */}
                                        <Link href="/create-event">
                                            <a className='flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700'>
                                                <span className="material-symbols-outlined">add</span>
                                                <span className="ml-2">Add Event</span>
                                            </a>
                                        </Link>

                                    </div>
                                    <div className='flex w-full justify-end'>
                                        {/* current time for now */}
                                        <Text type="secondary">Today is {new Date().toDateString()}</Text>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className='flex flex-row justify-between gap-8 pt-10 align-top'>

                                {/* Revenue chart */}
                                <div className='flex w-1/2 bg-gray-100 shadow rounded border p-4'>
                                    <RevenueChart/>
                                </div>
                                
                                <div className='flex flex-col w-1/2 gap-8'>
                                    {/* Login Detail Summary - Last logged in, Notifications, etc */}
                                    <div className='flex flex-col h-1/2 bg-gray-100 shadow rounded border p-4'>
                                        <div className='flex flex-col'>
                                            <div className="flex justify-between">
                                                {/* <div className='text-2xl font-semibold text-black'>Login Details</div> */}
                                                <Title level={4}> Login Details</Title>
                                                {/* Edit */}
                                                <div className='flex flex-row justify-end'>
                                                    <button className='flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700'>
                                                        <span className="material-symbols-outlined">edit</span>
                                                        <span className="ml-2">Edit</span>
                                                    </button>   
                                                </div>
                                            </div>
                                            <br/>
                                            <div>
                                                {/* Last login */}
                                                <div className='flex gap-4 items-center'>
                                                    <Text>Last Login:</Text>
                                                    <Text type='secondary'> Today </Text>
                                                </div>
                                                <br/>
                                                {/* Notifications */}
                                                <div className='flex gap-4 items-center'>
                                                    <Text>Notifications:</Text>
                                                    <Text type='secondary'> On </Text>
                                                </div>
                                                <br/>
                                                {/* Email */}
                                                <div className='flex gap-4 items-center'>
                                                    <Text>Email:</Text>
                                                    <Text type='secondary'> {userStore.user.email} </Text>
                                                </div>
                                                <br/>
                                                {/* Contact */}
                                                <div className='flex gap-4 items-center'>
                                                    <Text>Contact:</Text>
                                                    <Text type='secondary'> +65 1234 5678 </Text>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Latest Sales */}
                                    {/* <div className='flex flex-col h-1/2 bg-gray-100 shadow rounded border p-4'>
                                        <div className='flex flex-col'>
                                            <div className="w-full w-full flex justify-between">
                                                <Title level={4}> Latest Sales</Title>
                                                
                                            </div>
                                        </div>  
                                    </div> */}

                                    {/* Latest upcoming event */}
                                    <div className="flex flex-col h-3/4 bg-gray-100 shadow rounded border p-4">
                                        <text className='text-2xl font-semibold pb-4 bg-primary'>
                                        Latest Upcoming Event
                                        </text>
                                        <div className="grid grid-cols-1 w-full bg-opacity-10 content-between">
                                        
                                            {/* Top left event name */}
                                            <div className="flex w-full justify-between items-center px-8 bg-black bg-opacity-50 py-4">
                                                <div className="text-xl font-semibold text-white">{recentEvent}</div>
                                                <div className="text-xl text-white bg-red-600 py-1 px-4 rounded-full">Live</div>
                                            </div>
                                            
                                            <Image
                                                src="/static/images/events/2.jpg"
                                                alt="Picture of the author"
                                                width={1920}
                                                height={529}
                                                layout="responsive"
                                                objectFit="cover"
                                            />

                                            {/* Bottom left event details */}
                                            <div className="flex flex-col w-1/2 justify-start px-12 py-1 bg-black bg-opacity-50">
                                                <div className="text-sm font-normal text-white">2:30pm on 20/3/2023</div>
                                                <div className="text-sm font-semibold text-white">Ryogoku Kokugikan</div>
                                            </div>
                                        </div>  
                                        <div className='flex justify-end'>
                                            <div className='flex flex-col w-full py-2'>
                                                <Row gutter={16}>
                                                    <Col span={12}>
                                                    <Statistic title="Total Revenue" value={57000} prefix={"$"} valueStyle={{fontSize: 12}}/>
                                                    </Col>
                                                    <Col span={12}>
                                                    <Statistic title="Tickets Sold" value={1120} suffix="/ 1520" valueStyle={{fontSize: 12}}/>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {/* Bottom right event actions */}
                                            <div className="flex flex-row w-full justify-end align-bottom gap-2 mt-4">
                                                <button className="flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700">
                                                    <span className="material-symbols-outlined">edit</span>
                                                    <span className="ml-2">Edit</span>
                                                </button>
                                                <button className="flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700">
                                                    <span className="material-symbols-outlined">delete</span>
                                                    <span className="ml-2">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            {/* Recent Sales order and Artist Top ranking */}

                            <div className='flex justify-between gap-4'>
                                {/* Recent Sales order */}
                                <div className='flex flex-col w-3/5 pt-10 bg-gray-100 rounded shadow border py-4 px-8'>
                                    <div className='flex flex-col w-full'>
                                        <div className="flex justify-between">
                                            <Title level={4}> Recent Sales Orders</Title>
                                            <Link href="/#">
                                                <a className='flex flex-row justify-center items-center h-10 w-32 bg-accent text-white rounded-lg hover:bg-gray-700'>
                                                    <span className="material-symbols-outlined">Edit</span>
                                                    <span className="ml-2">Edit</span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={purchases}
                                        renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                            avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                                            title={<a href="https://ant.design">{item.user}</a>}
                                            description={item.event}
                                            />
                                        </List.Item>
                                        )}
                                    />
                                    </div>
                                </div>
                                
                                {/* Artist Top ranking */}
                                <div className='flex flex-col w-2/5 pt-10 bg-gray-100 rounded shadow border py-4 px-8'>
                                    <div className='flex flex-col w-full'>
                                        <div className="flex justify-between select-none cursor-pointer">
                                            <Title level={4}> Artist Top Ranking</Title>
                                            <Link href="/organiser-dashboard">
                                                {/* View all */}
                                                <Text type='secondary'> View all </Text>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={artists}
                                        renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                            avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                                            title={<a href="https://ant.design">#{item.ranking}. {item.name}</a>}
                                            />
                                        </List.Item>
                                        )}
                                    />
                                    </div>
                                </div>
                            </div>
                            

                            
                        </div>

                    </div>
                    <Footer/> 
                </div>
            </div>
            
        </div>
    )
}

export default Home;
function setBanner(arg0: any) {
    throw new Error('Function not implemented.')
}

function setAllEvents(data: any) {
    throw new Error('Function not implemented.')
}

