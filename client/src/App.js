import "./App.css";

import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import NotFound from "./components/home/NotFound";
import Login from "./components/home/Login";
import Admin from "./components/dashboard/Admin";
import ListProduct from "./components/products/ListProduct";
import DetailPro from "./components/products/DetailPro";
import Home from "./components/home/Index";
import Add from "./components/dashboard/Add";
import Edit from "./components/dashboard/Edit";
import { CheckOut } from "./components/checkout/CheckOut";
import { ProductsCate } from "./components/products/ProductsCate";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detailPro/:id" element={<DetailPro />} />
            <Route path="/products/:numberpage" element={<ListProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/products/:numberpage" element={<Admin />} />
            <Route path="/api/product" element={<Add />} />
            <Route path="/api/product/:id" element={<Edit />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/products/category/:id" element={<ProductsCate />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}


export default App;
