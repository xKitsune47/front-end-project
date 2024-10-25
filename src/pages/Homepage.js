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
            <p className="hi">
                Hi! This is a final project of a subject called "Front-end
                Programming"
            </p>
        </div>
    );
}

export default Homepage;
