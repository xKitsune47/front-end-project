import { useEffect, useState } from "react";
import AddToFavourites from "./AddToFavourites";
import API_KEY from "../API_KEY";

function CityDetails({ children, city = "Wrocław", onClick, imperial }) {
    const [showDetails, setShowDetails] = useState(false);
    const [errorCurrent, setErrorCurrent] = useState("");
    const [errorLongterm, setErrorLongterm] = useState("");
    const [loadingCurrent, setLoadingCurrent] = useState(false);
    const [loadingLongterm, setLoadingLongterm] = useState(false);
    const [currentWeather, setCurrentWeather] = useState([]);
    const [longtermWeather, setLongtermWeather] = useState([]);

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
        if (deg > 337.5 && deg < 22.5) {
            direction = "⬇";
        } else if (deg > 22.5 && deg < 67.5) {
            direction = "↙";
        } else if (deg > 67.5 && deg < 112.5) {
            direction = "⬅";
        } else if (deg > 112.5 && deg < 157.5) {
            direction = "↖";
        } else if (deg > 157.5 && deg < 202.5) {
            direction = "⬆";
        } else if (deg > 202.5 && deg < 247.5) {
            direction = "↗";
        } else if (deg > 247.5 && deg < 292.5) {
            direction = "➡";
        } else if (deg > 292.5 && deg < 337.5) {
            direction = "↘";
        }

        return direction;
    }

    document.addEventListener("keydown", closeCityForecast);

    useEffect(function () {
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
                // console.log(data.weather[0].icon);

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
                    throw new Error("Fetching longterm forecast went wrong");

                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Couldn't fetch longterm weather forecast");

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

        fetchCurrent();
        fetchLongterm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(currentWeather?.weather[0].icon);

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
                                        🌡{" "}
                                        {imperial
                                            ? `${
                                                  Math.round(
                                                      currentWeather?.main
                                                          ?.temp - 273
                                                  ) *
                                                      1.8 +
                                                  32
                                              }°F`
                                            : `${Math.round(
                                                  currentWeather?.main?.temp -
                                                      273
                                              )}°C`}
                                    </td>
                                </tr>
                                <tr>
                                    {/* WEATHER ICON */}
                                    <td>
                                        {/* dunno why it's not working */}
                                        {/* <img
                                            src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
                                            alt={
                                                currentWeather?.weather[0]
                                                    ?.description
                                            }
                                        /> */}
                                        <img
                                            src={`https://openweathermap.org/img/wn/04n@2x.png`}
                                            alt="04n"
                                        />
                                    </td>
                                </tr>
                                {/* RAINFALL */}
                                <tr>
                                    <td>🌧 21.37%, 21.37mm/m2</td>
                                </tr>
                                {/* WIND */}
                                <tr>
                                    <td>
                                        💨 {currentWeather?.wind?.speed} km/h{" "}
                                        {calcWind(currentWeather?.wind?.deg)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {showDetails && (
                            <>
                                {loadingLongterm && "Ładowanie..."}
                                {!loadingLongterm && !errorLongterm && (
                                    <table>
                                        <tbody>
                                            {longtermWeather?.list?.map(
                                                (elem) => {
                                                    return (
                                                        <LongtermForecast
                                                            data={elem}
                                                            key={elem?.dt_txt}
                                                        />
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* dynamically choose which icon to show, arrow down if rolled up, arrow up if rolled down */}
            {showDetails ? (
                <svg
                    onClick={handleShowDetails}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-compact-up"
                    viewBox="0 0 16 16">
                    <path
                        fillRule="evenodd"
                        d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"
                    />
                </svg>
            ) : (
                <svg
                    onClick={handleShowDetails}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-compact-down"
                    viewBox="0 0 16 16">
                    <path
                        fillRule="evenodd"
                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"
                    />
                </svg>
            )}
        </div>
    );
}

function LongtermForecast({ children, data }) {
    return (
        <>
            <tr>
                {/* DATETIME */}
                <td className="longterm-wthr-cell">
                    {data?.dt_txt?.slice(0, 10)} <br />
                    {data?.dt_txt?.slice(10, 16)}
                </td>
                {/* WEATHER DATA */}
                <td className="longterm-wthr-data longterm-wthr-cell">
                    {Math.round(data.main.temp - 273)}°C{" "}
                    <img
                        src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                        alt={data?.weather[0]?.description}
                    />
                </td>
            </tr>
            {/* SEPARATOR */}
            <tr>
                <td colSpan={2}>
                    <hr />
                </td>
            </tr>
        </>
    );
}

export default CityDetails;
