import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link,
    useParams
} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import Footer from "../home/Footer";
import Menu from '../home/Menu';


function ListProduct() {

    const [data, setData] = useState([]);
    const [tongtrang, setTongtrang] = useState(0);
    var items = [];
    let { numberpage } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            await axios("http://localhost:8080/products/" + numberpage)
                .then(result => {
                    setData(result.data);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        fetchData();

        /*tonguser*/
        fetch("http://localhost:8080/countproducts")
            .then(res => res.json())
            .then(
                (result) => {
                    setTongtrang(Math.ceil(result[0].total / 10));
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [numberpage])

    for (var i = 0; i < data.length; i++) {
        items.push(
            <div className="product_item" key={data[i].id}>
                <div className="items">
                    <Link to={'/detailPro/' + data[i].id} >
                        <p><img src={data[i].image} className="App-logo" alt="logo" /></p>
                        <h5>{data[i].name}</h5>
                        <CurrencyFormat value={data[i].price} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
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
        );

    }

    function Pagination() {
        var items = []

        for (var i = 1; i <= tongtrang; i++) {
            items.push(
                <li key={i} className="page-item " > <a className='page-link' href={'/products/' + i}> {i} </a></li>

            );
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {items}
                </ul>
            </nav>
        )

    }
    return (
        <div className="Container">
            <Menu />
            <div className="products">
                <div className="khuyenMaiHot">
                    <div className="nameS">
                        <span>Khuyến mãi hot</span>
                    </div>
                </div>
                <div className="list-pro">
                    {items}
                </div>
                <Pagination />
            </div>
            <div className="footer-ex">
                <Footer />
            </div>
        </div>
    );
}

export default ListProduct;