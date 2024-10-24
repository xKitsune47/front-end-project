import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/Global.css";
import "./styles/Computer.css";
import "./styles/Mobile.css";
// import Placeholder from "./components/Placeholder";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Forecast from "./pages/Forecast";

function App() {
    document.title = "Prognoza Pogody";

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path="/prognoza" element={<Forecast />}></Route>
                    <Route
                        path="/ulubione-miasta"
                        element={<Favourites />}></Route>
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
