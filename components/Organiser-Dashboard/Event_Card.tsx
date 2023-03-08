import Link from 'next/link'
import Image from 'next/image'

interface props {
    event_name: string,
    event_start_date: string,
    event_end_date: string,
    image: string
}

const Event_Card = (props: props) => {
    return (
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={props.image} alt=""/> */}
            <Image src={props.image} alt="Event Image" width={1000} height={750} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.event_name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.event_start_date} to {props.event_end_date}</p>
            </div>
        </a>
    );
};

export default Event_Card;