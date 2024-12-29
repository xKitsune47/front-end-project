import { useForecast } from "../contexts/ForecastContext";

export function LongtermForecast({ children, data }) {
    const { calcTemp } = useForecast();

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
                    {calcTemp(data)}
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
