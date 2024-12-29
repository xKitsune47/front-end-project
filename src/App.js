import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/Global.css";
import "./styles/Computer.css";
import "./styles/Mobile.css";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Forecast from "./pages/Forecast";
import { ForecastProvider } from "./contexts/ForecastContext";

function App() {
    document.title = "NR 51012";

    return (
        <ForecastProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/prognoza" element={<Forecast />} />
                    <Route path="/ulubione-miasta" element={<Favourites />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </ForecastProvider>
    );
}

export default App;
