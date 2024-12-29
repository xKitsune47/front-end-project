import { useState } from "react";

const WeatherIcon = ({ iconCode, description }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    const iconUrl =
        hasError || !iconCode
            ? "https://openweathermap.org/img/wn/04n@2x.png"
            : `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <img
            src={iconUrl}
            alt={description || "weather icon"}
            onError={handleError}
            className="weather-icon"
            loading="lazy"
        />
    );
};

export default WeatherIcon;
