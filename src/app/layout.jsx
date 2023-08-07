import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import Sidebar from "./components/sidebar/sidebar";
import Providers from "./components/Providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Monolo's Pizza",
  description: "Woohooo Pizzaa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
