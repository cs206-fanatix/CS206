import Image from "next/image";
import Link from "next/link";

interface props {
    key: number;
    id: number;
    event_name: string;
    artist: string;
    event_start_date: string;
    image: string;
}

const Homecard = (props: props) => {
    return (

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md basis-1/3 overflow-x-hidden">
                <Image
                    src={props.image}
                    alt="Event Image"
                    width={300}
                    height={150}
                    className="object-fill rounded-t-lg"
                />
            <div className="px-3 py-3 flex flex-col">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900">{props.event_name}</h5>
                    <h6 className="text-sm tracking-tight text-accent">
                        {props.artist}
                        </h6>
                <p className="mb-3 font-normal text-gray-700">{props.event_start_date}</p>
                <Link href={`/event-details/${encodeURIComponent(props.id)}`}>
                <a className="ml-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300">
                    Learn More
                </a>
                </Link>
            </div>
        </div>

    )
}

export default Homecard