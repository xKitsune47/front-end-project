import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/Global.css";
import "./styles/Computer.css";
import "./styles/Mobile.css";
// import Placeholder from "./components/Placeholder";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Forecast from "./pages/Forecast";

function App() {
    document.title = "NR 51012";

    const [saved, setSaved] = useState(
        JSON.parse(localStorage.getItem("fav_cities"))
    );
    const [citiesState, setCitiesState] = useState([...saved]);
    const [imperial, setImperial] = useState(
        JSON.parse(localStorage.getItem("imperial"))
    );

    // removing city from citiesState state
    function removeCity(elem) {
        return citiesState.filter((ct) => ct !== elem);
    }

    function handleSearchCity(e) {
        e.preventDefault();

        const term = e.target.firstChild.value;

        setCitiesState([...citiesState, term]);
        e.target.firstChild.value = "";
    }

    // city removal and addition to favs
    function handleCity(elem) {
        if (citiesState.includes(elem) && saved.includes(elem)) {
            // removes city from localStorage
            const removedCities = removeCity(elem);
            localStorage.setItem("fav_cities", JSON.stringify(removedCities));
            setSaved(removedCities);
        }
        if (!saved.includes(elem)) {
            // adds city to localStorage
            const addCity = [
                ...JSON.parse(localStorage.getItem("fav_cities")),
                elem,
            ];

            localStorage.setItem("fav_cities", JSON.stringify(addCity));
            setSaved(JSON.stringify(addCity));
        }
    }

    // city removal from favs
    function handleDelete(elem) {
        if (saved.includes(elem)) {
            const removeFav = saved.filter((ct) => ct !== elem);
            localStorage.setItem("fav_cities", JSON.stringify(removeFav));
        }
        setSaved(JSON.parse(localStorage.getItem("fav_cities")));
        setCitiesState(removeCity(elem));
    }

    // if executed: changes temp unit C <-> F
    function handleImperialChange() {
        setImperial(!imperial);
        localStorage.setItem("imperial", JSON.stringify(!imperial));
    }

    // checks if the localStorage data is present, if not creates it
    useEffect(function () {
        // placeholder cities
        const initialCities = JSON.stringify([
            "Legnica",
            // "Wrocław",
            // "Poznań",
            // "Opole",
            // "Zielona Góra",
        ]);
        // if saved cities list is empty, place in a list of placeholder cities
        JSON.parse(localStorage.getItem("fav_cities")).length === 0 &&
            localStorage.setItem("fav_cities", initialCities);

        // if temperature unit is null, create bool state
        JSON.parse(localStorage.getItem("imperial")) === null &&
            localStorage.setItem("imperial", false);

        // clear list from empty citiesState elements
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

// TODO
// zrobic formularz do dodawania miast, przerobic wyswietlane miasta tak
// aby mozna bylo dodac miasto z formularza, ktore bazowo jest NIEDODANE
// do ulubionych i trzeba dodac, w innym wypadku po reloadzie strony
// miasto to nie bedzie sie wyswietlac
