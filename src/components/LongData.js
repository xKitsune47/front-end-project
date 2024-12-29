import { LongtermForecast } from "./LongtermForecast";

function LongData({ longtermWeather }) {
    return (
        <table>
            <tbody>
                {longtermWeather?.list?.map((elem) => (
                    <LongtermForecast data={elem} key={elem?.dt_txt} />
                ))}
            </tbody>
        </table>
    );
}

export default LongData;
