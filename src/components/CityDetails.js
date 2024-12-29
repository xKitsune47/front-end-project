import { useEffect, useReducer } from "react";
import AddToFavourites from "./AddToFavourites";
import API_KEY from "../API_KEY";
import { ShowMoreButton } from "./ShowMoreButton";
import ShortData from "./ShortData";
import LongData from "./LongData";

const URL = "https://api.openweathermap.org/data/2.5";

const initialState = {
    showDetails: false,
    errorCurrent: "",
    errorLongterm: "",
    loadingCurrent: false,
    loadingLongterm: false,
    currentWeather: {},
    longtermWeather: {},
    imageError: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "current/loading":
            return { ...state, loadingCurrent: true };

        case "current/loaded":
            return { ...state, loadingCurrent: false };

        case "longterm/loading":
            return { ...state, loadingLongterm: true };

        case "longterm/loaded":
            return { ...state, loadingLongterm: false };

        case "image/error":
            return { ...state, imageError: true };

        case "details/toggle":
            return { ...state, showDetails: !state.showDetails };

        case "details/hidden":
            return { ...state, showDetails: action.payload };

        case "currentData/loaded":
            return {
                ...state,
                currentWeather: action.payload,
                loadingCurrent: false,
            };

        case "longtermData/loaded":
            return {
                ...state,
                longtermWeather: action.payload,
                loadingLongterm: false,
            };

        case "current/rejected":
            return {
                ...state,
                errorCurrent: action.payload,
                loadingCurrent: false,
            };

        case "longterm/rejected":
            return {
                ...state,
                errorLongterm: action.payload,
                loadingLongterm: false,
            };

        default:
            throw new Error("Operacja nieznana, CityDetails.js");
    }
}

function CityDetails({ children, city = "Wrocław" }) {
    const [
        {
            showDetails,
            errorCurrent,
            errorLongterm,
            loadingCurrent,
            loadingLongterm,
            currentWeather,
            longtermWeather,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    function handleShowDetails() {
        dispatch({ type: "details/toggle" });
    }

    function closeCityForecast(e) {
        if (e.key === "Escape") {
            dispatch({ type: "details/hidden", payload: false });
        }
    }

    useEffect(
        function () {
            async function fetchCurrent() {
                dispatch({ type: "current/loading" });
                try {
                    const res = await fetch(
                        `${URL}/weather?q=${city}&appid=${API_KEY()}`
                    );
                    const data = await res.json();
                    dispatch({ type: "currentData/loaded", payload: data });
                } catch (err) {
                    console.error(err);
                    dispatch({
                        type: "current/rejected",
                        payload: err.message,
                    });
                }
            }

            async function fetchLongterm() {
                dispatch({ type: "longterm/loading" });
                try {
                    const res = await fetch(
                        `${URL}/forecast?q=${city}&appid=${API_KEY()}`
                    );
                    const data = await res.json();
                    dispatch({ type: "longtermData/loaded", payload: data });
                } catch (err) {
                    console.error(err);
                    dispatch({
                        type: "longterm/rejected",
                        payload: err.message,
                    });
                }
            }

            document.addEventListener("keydown", closeCityForecast);

            fetchCurrent();
            fetchLongterm();

            return function () {
                document.removeEventListener("keydown", closeCityForecast);
            };
        },
        [city]
    );

    return (
        <div className="city-container">
            <h3>{city}</h3>
            <AddToFavourites city={city} />
            <div className="city-details">
                {loadingCurrent && "Ładowanie..."}
                {!loadingCurrent && !errorCurrent && (
                    <>
                        <ShortData currentWeather={currentWeather} />
                        <ShowMoreButton
                            showDetails={showDetails}
                            onShowDetails={handleShowDetails}
                        />
                        {showDetails && (
                            <>
                                {loadingLongterm && "Ładowanie..."}
                                {!loadingLongterm && !errorLongterm && (
                                    <LongData
                                        longtermWeather={longtermWeather}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            {showDetails && (
                <ShowMoreButton
                    showDetails={showDetails}
                    onShowDetails={handleShowDetails}
                />
            )}
        </div>
    );
}

export default CityDetails;
