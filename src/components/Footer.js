import { useForecast } from "../contexts/ForecastContext";

function Footer() {
    const { handleImperialChange, imperial } = useForecast();
    return (
        <div className="footer">
            <p>
                Jednostka: {imperial ? "Fahrenheit" : "Celsjusz"}{" "}
                <span className="change-units" onClick={handleImperialChange}>
                    Zmień
                </span>
            </p>
        </div>
    );
}

export default Footer;
