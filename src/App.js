import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/Global.css";
import "./styles/Computer.css";
import "./styles/Mobile.css";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Forecast from "./pages/Forecast";

function App() {
    document.title = "NR 51012";

    // placeholder/initial values
    const initialCities = ["Legnica", "Wrocław", "Opole", "Tokyo", "Berlin"];

    // fetching data from localStorage
    const getLocalStorageItem = (key, defaultValue) => {
        const item = localStorage.getItem(key);
        if (item === null) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
        return JSON.parse(item);
    };

    const [saved, setSaved] = useState(
        getLocalStorageItem("fav_cities", initialCities)
    );

    const [citiesState, setCitiesState] = useState([...saved]);
    const [imperial, setImperial] = useState(
        getLocalStorageItem("imperial", false)
    );

    // removing city form cities state
    function removeCity(elem) {
        return citiesState.filter((ct) => ct !== elem);
    }

    // city lookup
    function handleSearchCity(e) {
        e.preventDefault();
        let term = e.target.firstChild.value;
        term = term[0].toUpperCase() + term.substring(1);
        setCitiesState([...citiesState, term]);
        e.target.firstChild.value = "";
    }

    // addition/removal city to/from favourites
    function handleCity(elem) {
        if (citiesState.includes(elem) && saved.includes(elem)) {
            // removing city from localStorage
            const removedCities = removeCity(elem);
            localStorage.setItem("fav_cities", JSON.stringify(removedCities));
            setSaved(removedCities);
        }
        if (!saved.includes(elem)) {
            // adding city to localStorage
            const addCity = [...saved, elem];
            localStorage.setItem("fav_cities", JSON.stringify(addCity));
            setSaved(addCity);
        }
    }

    // removing city from favs
    function handleDelete(elem) {
        if (saved.includes(elem)) {
            const removeFav = saved.filter((ct) => ct !== elem);
            localStorage.setItem("fav_cities", JSON.stringify(removeFav));
            setSaved(removeFav);
        }
    }

    // change temp type
    function handleImperialChange() {
        const newImperial = !imperial;
        setImperial(newImperial);
        localStorage.setItem("imperial", JSON.stringify(newImperial));
    }

    // clearing the list from empty list elements
    useEffect(() => {
        setCitiesState(removeCity(""));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/prognoza"
                        element={
                            <Forecast
                                cities={citiesState}
                                onClick={handleCity}
                                imperial={imperial}
                                onCityLookup={handleSearchCity}
                            />
                        }
                    />
                    <Route
                        path="/ulubione-miasta"
                        element={
                            <Favourites
                                cities={saved}
                                onDelete={handleDelete}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
            <Footer
                onImperialChange={handleImperialChange}
                imperial={imperial}
            />
        </div>
    );
}

export default App;
