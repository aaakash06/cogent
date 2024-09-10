import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { ThemeContextProvider } from "@/context/theme";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer";
import ResponsiveSidebar from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable}  ${poppins.variable}`}
      >
        {/* <ThemeContextProvider> */}
        <body className="text-black  overflow-x-hidden antialiased dark:bg-gray-950 dark:text-white">
          <NextTopLoader></NextTopLoader>
          <SectionContainer>
            <Header></Header>
            {children}
          </SectionContainer>
          <Footer />
          <ResponsiveSidebar></ResponsiveSidebar>
        </body>
        {/* </ThemeContextProvider> */}
      </html>
    </ClerkProvider>
  );
}
