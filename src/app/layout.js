"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { Inter, Signika_Negative } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });
const signika = Signika_Negative({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    fetch("/api/admin/whatsapp")
      .then((res) => res.json())
      .then((data) => setWhatsappNumber(data.whatsapp.whatsappnumber))
      .catch((err) => console.error("Failed to fetch WhatsApp number", err));
  }, []);

  useEffect(() => {
    // Define the callback globally
    window.googleTranslateElementInit = () => {
      if (
        typeof window.google !== "undefined" &&
        typeof window.google.translate !== "undefined"
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    // Avoid loading the script multiple times
    const existingScript = document.getElementById("google_translate_script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script); // Important: append to head, not body
    } else {
      // If script is already present but widget hasn't shown, call init again
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }

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
    document.body.appendChild(smartsuppScript);

    return () => {
      document.body.removeChild(smartsuppScript);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/img/Trading.jpeg"
          type="image/x-icon"
        />
        <meta
          name="description"
          content="Sign up With Trade Experts Market to join thousands of traders currently benefiting from high leveraged full STP/ECN CFD trading with zero conflict of interest through tier one liquidity."
        />
      </head>
      <body className={signika.className}>
        {/* Google Translate Bar */}
        <div
          id="google_translate_element"
          style={{
            width: "100%", // Make the container full width
            background: "none!important6",
            height: "0px",
            padding: "0px",
            position: "relative",
            zIndex: 9999,
            textAlign: "right",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/+${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 9999,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="Chat on WhatsApp"
            width="50"
            height="50"
          />
        </a>

        <AuthProvider>
          <ThemeProvider attribute="class">
            <Theme appearance="dark">{children}</Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
