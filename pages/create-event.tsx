import type { NextPage } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer';
import Navbar from '../components/Organiser-Dashboard/Navbar (Organiser)';
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useUserStore } from '../stores/user-store';
import { Breadcrumb } from 'antd';


const steps = [  { id: 'firstName', label: 'First Name' },  { id: 'lastName', label: 'Last Name' },  { id: 'email', label: 'Email' },  { id: 'password', label: 'Password' },];

const CreateEvent: NextPage = () => {
    const [file, setFile] = useState<null | File>(null);
    const [submissionStatus, setSubmissionStatus] = useState("idle");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [is_confirmed, setIsConfirmed] = useState(false);

    // form data
    const [floating_event_name, setName] = useState("");
    const [floating_artist_name, setArtist] = useState("");
    const [floating_date_time, setEventDateTime] = useState("");
    const [floating_venue, setVenue] = useState("");

    console.log("Submission status:", submissionStatus);

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the selected file
        const files = event.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        if (!file) return;

        setFile(file);

        // Create a preview image URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (reader.result !== null && typeof reader.result === 'string') {
                setPreviewUrl(reader.result);
            }
        };
    };

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleConfirmation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setName(formData.get('floating_event_name') as string);
        setArtist(formData.get('floating_artist_name') as string);
        const date_raw = formData.get('floating_date_time');
        const date = new Date(date_raw as string);
        setEventDateTime(date.toISOString());
        setVenue(formData.get('floating_venue') as string);

        setShowConfirmation(true);
      };

    function handleFormSubmit() {
        setSubmissionStatus("pending");
        
        const eventObj = {
          name: floating_event_name,
          artist: floating_artist_name,
          eventDateTime: floating_date_time,
          venue: floating_venue
          // add more fields as needed
        };
      
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventObj),
        };
        
        console.log("Request options:", requestOptions);

        fetch("/api/events", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));

        // Set submissionStatus in localStorage
        setSubmissionStatus("review-pending");
        
        // clear form
        setPreviewUrl(null);
        setFile(null);
        
    }
    
    const router = useRouter();
    const userStore = useUserStore();
    const [isLoggedIn, setisLoggedIn] = useState(true);
    
    useEffect(() => {	
		userStore.fetch();
        if (userStore.user) {
            setisLoggedIn(false);
        }
	}, [userStore])

    
    if (isLoggedIn) {
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='text-xl font-semibold'>You need to be logged in to access.</div>
            </div>
        );
    }

    if (userStore.user === null) {
        router.push('/organiser-login');
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='text-xl font-semibold'>Redirecting...</div>
            </div>
        );
    }

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
            <div className="flex flex-col w-full pt-28 px-44 py-20 h-screen bg-primary overflow-auto no-scroll-bar">
                <div className="select-none cursor-pointer">
                    <Link href='/organiser-dashboard' passHref>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                </div>                
                <br/>
                <text className='text-4xl font-bold'>Create Event</text>
                <br/>
                <br/>
                <form className="flex flex-col gap-8 bg-primary rounded p-8" onSubmit={handleConfirmation}>
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
                        required
                        />
                    </div>
                    <div className="mt-1 text-sm text-gray-900" id="user_avatar_help">
                        Banner to be used for publicity
                    </div>
                    </div>
                    <text className='text-2xl font-bold'>Event Details</text>
                    <div className="relative z-0 w-full mb-6 group" aria-required>
                        <input type="event_name" name="floating_event_name" id="floating_event_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-black focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_event_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Name</label>
                    </div>

                    {/* Date and Time */}
                    <div className="relative z-0 w-full mb-6 group" aria-required>
                        <input type="datetime-local" name="floating_date_time" id="floating_date_time" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_date_time" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date and Time</label>
                    </div>

                    
                    {/* Venue */}
                    <div className="relative z-0 w-full mb-6 group" aria-required>
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
                                <input id="checkbox-1" type="checkbox" required value="" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                                <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900">I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-2" type="checkbox" required value="" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                                <label htmlFor="checkbox-2" className="ml-2 text-sm font-medium text-gray-900">I confirm that all performers have been booked and are available for the selected date and time of the event. </label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-3" type="checkbox" required value="" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                                <label htmlFor="checkbox-3" className="ml-2 text-sm font-medium text-gray-900">I confirm that all necessary permits and licenses have been obtained for the event venue.</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input id="checkbox-4" type="checkbox" required value="" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                                <label htmlFor="checkbox-4" className="ml-2 text-sm font-medium text-gray-900">I confirm that appropriate security measures have been arranged for the event.</label>
                            </div>

                        </fieldset>
                    </div>
                    
                        {showConfirmation && (

                            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-10">
                            <div className="bg-white rounded p-8">
                                <h2 className="text-lg font-medium mb-4">
                                Are you sure you want to submit?
                                </h2>
                                <div className="flex justify-end">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setShowConfirmation(false);
                                        handleFormSubmit();
                                    }}
                                >
                                    Submit
                                </button>
                                </div>
                            </div>
                            </div>
                        )}

                    {submissionStatus === "review-pending" && (
                    <div className="flex align-center gap-4 rounded p-4 bg-yellow-200 py-4">
                    <span className="material-symbols-outlined">warning</span>
                    Your submission is pending review.
                    </div>
                    )}

                    <div className="flex gap-4">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
                
            </div>
            
    </div>)
}

export default CreateEvent;

