import { useEffect, useState } from "react";

type CookiePref = {
  necessary: boolean;
  analytics: boolean;
};

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    const savedPrefs = localStorage.getItem("cookiePreferences");
    if (!savedPrefs) {
      setShowPopup(true);
    } else {
        const prefs = JSON.parse(savedPrefs) as CookiePref;
        setAnalyticsConsent(prefs.analytics);
    }
  }, []);

  const handleSavePreferences = () => {
    const prefs: CookiePref = {
      necessary: true,
      analytics: analyticsConsent,
  };
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
   
  );
};

export default CookiePopup;
