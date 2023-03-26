import Link from 'next/link';
import Image from 'next/image';

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
}

const EventCard = (props: props) => {
	return (
		<Link href={`/ticket/${encodeURIComponent(props.id)}`}>
			<a title="View Ticket" className="flex flex-col w-80 h-32 items-center bg-gray-800 border border-gray-700 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-700">
				<Image
					src={props.image}
					alt="Event Image"
					width={200}
					height={120}
					className="object-fill"
				/>
				{props.status === 'listed' && (
					<h2 className="font-normal text-white bg-accent rounded w-min px-2 -mt-24 ml-2 absolute">
						Listed
					</h2>
				)}
				<div className="flex flex-col justify-between leading-normal pt-2 pl-2 pr-2 mb-auto">
					<h5 className="text-base font-bold tracking-tight text-white">
						{props.event_name}
					</h5>
					<h6 className="text-sm tracking-tight text-accent">{props.artist}</h6>
					<h2 className="font-bold text-gray-300">
						Cat: {props.category}
					</h2>
					<h2 className="font-bold text-gray-300">
						Seat: {props.seat}
					</h2>
				</div>
			</a>
		</Link>
	);
};

export default EventCard;
