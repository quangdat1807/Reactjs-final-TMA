import React, { useState, useEffect, useContext, useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { AddShoppingCart } from '@material-ui/icons';
import Menu from '../home/Menu';
import toast, { Toaster } from 'react-hot-toast';
import "../products/css/Detail.css"
import { Context } from '../../contexts/Context';
import CurrencyFormat from 'react-currency-format';
import Footer from '../home/Footer';


const DetailPro = () => {

    let { id } = useParams();
    const [data, setData] = useState([]);

    const { addCart } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            await axios("http://localhost:8080/detail/" + id)
                .then(result => {
                    setData(result.data);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        fetchData();
    }, [id])

    const [event, setEvent] = useState(false)

    const handleCheck = () => {
        setEvent(false)
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         handleCheck();
    //     }, 5000)
    // }, [])

    const handleSubmitAdd = () => {
        setEvent(true)
        setTimeout(() => {
            handleCheck();
        }, 3000);

    }

    console.log(event)

    const renderData = (data) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <main key={index} className="container-cart">

                            <div className="left-column">
                                <img src={item.image} alt="" style={{ width: '300px' }} />

                            </div>

                            <div className="right-column">
                                <div className="product-description">
                                    <span>Sản phẩm</span>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                </div>

                                <div className="product-configuration">

                                    <div className="cable-config">
                                        <span>Phiên bản</span>
                                        <div className="cable-choose">
                                            <button>6/128GB</button>
                                            <button>6/256GB</button>
                                            <button>8/512GB</button>
                                        </div>
                                        <div className="product-price">
                                            <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'₫'} renderText={value =>
                                                <span className='icon-price' style={{color: '#e10c00'}}>{value}</span>} />
                                        </div>
                                        <a href="#">Bảo hành 12 tháng tại trung tâm ủy quyền chính hãng</a>
                                    </div>
                                </div>

                                <button onClick={() => addCart(item.id)} className="cart-btn"><Link to={'/checkout'} style={{ color: 'white' }}>Mua ngay</Link></button>

                                <button className="btn btn" style={{ margin: "10px" }} onClick={() => { addCart(item.id); handleSubmitAdd() }} disabled={event} >
                                    <AddShoppingCart />
                                </button>
                                <Toaster />

                            </div>
                        </main >
                    );
                })}
            </>
        )
    }

    function NavNoti() {
        var items = [];
        for (var i = 0; i < data.length; i++) {
            items.push(
                <ul key={i} className="noti-header">
                    <li className="noti-item">
                        <a href="/">Trang chủ</a></li>
                    <span> » </span>
                    <li className="noti-item">
                        <a href="/product/1">Điện thoại</a></li>
                    <span> » </span>
                    <li key={i} className="noti-item">
                        <a >{data[i].name}</a></li>
                </ul>
            )
        }
        return (
            <div className="noti">
                {items}
            </div>
        )
    }

    return (
        <>
            <Menu />
            <NavNoti />
            {renderData(data)}
            <Footer />
        </>
    );

}

export default DetailPro;