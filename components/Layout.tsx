import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
