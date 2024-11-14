import { useEffect, useState } from "react";
import AddToFavourites from "./AddToFavourites";
import API_KEY from "../API_KEY";
import { ShowMoreButton } from "./ShowMoreButton";
import { LongtermForecast } from "./LongtermForecast";

const WeatherIcon = ({ iconCode, description, onError }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
        if (onError) onError();
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

function CityDetails({ children, city = "Wrocław", onClick, imperial }) {
    const [showDetails, setShowDetails] = useState(false);
    const [errorCurrent, setErrorCurrent] = useState("");
    const [errorLongterm, setErrorLongterm] = useState("");
    const [loadingCurrent, setLoadingCurrent] = useState(false);
    const [loadingLongterm, setLoadingLongterm] = useState(false);
    const [currentWeather, setCurrentWeather] = useState([]);
    const [longtermWeather, setLongtermWeather] = useState([]);
    const [imageError, setImageError] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    function closeCityForecast(e) {
        if (e.key === "Escape") {
            setShowDetails(false);
        }
    }

    function calcWind(deg) {
        if (deg === undefined) return "X";
        let direction;
        if (deg > 337.5 || deg <= 22.5) {
            direction = "⬇";
        } else if (deg > 22.5 && deg <= 67.5) {
            direction = "↙";
        } else if (deg > 67.5 && deg <= 112.5) {
            direction = "⬅";
        } else if (deg > 112.5 && deg <= 157.5) {
            direction = "↖";
        } else if (deg > 157.5 && deg <= 202.5) {
            direction = "⬆";
        } else if (deg > 202.5 && deg <= 247.5) {
            direction = "↗";
        } else if (deg > 247.5 && deg <= 292.5) {
            direction = "➡";
        } else if (deg > 292.5 && deg <= 337.5) {
            direction = "↘";
        }
        return direction;
    }

    function calcTemp() {
        const tempVar = Math.round(currentWeather?.main?.temp - 273);
        return imperial
            ? Math.round(tempVar * 1.8 + 32) + "°F"
            : tempVar + "°C";
    }

    useEffect(
        function () {
            async function fetchCurrent() {
                try {
                    setLoadingCurrent(true);
                    setErrorCurrent("");
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY()}`
                    );

                    if (!res.ok)
                        throw new Error(
                            "Fetching current weather conditions went wrong"
                        );

                    const data = await res.json();
                    if (data.Response === "False")
                        throw new Error(
                            "Coudln't fetch current weather conditions"
                        );

                    setCurrentWeather(data);
                    setLoadingCurrent(false);
                    setErrorCurrent("");
                } catch (err) {
                    console.error(err);
                    setErrorCurrent(err.message);
                } finally {
                    setLoadingCurrent(false);
                }
            }

            async function fetchLongterm() {
                try {
                    setLoadingLongterm(true);
                    setErrorLongterm("");
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY()}`
                    );

                    if (!res.ok)
                        throw new Error(
                            "Fetching longterm forecast went wrong"
                        );

                    const data = await res.json();
                    if (data.Response === "False")
                        throw new Error(
                            "Couldn't fetch longterm weather forecast"
                        );

                    setLongtermWeather(data);
                    setLoadingLongterm(false);
                    setErrorLongterm("");
                } catch (err) {
                    console.error(err);
                    setErrorLongterm(err.message);
                } finally {
                    setLoadingLongterm(false);
                }
            }

            document.addEventListener("keydown", closeCityForecast);

            fetchCurrent();
            fetchLongterm();

            return function () {
                document.removeEventListener("keydown", closeCityForecast);
            };
        },
        [city]
    );

    return (
        <div className="city-container">
            <h3>{city}</h3>
            <AddToFavourites city={city} onClick={onClick} />
            <div className="city-details">
                {loadingCurrent && "Ładowanie..."}
                {!loadingCurrent && !errorCurrent && (
                    <>
                        <table>
                            <tbody>
                                {/* TEMPERATURE */}
                                <tr>
                                    <td className="item-right">
                                        🌡 {calcTemp()}
                                    </td>
                                </tr>
                                <tr>
                                    {/* WEATHER ICON */}
                                    <td className="text-center">
                                        <WeatherIcon
                                            iconCode={
                                                currentWeather?.weather?.[0]
                                                    ?.icon
                                            }
                                            description={
                                                currentWeather?.weather?.[0]
                                                    ?.description
                                            }
                                            onError={() => setImageError(true)}
                                        />
                                    </td>
                                </tr>
                                {/* RAINFALL */}
                                <tr>
                                    <td>
                                        🌧 {currentWeather?.rain?.["1h"] || "0"}
                                        mm/h
                                    </td>
                                </tr>
                                {/* WIND */}
                                <tr>
                                    <td>
                                        💨 {currentWeather?.wind?.speed || "0"}{" "}
                                        km/h{" "}
                                        {calcWind(currentWeather?.wind?.deg)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {showDetails && (
                            <ShowMoreButton
                                showDetails={showDetails}
                                onShowDetails={handleShowDetails}
                            />
                        )}
                        {showDetails && (
                            <>
                                {loadingLongterm && "Ładowanie..."}
                                {!loadingLongterm && !errorLongterm && (
                                    <table>
                                        <tbody>
                                            {longtermWeather?.list?.map(
                                                (elem) => (
                                                    <LongtermForecast
                                                        data={elem}
                                                        key={elem?.dt_txt}
                                                        imperial={imperial}
                                                    />
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            <ShowMoreButton
                showDetails={showDetails}
                onShowDetails={handleShowDetails}
            />
        </div>
    );
}

export default CityDetails;
