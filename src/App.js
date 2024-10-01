import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RedTriangle } from './components/RedTriangle';
import { ColoredTriangle } from './components/ColoredTriangle';
import { RotatingTriangle } from './components/RotatingTriangle';
import { Cube } from './components/Cube';

function App() {
    const username = "Melania"

    return (
        <>
            <Header />

            <RedTriangle></RedTriangle>

            <ColoredTriangle></ColoredTriangle>

            <RotatingTriangle></RotatingTriangle>

            <Cube></Cube>
            <p className="active">{username}</p>
            <Footer />
        </>
    )
}

export default App;
