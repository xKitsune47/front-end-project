import Header from "../components/Header";

function Homepage() {
    document.title = "NR 51012";

    return (
        <div>
            <Header />
            <p className="hi">
                Hejka! To jest projekt zaliczeniowy z przedmiotu "Programowanie
                Front-end"
            </p>
        </div>
    );
}

export default Homepage;
