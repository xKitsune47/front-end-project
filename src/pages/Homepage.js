import Header from "../components/Header";

function Homepage() {
    document.title = "NR 51012";

    return (
        <div>
            <Header />
            <div>
                <p className="hi">
                    Hejka! To jest projekt zaliczeniowy z przedmiotu
                    "Programowanie Front-end"
                </p>
            </div>
        </div>
    );
}

export default Homepage;
