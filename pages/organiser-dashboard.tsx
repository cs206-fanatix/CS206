import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useUserStore } from "../stores/user-store";
import Image from 'next/image'
import RevenueChart from '../components/Organiser-Dashboard/RevenueChart'
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Avatar, List, Space, Tag, Col, Row, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined,
  } from '@ant-design/icons';

interface Event {
    id: string;
    name: string;
    artist: string;
    imageUrl: string | null;
    eventDateTime: Date;
    venue: string;
  }

dayjs.extend(dayLocaleData);
const Home: NextPage = () => {
    const router = useRouter();
    const userStore = useUserStore();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const [allEvents, setAllEvents] = useState<Event[] | null>(null);
    const [recentEvent, setRecentEvent] = useState<Event[] | null>(null);
    
    useEffect(() => {	
        if (userStore.user == null) {
            userStore.fetch();
        }
        if (userStore.user) {
            setisLoggedIn(false);
        }
	}, [userStore.user])


useEffect(() => {
  // Fetch events data from an API endpoint
  fetch("/api/events")
    .then((res) => res.json())
    .then((data) => {
      // Parse date strings in events array to JavaScript Date objects
      const parsedEvents = data.map((event: Event) => ({
        ...event,
        eventDateTime: new Date(event.eventDateTime),
      }));

      // Sort events array in ascending order based on eventDateTime
      parsedEvents.sort(
        (a: { eventDateTime: { getTime: () => number } }, b: { eventDateTime: { getTime: () => number } }) => a.eventDateTime.getTime() - b.eventDateTime.getTime()
      );
    
        setAllEvents(parsedEvents);

      // Find the first event whose eventDateTime is greater than or equal to today's date
      const today = new Date();
      const closestEvent = parsedEvents.find(
        (event: { eventDateTime: { getTime: () => number } }) => event.eventDateTime.getTime() >= today.getTime()
      );

      // Set the closestEvent in state
      setRecentEvent(closestEvent ? [closestEvent] : null);
    });
}, []);

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
                                        <Text type='secondary'> Welcome back to your dashboard. </Text>
                                        
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
                                                <div className='flex flex-row justify-end pr-4'>
                                                    <div className='select-none cursor-pointer'>
                                                        <Link href="/organiser-dashboard">
                                                            <Text type='secondary'> Edit </Text>
                                                        </Link>    
                                                    </div>
                                                    
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

                                    {/* Latest upcoming event */}
                                    <div className="flex flex-col h-3/4 bg-gray-100 shadow rounded border p-4">
                                        <text className='text-2xl font-semibold pb-4'>
                                        Latest Upcoming Event
                                        </text>
                                        <div className="grid grid-cols-1 w-full bg-opacity-10 content-between">
                                        {recentEvent && recentEvent[0] && (
                                            <div className="grid grid-cols-1 w-full bg-opacity-10 content-between">
                                                {/* Top left event name */}
                                                <div className="flex w-full justify-between items-center px-8 bg-black bg-opacity-40 py-4 rounded-t-lg">
                                                    <div className="text-xl font-semibold text-white">{recentEvent[0].name}</div>
                                                    <Tag color="error">Live</Tag>
                                                </div>
                                                                                        
                                                {recentEvent[0].imageUrl ? (
                                                <Image
                                                    src={recentEvent[0].imageUrl}
                                                    alt="Missing image. Please refresh the page."
                                                    width={1920}
                                                    height={529}
                                                    layout="responsive"
                                                    objectFit="cover"
                                                />
                                                ) : (
                                                    <Image
                                                    src={"/static/images/events/3.webp"}
                                                    alt="Missing image. Please refresh the page."
                                                    width={2560}
                                                    height={1431}
                                                    layout="responsive"
                                                    objectFit="cover"
                                                />
                                                )}

                                                {/* Bottom left event details */}
                                                <div className="flex flex-col justify-start px-12 py-2 bg-black bg-opacity-40 rounded-b-lg">
                                                    {recentEvent && (
                                                    <div className="text-sm font-normal text-white">{recentEvent[0].eventDateTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})} on {recentEvent[0].eventDateTime.toLocaleDateString()}</div>
                                                    )}
                                                    <div className="text-sm font-semibold text-white">{recentEvent[0].venue}</div>
                                                </div>
                                                
                                            </div>
                                            
                                            )}

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
                                            <div className="flex flex-row w-full justify-end align-bottom gap-4 mt-4">
                                                <div className="select-none cursor-pointer">
                                                    <Link href="/organiser-dashboard">
                                                        <Text type='secondary'> Edit </Text>
                                                    </Link>
                                                </div>

                                                <div className="select-none cursor-pointer">
                                                    <Link href="/organiser-dashboard">
                                                        <Text type='secondary'> Delete </Text>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Space size={[0, 8]} wrap>
                                        <Link href="https://twitter.com">
                                            <a>
                                            <Tag icon={<TwitterOutlined />} color="#55acee" style={{ display: "flex", alignItems: "center" }}>
                                                Twitter
                                            </Tag>
                                            </a>
                                        </Link>
                                        <Link href="https://youtube.com">
                                            <a>
                                            <Tag icon={<YoutubeOutlined />} color="#cd201f" style={{ display: "flex", alignItems: "center" }}>
                                                Youtube
                                            </Tag>
                                            </a>
                                        </Link>
                                        <Link href="https://facebook.com">
                                            <a>
                                            <Tag icon={<FacebookOutlined />} color="#3b5999" style={{ display: "flex", alignItems: "center" }}>
                                                Facebook
                                            </Tag>
                                            </a>
                                        </Link>
                                        <Link href="https://linkedin.com">
                                            <a>
                                            <Tag icon={<LinkedinOutlined />} color="#55acee" style={{ display: "flex", alignItems: "center" }}>
                                                LinkedIn
                                            </Tag>
                                            </a>
                                        </Link>
                                        </Space>
                                        
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

                                            <div className="select-none cursor-pointer">
                                                <Link href="/organiser-dashboard">
                                                    <Text type='secondary'> View all </Text>
                                                </Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={purchases}
                                        renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={<a href="#">{item.user}</a>}
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
                                        <div className="flex justify-between">
                                            <Title level={4}> Artist Top Ranking</Title>

                                            <div className="select-none cursor-pointer">
                                                <Link href="/organiser-dashboard">
                                                    {/* View all */}
                                                    <Text type='secondary'> View all </Text>
                                                </Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={artists}
                                        renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined/>}/>}
                                            title={<a href="#">#{item.ranking}. {item.name}</a>}
                                            />
                                        </List.Item>
                                        )}
                                    />
                                    </div>
                                </div>
                            </div>
                            {/* All other events coming */}
                            <div className='flex flex-col w-full pt-10 bg-gray-100 rounded shadow border py-4 px-8'>
                                <div className='flex flex-col w-full'>
                                    <div className="flex justify-between">
                                        <Title level={4}> My Events</Title>
                                        <div className="select-none cursor-pointer">
                                            <Link href="/organiser-dashboard">
                                                {/* View all */}
                                                <Text type='secondary'> View all </Text>
                                            </Link>
                                        </div>
                                        
                                    </div>

                                    <div className='flex flex-col w-full'>
                                    <List
                                    itemLayout="horizontal"
                                    dataSource={allEvents ? allEvents : []} // add a conditional check here
                                    renderItem={(item, index) => (
                                        <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={<a href="#">{item.name}</a>}
                                            description={item.eventDateTime.toLocaleDateString()}
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
