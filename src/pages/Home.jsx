// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import QuoteSection from "../components/QuoteSection";
import Loading from "../components/Loading";

export default function Home({ tasks }) {
  const [prayer, setPrayer] = useState(null);
  const [loadingPrayer, setLoadingPrayer] = useState(true);

  useEffect(() => {
    async function fetchPrayer() {
      try {
        const resp = await axios.get(
          "https://api.aladhan.com/v1/timingsByCity?city=Addis%20Ababa&country=Ethiopia&method=2"
        );
        setPrayer(resp.data.data.timings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPrayer(false);
      }
    }
    fetchPrayer();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Islamic To-Do App</h1>
      <QuoteSection />

      <h2 className="text-2xl font-bold mb-2">🕌 Prayer Times</h2>
      {loadingPrayer ? (
        <Loading />
      ) : prayer ? (
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(prayer).map(([name, time]) => (
            <li key={name} className="bg-green-100 dark:bg-green-800 p-3 rounded shadow">
              <strong>{name}:</strong> {time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No prayer times available</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-2">📝 Today’s Tasks</h2>
      <ul className="list-disc ml-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </li>
          ))
        ) : (
          <p>No tasks for today!</p>
        )}
      </ul>
    </div>
  );
}
