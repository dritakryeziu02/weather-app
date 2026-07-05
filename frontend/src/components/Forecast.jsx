function Forecast({ forecast }) {
  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5 Day Forecast</h3>

      <div className="forecast-scroll">
        {forecast.forecastday.map((day) => (
          <div key={day.date} className="forecast-card">
            <p className="forecast-date">
              {new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
              })}
            </p>

            <img src={day.day.condition.icon} alt={day.day.condition.text} />

            <p className="forecast-temp">{Math.round(day.day.avgtemp_c)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
