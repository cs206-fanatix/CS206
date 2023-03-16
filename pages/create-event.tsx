import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer';
import Navbar from '../components/Organiser-Dashboard/Navbar (Organiser)';
import { useState } from "react";
import Image from 'next/image'


const steps = [  { id: 'firstName', label: 'First Name' },  { id: 'lastName', label: 'Last Name' },  { id: 'email', label: 'Email' },  { id: 'password', label: 'Password' },];

const createEvent: NextPage = () => {
    const [file, setFile] = useState(null);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setFile(file);

        // Create a preview image URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setPreviewUrl(reader.result);
        };
    };

    const [previewUrl, setPreviewUrl] = useState(null);


    
    return (<div className='flex min-h-screen w-full'>
            {/* Side panel */}
            <div className="h-screen pt-20 px-3 pb-4 bg-secondary">
                <ul className="space-y-2 pt-4">
                    <li>
                    <Link href="/organiser-dashboard" passHref>
                        <div className="flex items-center p-2 pr-4 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">dataset</span>
                            <span className="ml-3">Dashboard</span>
                        </div>
                    </Link>
                    </li>

                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">person</span>
                            <span className="flex-1 ml-3 whitespace-nowrap">My Artists</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">stadium</span>
                            <span className="flex-1 ml-3 whitespace-nowrap">My Events</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">confirmation_number</span>
                            <span className="flex-1 ml-3 whitespace-nowrap">Ticketing</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">credit_card</span>
                            <span className="flex-1 ml-3 whitespace-nowrap">Payment</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* Main content */}
            <div className="flex flex-col w-full pt-28 px-20 py-20 h-screen bg-gray-400 overflow-auto no-scroll-bar">
                <div className="select-none cursor-pointer">
                    <Link href='/organiser-dashboard' passHref>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                </div>

                <br/>
                <text className='text-4xl font-bold'>Create Event</text>
                <br/>
                <br/>
                <form className="flex flex-col gap-8 bg-primary rounded p-8">
                    <text className='text-2xl font-bold'>Event Image</text>
                    
                    <div>
                    <label className="block mb-2 text-sm font-medium text-secondary" htmlFor="user_avatar">
                        Upload file
                    </label>
                    <div className="flex flex-col">
                        {previewUrl && (
                        <Image
                            src={previewUrl}
                            alt="preview"
                            width={64}
                            height={256}
                            className="ml-2 object-cover rounded-md"
                        />
                        )}
                        <input
                        className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-secondary p-4 border-gray-600 placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        onChange={handleFileInputChange}
                        />
                    </div>
                    <div className="mt-1 text-sm text-gray-900" id="user_avatar_help">
                        Banner to be used for publicity
                    </div>
                    </div>
                    <text className='text-2xl font-bold'>Event Details</text>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="event_name" name="floating_event_name" id="floating_event_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-black focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_event_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Name</label>
                    </div>

                    {/* Date and Time */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="date" name="floating_date" id="floating_date" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_date" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                    </div>
                    
                    {/* Venue */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="venue" name="floating_venue" id="floating_venue" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_venue" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Venue</label>
                    </div>

                    {/* Artist Name */}
                    <text className='text-2xl font-bold'>Artist Name</text>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="artist_name" name="floating_artist_name" id="floating_artist_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-black focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_artist_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artist Name</label>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <fieldset>
                            <legend className="sr-only">Checkbox variants</legend>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900">I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-2" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-2" className="ml-2 text-sm font-medium text-gray-900">I confirm that all performers have been booked and are available for the selected date and time of the event. </label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-3" className="ml-2 text-sm font-medium text-gray-900">I confirm that all necessary permits and licenses have been obtained for the event venue.</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-4" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-4" className="ml-2 text-sm font-medium text-gray-900">I confirm that appropriate security measures have been arranged for the event.</label>
                            </div>

                        </fieldset>
                    </div>


                    <div className="flex gap-4">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
            </div>
            
    </div>)
}

export default createEvent;

