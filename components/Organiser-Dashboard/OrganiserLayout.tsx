import Navbar from "./Navbar (Organiser)"
import Footer from "../Footer"
import { useRouter } from "next/router"

type LayoutProps = {
  children: React.ReactNode
}

const OrganiserLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <>
      <Navbar username="Organiser 1" />
      <main>{children}</main>
    </>
    
  )
}

export default OrganiserLayout
