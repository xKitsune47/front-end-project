import { useState } from "react";
import AddToFavourites from "./AddToFavourites";

function CityDetails({
    children,
    city = "Wrocław",
    temperature = "20",
    weatherDetails,
    cities,
    citiesState,
    onClick,
}) {
    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    function closeCityForecast(e) {
        if (e.key === "Escape") {
            setShowDetails(false);
        }
    }

    document.addEventListener("keydown", closeCityForecast);

    return (
        <div className="city-container">
            <h3>{city}</h3>
            <AddToFavourites
                cities={citiesState}
                city={city}
                onClick={onClick}
            />
            <div className="city-details">
                <table>
                    <tbody>
                        <tr>
                            <td className="item-right">🌡 {temperature}°C</td>
                        </tr>
                        <tr>
                            <td>⛅</td>
                        </tr>
                        <tr>
                            <td>🌧 %, 0mm/m2</td>
                        </tr>
                    </tbody>
                </table>
                {showDetails && (
                    <table>
                        <tbody>
                            <tr>
                                <td>5day forecast</td>
                            </tr>
                        </tbody>
                    </table>
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

export default CityDetails;
