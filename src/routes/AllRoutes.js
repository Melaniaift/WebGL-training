import { Routes, Route } from "react-router-dom";
import { Contact, Objects, Home, Product, Products, PageNotFound, ContactEu, ContactIn, ContactUs } from '../pages/index';

export const AllRoutes = () => {
    return (
        <>
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
        </>
    )
}
