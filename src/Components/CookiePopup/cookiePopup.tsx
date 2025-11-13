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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-end justify-center sm:items-center"
    >
      <div
        className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md animate-fadeInUp"
      >
        <h3 className="text-lg font-semibold mb-3">Cookies inställningar</h3>
        <p className="text-sm mb-4 leading-relaxed">
          Filmvisarna använder cookies för inloggning och användarsessioner. Fimvisarna använder för nuvarande inte cookies
          för analys eller statistik men kan komma att göra det i framtiden. Du kan hantera dina cookie-inställningar nedan.
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nödvändiga cookies</p>
              <p className="text-xs text-gray-400">
                Krävs för att sidan ska fungera och kan inte stängas av.
              </p>
            </div>
            <div className="relative inline-flex items-center opacity-50 cursor-not-allowed">
              <input aria-label="Nödvändiga cookies" type="checkbox" checked disabled className="sr-only" />
              <div className="w-11 h-6 bg-gray-600 rounded-full"></div>
              <span className="absolute left-[22px] top-[2px] w-5 h-5 bg-gray-400 rounded-full"></span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Statistiska cookies</p>
              <p className="text-xs text-gray-400">
                Hjälper oss förstå hur webbplatsen används (valfritt).
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                aria-label="Statistiska cookies"
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-600 transition"></div>
              <span
                className={`absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
                  analyticsConsent ? "translate-x-5" : ""
                }`}
              ></span>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSavePreferences}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm"
          >
            Spara inställningar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
