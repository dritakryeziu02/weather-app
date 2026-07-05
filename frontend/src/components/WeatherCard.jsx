function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>
        {weather.location.name}, {weather.location.country}
      </h2>

      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />

      <h1>{weather.current.temp_c}°C</h1>

      <p>{weather.current.condition.text}</p>

      <p>Feels like: {weather.current.feelslike_c}°C</p>

      <p>Humidity: {weather.current.humidity}%</p>

      <p>Wind: {weather.current.wind_kph} km/h</p>
    </div>
  );
}

export default WeatherCard;
