import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import EventCard from '../components/EventCard';
import { useUserStore } from '../stores/user-store';

const ViewTicket: NextPage = () => {
    const userStore = useUserStore();

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
			<EventCard
				key={item.id}
				id={item.id}
				event_name={item.title}
				artist={item.artist}
				event_start_date={item.dateTime}
				image={item.imageURL}
                status={item.status}
			/>
		);
	});

    useEffect(() => {
        userStore.fetch()
    }, [userStore])

	return (
		<div className="flex flex-col h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary">
			<div className="flex ml-40 mt-5 p-2 bg-secondary w-max rounded-lg">
				<Image
					src="/static/images/profile.png"
					width={150}
					height={150}
					className="rounded-full"
				></Image>
				<div className="flex mt-3 gap-2">
					<div className="flex rounded-lg bg-primary w-40 h-7 p-2 items-center">
						<h3 className="text-secondary">Total tickets</h3>
						<p className="text-secondary ml-auto">{data.length}</p>
					</div>
					<div className="flex rounded-lg bg-primary w-40 h-7 p-2 items-center">
						<h3 className="text-secondary">Listed Tickets</h3>
						<p className="text-secondary ml-auto">0</p>
					</div>
				</div>
			</div>
			<hr className="h-0.5 w-10/12 mx-auto my-3 bg-gray-300"></hr>
			<div className="flex gap-3 ml-40 flex-wrap">{cards}</div>
		</div>
	);
};

export default ViewTicket;
