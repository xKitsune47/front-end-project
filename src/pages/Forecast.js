import CityDetails from "../components/CityDetails";
import Header from "../components/Header";

function Forecast({ children, cities, onClick, imperial }) {
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
