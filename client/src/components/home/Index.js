import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import Menu from "./Menu";
import Slider from "./Slider";
import Footer from "./Footer";
import { Context } from '../../contexts/Context';
function Index() {

    const { products } = useContext(Context)

    return (
        <div className="Container">
            <Menu />
            <Slider />
            <div className="khung-pr">
                <div className="textnotif">

                </div>
            </div>
            <div className="products">
                <div className="khuyenMaiHot">
                    <div className="nameS">
                        <span>Khuyến mãi hot</span>
                    </div>
                </div>
                <div className="list-pro">
                    {products.map((data, i) => {
                        return (
                            <div className="product_item" key={i}>
                                <div className="items">
                                    <Link to={'/detailPro/' + data.id} >
                                        <p><img src={data.image} className="App-logo" alt="logo" /></p>
                                        <h5>{data.name}</h5>
                                        <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
                                            <p>{value}</p>} />
                                    </Link>

                                    <form action="">
                                        <input className="star star-5" id="star-5" type="radio" name="star" />
                                        <label className="star star-5" htmlFor="star-5"></label>
                                        <input className="star star-4" id="star-4" type="radio" name="star" />
                                        <label className="star star-4" htmlFor="star-4"></label>
                                        <input className="star star-3" id="star-3" type="radio" name="star" />
                                        <label className="star star-3" htmlFor="star-3"></label>
                                        <input className="star star-2" id="star-2" type="radio" name="star" />
                                        <label className="star star-2" htmlFor="star-2"></label>
                                        <input className="star star-1" id="star-1" type="radio" name="star" />
                                        <label className="star star-1" htmlFor="star-1"></label>
                                    </form>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className="footer-ex">
                <Footer />
            </div>
        </div>
    );
}

export default Index;