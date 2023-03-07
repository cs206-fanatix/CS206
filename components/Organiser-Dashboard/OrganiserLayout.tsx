import Navbar from "./Navbar (Organiser)"
import Footer from "../Footer"
import { useRouter } from "next/router"

const OrganiserLayout = ({children}) => {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <>
            <Navbar username="Organiser 1"/>
            <main>{children()}</main>
        </>
    )
}

export default OrganiserLayout;