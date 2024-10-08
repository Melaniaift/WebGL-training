import './App.css';
import { Routes, Route } from "react-router-dom"
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Contact } from './pages/Contact';
import { ContactEu } from './components/ContactEu';
import { ContactIn } from './components/ContactIn';
import { ContactUs } from './components/ContactUs';

import { Objects } from './pages/Objects';
import { Home } from './pages/Home';
import { Product } from './pages/Product'
import { Products } from './pages/Products'
import { PageNotFound } from './pages/PageNotFound';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/objects" element={<Objects />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/contact" element={<Contact />} >
                    <Route path="in" element={<ContactIn />} />
                    <Route path="eu" element={<ContactEu />} />
                    <Route path="us" element={<ContactUs />} />
                </Route>

                <Route path="*" element={<PageNotFound title='404' />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;
