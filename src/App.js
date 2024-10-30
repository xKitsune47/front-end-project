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
    const saved = JSON.parse(localStorage.getItem("fav_cities"));
    const [imperial, setImperial] = useState(false);

    const [citiesState, setCitiesState] = useState(saved);

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
            setCitiesState(addCity);
            localStorage.setItem("fav_cities", JSON.stringify(addCity));
        }
    }

    // city removal from "Favourites" tab
    function handleDelete(elem) {
        if (citiesState.includes(elem)) {
            const removeFav = citiesState.filter((ct) => ct !== elem);
            setCitiesState(removeFav);
            localStorage.setItem("fav_cities", JSON.stringify(removeFav));
        }
    }

    // if ran: changes temp unit C <-> F
    function handleImperialChange() {
        setImperial(!imperial);
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
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route
                        path="/prognoza"
                        element={
                            <Forecast
                                cities={saved}
                                onClick={handleCity}
                                citiesState={citiesState}
                                imperial={imperial}
                            />
                        }></Route>
                    <Route
                        path="/ulubione-miasta"
                        element={
                            <Favourites
                                cities={citiesState}
                                onDelete={handleDelete}
                            />
                        }></Route>
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
//
// dorobic zmiane jednostek Cels <-> Fahr w footerze, zrobic to stanem w
// najwyzszym w hierarchii pliku App.js
//
// dodac fetchowanie z API openweathermap
