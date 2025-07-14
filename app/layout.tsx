import type { Metadata } from "next"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { Providers } from "./providers"
// import "../styles/ProjectStyles/ProjectStyles.css"
import "./../styles/ProjectStyles/ProjectStyles.css"
import PageTransition from "../components/PageTransition/PageTransition"

export const metadata: Metadata = {
  title: "The WildKingston",
  description: "Products for your beautiful pets",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="wrapper">
            <PageTransition/>

            <Header/>
            <main className="main">
              {children}
            </main>
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  )
}
