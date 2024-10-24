import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Strona Główna 📄</NavLink>
                    </li>
                    <li>
                        <NavLink to="/prognoza">Prognoza ⛅</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ulubione-miasta">
                            Ulubione Miasta ⭐
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
