"use client";
import { useEffect } from "react";
import "./globals.css";
import { Metadata } from "next";
import { Inter, Signika_Negative } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";

// Assign the font loaders to consts with specified subsets
const inter = Inter({ subsets: ["latin"] });
const signika = Signika_Negative({ subsets: ["latin"] });

const metadata = {
  title:
    process.env.PROJECT_NAME +
    ": The Online Trading and Mining Platform - " +
    process.env.PROJECT_NAME,
  description:
    "Sign up With Trade Experts Market to join thousands of traders currently benefiting from high leveraged full STP/ECN CFD trading with zero conflict of interest through tier one liquidity.",
  icons: {
    icon: "/img/Trading.jpeg", // Path must be in `public/`
  },
};

export default function RootLayout({ children }) {
  // Adding the Smartsupp chat script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.smartsuppchat.com/loader.js?";
    script.async = true;
    script.onload = () => console.log("Smartsupp chat script loaded!");

    // Set Smartsupp key
    const smartsuppScript = document.createElement("script");
    smartsuppScript.type = "text/javascript";
    smartsuppScript.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'c145dbe0090309a4e1d690af2ade7b381481f961';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.body.appendChild(script);
    document.body.appendChild(smartsuppScript);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(smartsuppScript);
    };
  }, []); // Empty dependency array to ensure it's only added once when the component mounts

  return (
    <html lang="en">
      <body className={signika.className}>
        <AuthProvider>
          <ThemeProvider attribute="class">
            <Theme appearance="dark">{children}</Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
