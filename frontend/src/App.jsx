import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("history");
  }

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }

    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  async function getWeather() {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Search for city!");
      return;
    }

    localStorage.setItem("lastCity", trimmedCity);

    const updatedHistory = [
      trimmedCity,
      ...history.filter((h) => h !== trimmedCity),
    ].slice(0, 5);

    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5001/weather?city=${trimmedCity}`,
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>🌤️ Weather App</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getWeather();
            }}
          />

          <button onClick={getWeather}>Search</button>
        </div>

        {history.length > 0 && (
          <>
            <div className="history">
              <p>Recent searches:</p>

              <div className="history-list">
                {history.map((item, index) => (
                  <button
                    key={index}
                    className="history-item"
                    onClick={() => {
                      setCity(item);
                      getWeather();
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button className="clear-btn" onClick={clearHistory}>
              Clear history
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}

        {loading && <p className="loading">Loading weather...</p>}

        {!loading && weather && (
          <>
            <WeatherCard weather={weather} />
            <Forecast forecast={weather.forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
