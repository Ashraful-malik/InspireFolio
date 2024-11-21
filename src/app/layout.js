import "./globals.css";
import { AuthProvider } from "../context/authContext";
import { Inter } from "next/font/google";
import RenderNavbar from "../components/RenderNavbar";
import Footer from "../components/Footer";
export const metadata = {
  title: "InspireFolio",
  description:
    "A platform for designers and developers to showcase their portfolio and get inspiration from others.",
  twitter: {
    card: "summary_large_image",
    creator: "@Ashraful__malik",
    title: "InspireFolio - Portfolio Inspiration Platform",
    description:
      "InspireFolio is a platform for designers and developers to showcase their portfolio and get inspiration from others.",
    images: [
      "https://res.cloudinary.com/dxe3cn4ca/image/upload/f_auto,q_auto/v1/public-images/zvdwlo7xd3pidqy7jhu5",
    ],
  },
  openGraph: {
    title: "InspireFolio - Portfolio Inspiration Platform",
    description: "Your project description here.",
    url: "https://inspirefolio.vercel.com",
    images: [
      {
        url: "https://res.cloudinary.com/dxe3cn4ca/image/upload/f_auto,q_auto/v1/public-images/zvdwlo7xd3pidqy7jhu5",
        width: 1200,
        height: 630,
        alt: "A screenshot of InspireFolio, a platform for designers and developers to showcase their portfolio and get inspiration from others.",
      },
    ],
    siteName: "InspireFolio",
    locale: "en_US",
    type: "website",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter ",
  display: "swap",
});

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  return (
    <AuthProvider>
      <html lang="en" className={`${inter.variable} dark `}>
        <body className="bg-white dark:bg-dark-bg dark:text-dark-textPrimary">
          <RenderNavbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
