import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import EventCard from "../components/EventCard";
import { useUserStore } from "../stores/user-store";
import axios from "axios";
import { format } from "date-fns";

const ViewTicket: NextPage = () => {
	const userStore = useUserStore();
	const [allTickets, setAllTickets] = useState<any[]>([]);

	let listedCount = 0;

	useEffect(() => {
		if (userStore.user == null) {
			userStore.fetch();
		}
	}, [userStore.user]);

	useEffect(() => {
		async function getTickets() {
			try {
				let res = await axios.get(
					"/api/users/" + userStore?.user?.id.toString()
				);
				let data = await res.data;
				setAllTickets(data.tickets);
			} catch (error) {
				console.log(error);
			}
		}
		getTickets();
	}, [userStore.user]);

	const cards = allTickets.map((item) => {
		const date = item.event.eventDateTime;
		const dateFormatted = format(new Date(date), "dd/MM/yyyy (EEE)");

		if (item.status === "listed") {
			listedCount++;
		}

		return (
			<EventCard
				key={item.id}
				id={item.id}
				event_name={item.event.name}
				artist={item.event.artist}
				event_start_date={dateFormatted}
				category={item.category}
				image={item.event.imageUrl}
				status={item.status}
				seat={item.seatNo}
				level={item.level}
			/>
		);
	});

	return (
		<div className="flex flex-col h-screen w-full bg-gradient-to-b from-primary via-secondary/20 to-primary overflow-auto">
			<div className="flex ml-32 mt-5 p-2 bg-secondary w-max rounded-lg">
				<Image
					src="/static/images/profile.png"
					width={150}
					height={150}
					className="rounded-full"
				></Image>
				<div className="flex flex-col pl-2">
					<h1 className="text-primary text-bold text-md pb-1">{userStore.user?.name}</h1>
					<hr className="h-0.5 bg-gray-300"></hr>
				<div className="flex mt-3 gap-2">
					<div className="flex rounded-lg bg-primary w-40 h-7 p-2 items-center">
						<h3 className="text-secondary">Total tickets</h3>
						<p className="text-secondary ml-auto">{allTickets.length}</p>
					</div>
					<div className="flex rounded-lg bg-primary w-40 h-7 p-2 items-center">
						<h3 className="text-secondary">Listed Tickets</h3>
						<p className="text-secondary ml-auto">{listedCount}</p>
					</div>
				</div>
				</div>
			</div>
			<hr className="h-0.5 w-10/12 mx-auto my-3 bg-gray-300"></hr>
			<div className="flex gap-3 ml-32 flex-wrap">{cards}</div>
		</div>
	);
};

export default ViewTicket;
