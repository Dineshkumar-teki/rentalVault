import "@/assests/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { GlobalProvider } from "@/context/GlobalContext";
import logo from "@/assests/styles/images/appLogo.png";

export const metadata = {
  title: "RentalVault | Discover Your Ideal Rental Property",
  description:
    "Search for your dream rental property with RentalVault. Explore various types of rentals, add listings, and find the perfect home for you.",
  keywords:
    "rental, find rentals, rental properties, home rental, rental management, discover rentals, apartment rentals, house rentals",
  logo: logo, // Replace with the actual path to your logo
};

export const dynamic = "force-dynamic";

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
