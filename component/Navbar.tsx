
interface props {
    num: number
}

const Navbar = (props: props) => {
    return (
        <div className='h-[20%] bg-blue-400 flex items-center justify-between px-5'>
            <div className='flex flex-col justify-center bg-green-400 h-16 w-20 text-center'>
                <div>{
                    props.num
                    }</div>
            </div>

            <div className='flex gap-4'>
                <div>
                    Create event
                </div>
                <div>
                    Profile 2
                </div>
            </div>
        </div>
    )
}

export default Navbar