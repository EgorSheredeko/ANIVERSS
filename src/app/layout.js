import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import Providers from "./providers";
import Header from "../components/Header";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","600","700"] });

export const metadata = {
  title: "AniVers",
  description: "Watch, Share & Discuss Your Favorite Anime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.className} bg-[#0c0a1a] text-[#e0dff5]`}
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Providers>
          <Header />
          <div
            className="scroll-container"
            style={{
              height: "100vh",
              width: "100vw",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
