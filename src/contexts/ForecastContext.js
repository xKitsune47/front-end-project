import { createContext, useContext, useEffect, useReducer } from "react";

const ForecastContext = createContext();

// CONSTANT INITIAL/PLACEHOLDER VALUES
const initialCities = ["Legnica", "Wrocław", "Opole", "Tokyo", "Berlin"];

// CONSTANT FUNCTIONS
// get item from local storage
const getLocalStorageItem = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    if (item === null) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
    return JSON.parse(item);
};

// set item in local storage
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// removing city from list
function removeCity(list, elem) {
    return list.filter((ct) => ct !== elem);
}

function reducer(state, action) {
    switch (action.type) {
        case "imperial/changed":
            return { ...state, imperial: !state.imperial };

        case "saved/added":
            return { ...state, citiesState: action.payload };

        case "saved/removed":
            return { ...state, citiesState: action.payload };

        case "saved/updated":
            return { ...state, saved: action.payload };

        case "phrase/added":
            return { ...state, citiesState: action.payload };

        default:
            throw new Error("Operacja nieznana, ForecastContext.js");
    }
}

function ForecastProvider({ children }) {
    const initialState = {
        imperial: getLocalStorageItem("imperial", false),
        saved: getLocalStorageItem("fav_cities", initialCities),
        citiesState: getLocalStorageItem("fav_cities", initialCities),
    };

    const [{ imperial, saved, citiesState }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // changing between imperial and celsius
    function handleImperialChange() {
        dispatch({ type: "imperial/changed" });
        localStorage.setItem("imperial", JSON.stringify(imperial));
    }

    // city lookup
    function handleSearchCity(e) {
        e.preventDefault();
        let term = e.target.firstChild.value;
        term = term[0].toUpperCase() + term.substring(1);

        // if city already in list => early return
        if (saved.includes(term)) {
            alert("Miasto już znajduje się na liście!");
            return;
        }

        dispatch({ type: "phrase/added", payload: [...saved, term] });
        e.target.firstChild.value = "";
    }

    // add/remove city to/from favourites
    function handleCity(elem) {
        let updatedCities;
        if (citiesState.includes(elem) && saved.includes(elem)) {
            // removing city from localStorage
            updatedCities = removeCity(citiesState, elem);
        }
        if (!saved.includes(elem)) {
            // adding city to localStorage
            updatedCities = [...saved, elem];
        }
        setLocalStorage("fav_cities", updatedCities);
        dispatch({ type: "saved/updated", payload: updatedCities });
    }

    // clearing the list from empty list elements
    useEffect(() => {
        dispatch({ type: "phrase/added", payload: [...saved] });
        dispatch({
            type: "saved/updated",
            payload: removeCity(citiesState, ""),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function calcTemp(data) {
        const tempVar = Math.round(data?.main?.temp - 273);
        return imperial
            ? Math.round(tempVar * 1.8 + 32) + "°F"
            : tempVar + "°C";
    }

    function calcWind(deg) {
        if (deg === undefined) return "X";
        if (deg > 337.5 || deg <= 22.5) {
            return "⬇";
        } else if (deg > 22.5 && deg <= 67.5) {
            return "↙";
        } else if (deg > 67.5 && deg <= 112.5) {
            return "⬅";
        } else if (deg > 112.5 && deg <= 157.5) {
            return "↖";
        } else if (deg > 157.5 && deg <= 202.5) {
            return "⬆";
        } else if (deg > 202.5 && deg <= 247.5) {
            return "↗";
        } else if (deg > 247.5 && deg <= 292.5) {
            return "➡";
        } else if (deg > 292.5 && deg <= 337.5) {
            return "↘";
        }
    }

    return (
        <ForecastContext.Provider
            value={{
                // STATES
                imperial,
                citiesState,
                saved,
                // HANDLE CHANGES
                handleImperialChange,
                handleCity,
                handleSearchCity,
                // HANDLE CALCULATIONS
                calcTemp,
                calcWind,
            }}>
            {children}
        </ForecastContext.Provider>
    );
}

function useForecast() {
    const context = useContext(ForecastContext);
    if (context === undefined) {
        throw new Error("ForecastContext użyte poza ForecastProvider");
    }

    return context;
}

export { ForecastProvider, useForecast };
