import { useForecast } from "../contexts/ForecastContext";
import WeatherIcon from "./WeatherIcon";

function ShortData({ currentWeather }) {
    const { calcTemp, calcWind } = useForecast();

    return (
        <table>
            <tbody>
                {/* TEMPERATURE */}
                <tr>
                    <td className="item-right">🌡 {calcTemp(currentWeather)}</td>
                </tr>
                <tr>
                    {/* WEATHER ICON */}
                    <td className="text-center">
                        <WeatherIcon
                            iconCode={currentWeather?.weather?.[0]?.icon}
                            description={
                                currentWeather?.weather?.[0]?.description
                            }
                        />
                    </td>
                </tr>
                {/* RAINFALL */}
                <tr>
                    <td>
                        🌧 {currentWeather?.rain?.["1h"] || "0"}
                        mm/m2, 21.37%
                    </td>
                </tr>
                {/* WIND */}
                <tr>
                    <td>
                        💨 {currentWeather?.wind?.speed || "0"} km/h{" "}
                        {calcWind(currentWeather?.wind?.deg)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ShortData;
