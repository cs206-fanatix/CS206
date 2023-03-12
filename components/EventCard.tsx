import Link from 'next/link'
import Image from 'next/image'

interface props {
    key: number,
    id: number,
    event_name: string,
    artist: string,
    event_start_date: string,
    image: string
}

const EventCard = (props: props) => {
    return (
        <Link href={`/ticket/${encodeURIComponent(props.id)}`}>
            <a className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-700">
            <Image src={props.image} alt="Event Image" width={150} height={100} className="object-contain"/>
            <div className="flex flex-col justify-between leading-normal p-1">
                <h5 className="text-base font-bold tracking-tight text-white">{props.event_name}</h5>
                <h6 className="text-sm tracking-tight text-gray-300">{props.artist}</h6>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.event_start_date}</p>
            </div>
        </a>
        </Link>
    );
};

export default EventCard;