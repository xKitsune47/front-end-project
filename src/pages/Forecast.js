import CityDetails from "../components/CityDetails";
import Header from "../components/Header";

function Forecast() {
    return (
        <div>
            <Header />
            <div className="forecast-container">
                <CityDetails />
                <CityDetails />
                <CityDetails />
                <CityDetails />
                <CityDetails />
            </div>
        </div>
    );
}

export default Forecast;
