import { useEffect, useState } from "react";

const quotes = [
  "Indeed, Allah is with the patient. (Quran 2:153)",
  "And He found you lost and guided you. (Quran 93:7)",
  "So remember Me; I will remember you. (Quran 2:152)",
  "Do not despair of the mercy of Allah. (Quran 39:53)"
];

export default function QuoteSection({ darkMode }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className={`p-6 text-center rounded-2xl shadow-lg mt-6 transition-colors duration-500
      ${darkMode ? "bg-green-900 text-gray-100" : "bg-green-100 text-gray-800"}
    `}>
      <p className="text-xl italic">{quote}</p>
    </div>
  );
}