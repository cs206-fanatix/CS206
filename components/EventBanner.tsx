import Image from "next/image";

interface event {
    title: string;
    imageUrl: string;
    venue: string;
}

const EventBanner = (event: event) => {
    return <div className='bg-black overflow-hidden rounded-lg drop-shadow-md w-full min-w-fit  '>
        <div className=''>
            <Image src={event.imageUrl} alt="Banner" layout='fill' objectFit='cover'
                className='absolute opacity-50' />
        </div>
        <div className='p-2'>
            <h1 className='text-3xl text-primary relative m-3 font-semibold'>{event.title}</h1>
            <h2 className='text-xl text-primary relative m-3 font-light'>{event.venue}</h2>
        </div>
    </div>;
}

export default EventBanner