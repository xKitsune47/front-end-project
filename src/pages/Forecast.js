import CityDetails from "../components/CityDetails";
import Header from "../components/Header";
import { useForecast } from "../contexts/ForecastContext";

function Forecast({ children }) {
    document.title = "Prognoza";

    const { citiesState, handleSearchCity } = useForecast();

    return (
        <div>
            <Header />
            <div className="city-lookup">
                <form onSubmit={handleSearchCity}>
                    <input type="text" placeholder="Wpisz miasto" />
                </form>
            </div>
            <div className="forecast-container">
                {citiesState.map((city) => {
                    return <CityDetails city={city} key={city} />;
                })}
            </div>
        </div>
    );
}

export default Forecast;
