import Link from 'next/link'

interface props {
    username: string
}

const Navbar = (props: props) => {
    return (
        <div className='bg-[#F9F9F9] flex items-center justify-between p-4 w-full h-1/6'>
            <div className='flex justify-center gap-10'>
                <Link href="/organiser_dashboard">
                    <img src="/logo.png" alt="Logo" className="h-12 invert"/>
                </Link>
            </div>

            <form className='flex w-1/3 justify-between'>
                    
                    <input type="text" id="search-bar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full" placeholder="Search" required/>

                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                            </path>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                
            </form>

            <div className='flex gap-4 p-5'>
                <Link href="#" className="text-#0E1D31 font-semibold">Create event</Link>
                <Link href="#" className="text-#0E1D31 font-semibold">{props.username}</Link>
            </div>
        </div>
    )
}

export default Navbar