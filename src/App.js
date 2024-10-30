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
    const [lookup, setLookup] = useState("");
    const [citiesState, setCitiesState] = useState([...saved, lookup]);
    const [imperial, setImperial] = useState(
        JSON.parse(localStorage.getItem("imperial"))
    );

    function handleSearchCity(e) {
        console.log(e);
        setLookup("");
    }

    // city removal and addition in "Forecast" tab
    function handleCity(elem) {
        if (citiesState.includes(elem)) {
            // removes city from localStorage
            const removeCity = citiesState.filter((ct) => ct !== elem);
            setCitiesState(removeCity);
            localStorage.setItem("fav_cities", JSON.stringify(removeCity));
        } else if (!citiesState.includes(elem)) {
            // adds city to localStorage
            const addCity = [
                ...JSON.parse(localStorage.getItem("fav_cities")),
                elem,
            ];
            localStorage.setItem("fav_cities", JSON.stringify(addCity));
        }
    }

    // city removal from "Favourites" tab
    function handleDelete(elem) {
        if (saved.includes(elem)) {
            const removeFav = saved.filter((ct) => ct !== elem);
            localStorage.setItem("fav_cities", JSON.stringify(removeFav));
        }
        setSaved(JSON.parse(localStorage.getItem("fav_cities")));
        setCitiesState(citiesState.filter((ct) => ct !== elem));
    }

    // if ran: changes temp unit C <-> F
    function handleImperialChange() {
        setImperial(!imperial);
        localStorage.setItem("imperial", JSON.stringify(!imperial));
    }

    // checks if the localStorage data is present, if not creates it
    useEffect(function () {
        // placeholder cities
        const initialCities = JSON.stringify([
            "Legnica",
            "Wrocław",
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
        setCitiesState(citiesState.filter((ct) => ct !== ""));
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
