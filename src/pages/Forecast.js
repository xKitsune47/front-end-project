import CityDetails from "../components/CityDetails";
import Header from "../components/Header";

function Forecast({ children, cities, onClick, citiesState }) {
    document.title = "Prognoza";

    return (
        <div>
            <Header />
            <div className="forecast-container">
                {cities.map((city) => {
                    return (
                        <CityDetails
                            city={city}
                            cities={citiesState}
                            key={city}
                            citiesState={citiesState}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;
