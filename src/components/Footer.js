function Footer({ children, onImperialChange, imperial }) {
    return (
        <div className="footer">
            <p>
                Jednostka: {imperial ? "Fahrenheit" : "Celsjusz"}{" "}
                <span className="change-units" onClick={onImperialChange}>
                    Zmień
                </span>
            </p>
        </div>
    );
}

export default Footer;
