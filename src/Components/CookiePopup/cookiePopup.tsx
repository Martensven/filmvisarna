import { useEffect, useState } from "react";

type CookiePref = {
  necessary: boolean;
  analytics: boolean;
};

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [cookiePref, setCookiePref] = useState<CookiePref>({
    necessary: true,
    analytics: false,
  });


useEffect(() => {
    const savedPrefs = localStorage.getItem("cookiePreferences");
    if (!savedPrefs) {
      setShowPopup(true);
    }
}, []);

const handleAcceptAll = () => {
    const prefs = { necessary: true, analytics: true };
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    setCookiePref(prefs);
    setShowPopup(false);
};

const handleOnlyNecessary = () => {
    const prefs = { necessary: true, analytics: false };
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    setCookiePref(prefs);
    setShowPopup(false);
};

    if (!showPopup) return null;

}


export default CookiePopup;
