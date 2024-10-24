import { useState } from "react";

function CityDetails({ children, city = "Wrocław", temperature = "20" }) {
    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    return (
        <div className="city-container">
            <h3>{city}</h3>
            <div className="city-details">
                <table>
                    <tr>
                        <td className="item-right">🌡 {temperature}°C</td>
                    </tr>
                    <tr>
                        <td>⛅</td>
                    </tr>
                    <tr>
                        <td>🌧 %, 0mm/m2</td>
                    </tr>
                </table>
                {showDetails && (
                    <table>
                        <tr>
                            <td>5day forecast</td>
                        </tr>
                    </table>
                )}
            </div>
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
        </div>
    );
}

export default CityDetails;
