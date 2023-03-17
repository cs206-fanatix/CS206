import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next'
import { parse } from "cookie"
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Homecard from '../components/HomeCard';
import { useUserStore } from '../stores/user-store';
// test

const Home: NextPage = () => {	

	const fetchUser = useUserStore(state => state.fetch)
	const user = useUserStore(state => state.user)

	fetchUser()
	console.log(user);
	
	
	const data = [{
        id:1,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "listed"

    },
    {
        id:2,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "unsold"
    },
    {
        id:3,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "listed"
    },
    {
        id:4,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "listed"
    },
    {
        id:5,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "unsold"
    },
    {
        id:6,
        title: "Born Pink World Tour",
        artist: "Blackpink",
        imageURL: "/static/images/bp.jpg",
        dateTime: "9/3/2023",
        venue: "Singapore indoor stadium",
        status: "unsold"
    }]
	const cards = data.map((item) => {
		return (
			<Homecard
			key={item.id}
			id={item.id}
			event_name={item.title}
			artist={item.artist}
			event_start_date={item.dateTime}
			image={item.imageURL}
			/>
		);
	});
	return (
		<div className="h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary overflow-auto">
			
				<div className="relative flex bg-gradient-to-tr from-gray-100 via-secondary to-black">
					<div className="w-full h-104 overflow-hidden">
						<Image
							src="/static/images/1975.jpg"
							layout="fill"
							objectFit="cover"
							objectPosition="top"
							className="opacity-55 blur-sm"
						></Image>
						<div className='mt-10 ml-36'>
					<Image
							src="/static/images/1975.jpg"
							width={700}
							height={350}
							objectPosition="center"
							className="rounded-lg"
						></Image>
					</div>
					</div>
		
					<div className="ml-auto z-1 flex flex-col w-max mt-20 mr-10">
						<h1 className="text-white text-4xl font-bold">
							THE 1975 are coming to Singapore!
						</h1>
						<h1 className="text-gray-200 text-xl font-semibold pt-1">
							2023&aposs most famous British band promise only more show-stopping
							moments in Singapore in July!
						</h1>
						<div className='ml-auto pt-3 flex gap-2'>
						<Link href="/event/1">
							<a className="	text-white bg-accent rounded-xl px-4 py-1 text-xl items-center hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300">
								Buy Ticket
							</a>
						</Link>
						<Link href="/event-details/1">
							<a className="text-white border rounded-xl px-4 py-1 text-xl items-center">
								Learn More
							</a>
						</Link>
						</div>
						
					</div>
				</div>
				<div className='p-8'>
					<div>
						<h1 className='text-secondary text-3xl font-bold ml-32'>
							Upcoming Events
						</h1>
					</div>
					<div className="flex gap-3 mt-5 ml-32 flex-wrap">{cards}</div>
				</div>
		</div>
	);
};
  
export default Home;
