import Link from "next/link"

interface Props {
    dateTime: string;
    kycLink: string;
    backLink: string;
}

const EarlyAccess = (props: Props) => {
    
    const currentDate = new Date()
    const dateReleased = new Date(props.dateTime)
    return (
        <div className='flex flex-col bg-primary h-60 w-120 py-2 px-3
            rounded-lg drop-shadow-md gap-3 justify-between min-h-min overflow-y-auto'>
            <div className='p-6 text-center'>
                <svg aria-hidden="true" className="mx-auto mb-4 text-accent w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>The buying of tickets starts at: <b>{dateReleased.getFullYear()}-{dateReleased.getMonth()+1}-{dateReleased.getDate()} {String(dateReleased.getHours()).padStart(2, '0')}:{String(dateReleased.getMinutes()).padStart(2, '0')}:{String(dateReleased.getSeconds()).padStart(2, '0')}</b> </p>
                <p>The current date time is: <b>{currentDate.getFullYear()}-{currentDate.getMonth()+1}-{currentDate.getDate()} {String(currentDate.getHours()).padStart(2, '0')}:{String(currentDate.getMinutes()).padStart(2, '0')}:{String(currentDate.getSeconds()).padStart(2, '0')}</b> </p>
                <h3 className='mb-5 text-lg font-normal text-accent dark:text-primary'>You have to be verified to get early access.</h3>
                
                <Link href={props.kycLink}>
                    <a className="text-semibold text-white bg-red-600 hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg border text-sm font-medium px-5 py-2.5 text-md mr-2">Verify now</a>
                </Link>
                <Link href={props.backLink}>
                    <a className="text-semibold text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-md">Go back</a>
                </Link>
            </div>
        </div>
    )
}

export default EarlyAccess