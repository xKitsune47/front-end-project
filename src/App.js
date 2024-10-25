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

    const [citiesState, setCitiesState] = useState(saved);
    function handleCity(elem) {
        if (citiesState.includes(elem)) {
            setCitiesState(citiesState.filter((cty) => cty !== elem));
            localStorage.setItem(
                "fav_cities",
                JSON.stringify(citiesState.filter((ct) => ct !== elem))
            );
        } else if (!citiesState.includes(elem)) {
            setCitiesState([
                ...JSON.parse(localStorage.getItem("fav_cities")),
                elem,
            ]);
            localStorage.setItem(
                "fav_cities",
                JSON.stringify([
                    ...JSON.parse(localStorage.getItem("fav_cities")),
                    elem,
                ])
            );
        }
    }

    function handleDelete(elem) {
        if (citiesState.includes(elem)) {
            setCitiesState(citiesState.filter((cty) => cty !== elem));
            localStorage.setItem(
                "fav_cities",
                JSON.stringify(citiesState.filter((ct) => ct !== elem))
            );
        }
    }

    useEffect(function () {
        // placeholder cities
        const initialCities = JSON.stringify([
            "Legnica",
            "Wrocław",
            "Poznań",
            "Opole",
            "Zielona Góra",
        ]);
        // if saved cities list is empty, place in a list of placeholder cities
        JSON.parse(localStorage.getItem("fav_cities")).length === 0 &&
            localStorage.setItem("fav_cities", initialCities);
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
            <Footer />
        </div>
    );
}

export default App;

// TODO
//
