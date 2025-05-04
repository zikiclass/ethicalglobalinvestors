"use client";
import { useEffect, useState } from "react";

export default function ClientSideUtilities() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    fetch("/api/admin/whatsapp")
      .then((res) => res.json())
      .then((data) => setWhatsappNumber(data.whatsapp.whatsappnumber))
      .catch((err) => console.error("Failed to fetch WhatsApp number", err));
  }, []);

  useEffect(() => {
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

    const existingScript = document.getElementById("google_translate_script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
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
    <>
      {/* <div
        id="google_translate_element"
        style={{
          width: "100%",
          padding: "4px 8px",
          position: "fixed",
          top: "0",
          right: "0",
          zIndex: 9999,
          background: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          borderBottomLeftRadius: "8px",
        }}
      /> */}

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
    </>
  );
}
