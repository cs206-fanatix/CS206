import Image from 'next/image';

interface Props {
  name: string;
  artist: string;
  eventDateTime: string;
  venue: string;
  image: string;
}

const EventCard = ({ name, artist, eventDateTime, venue, image }: Props) => {
  return (
    <div className="relative rounded shadow">
      <Image src={image} alt="Event Image" width={1000} height={350} className="object-cover w-full h-full" />

      <div className="absolute inset-0 rounded shadow" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))" }}>
        <div className="flex items-center justify-end pr-4 text-sm text-white sm:text-base">
          <button className="hover:text-gray-400">...</button>
        </div>
        <div className="px-4 py-6">
          <h3 className="text-lg font-medium text-white">{name}</h3>
          <p className="mt-2 text-sm text-gray-300">
            {artist} | {eventDateTime} | {venue}
          </p>
        </div>                   
        
      </div>
    </div>
  );
};

export default EventCard;
