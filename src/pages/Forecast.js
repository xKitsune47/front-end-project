import CityDetails from "../components/CityDetails";
import Header from "../components/Header";

function Forecast({ children, cities, onClick, citiesState, imperial }) {
    document.title = "Prognoza";

    return (
        <div>
            <Header />
            <div className="forecast-container">
                {cities.map((city) => {
                    return (
                        <CityDetails
                            city={city}
                            key={city}
                            citiesState={citiesState}
                            onClick={onClick}
                            imperial={imperial}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;
