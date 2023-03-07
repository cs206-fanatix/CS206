import Navbar from "./Navbar"
import Footer from "./Footer"
import { useRouter } from "next/router"

const Layout = ({children}) => {
    const router = useRouter();
    const pathname = router.pathname;
    
    return (
        <>
            <Navbar username="SolGod99"/>
            <main>{children()}</main>
            <Footer />
        </>
    );
};

export default Layout;