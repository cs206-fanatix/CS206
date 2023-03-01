import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({children}) => {
    return (
        <>
            <Navbar username="SolGod99"/>
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout