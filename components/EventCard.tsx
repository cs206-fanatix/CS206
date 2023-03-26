import Link from "next/link";
import Image from "next/image";

interface props {
	key: number;
	id: number;
	event_name: string;
	artist: string;
	event_start_date: string;
	image: string;
	status: string;
	category: string;
	seat: string;
	level: string;
}

const EventCard = (props: props) => {
	return (
		<Link href={`/ticket/${encodeURIComponent(props.id)}`}>
			<a
				title="View Ticket"
				className="max-w-sm bg-secondary border border-gray-200 rounded-lg shadow-md basis-1/3 h-60"
			>
				<Image
					src={props.image}
					alt="Event Image"
					width={280}
					height={128}
					className="object-fill rounded-t-lg"
				/>
                {props.status === 'listed' && (
					<h2 className="font-normal text-white bg-accent rounded w-min px-2 -mt-32 ml-2 absolute">
						Listed
					</h2>
				)}
				<div className="px-3 flex flex-col">
					<h5 className="text-xl font-bold tracking-tight text-white">
						{props.event_name}
					</h5>
					<h6 className="text-sm tracking-tight text-accent">{props.artist}</h6>
					<p className="pb-1 font-normal text-gray-300">
						{props.event_start_date}
					</p>
				</div>
				<div className="px-3 flex gap-3">
					<h2 className="font-bold text-white">Level: {props.level}</h2>
					<h2 className="font-bold text-white">
						Category: {props.category}
					</h2>
					<h2 className="font-bold text-white">Seat Number: {props.seat}</h2>
				</div>
			</a>
		</Link>
	);
};

export default EventCard;
