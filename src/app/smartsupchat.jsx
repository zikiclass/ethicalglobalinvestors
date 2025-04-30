"use client";

import { useEffect } from "react";

export default function SmartsuppChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.smartsuppchat.com/loader.js?";
    script.async = true;

    const smartsuppScript = document.createElement("script");
    smartsuppScript.type = "text/javascript";
    smartsuppScript.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '27946429bd10e3c3605575a3e91fdf4618a2bf83';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;

    document.body.appendChild(script);
    document.body.appendChild(smartsuppScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(smartsuppScript);
    };
  }, []);

  return null;
}
