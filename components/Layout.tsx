import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
  userId: string;
};

const Layout: React.FC<LayoutProps> = ({ children, userId }: LayoutProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Navbar userId={userId} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
