import { useEffect, useState } from "react";

type CookiePref = {
    necessary: boolean;
    analytics: boolean;
}

const CookiePopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [cookiePref, setCookiePref] = useState<CookiePref>({
        necessary: true,
        analytics: false
    });
}

    useEffect(() => {}, []);
    
