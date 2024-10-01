import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RedT } from './components/RedT';
import { ColoredTriangle } from './components/ColoredTriangle';

function App() {
    const username = "Melania"

    return (
        <>
            <Header />
            <div className="App">

            </div>
            <RedT></RedT>

            <ColoredTriangle></ColoredTriangle>
            
            <p className="active">{username}</p>
            <Footer />
        </>
    )
}

export default App;
