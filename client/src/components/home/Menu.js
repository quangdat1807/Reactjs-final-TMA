import React, { useState, useContext, useEffect } from 'react';
import { UncontrolledPopover, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { Context } from '../../contexts/Context';
import CurrencyFormat from 'react-currency-format';

import "../home/css/Menu.css"
function Menu() {

    const { categories, cart, requestSearch, inputSearch, dataSearch } = useContext(Context);

    const [productSearch, setProductSearch] = useState([])

    var adminUser = [];

    const getUser = localStorage.getItem('ten@key');
    if (getUser === "admin") {
        adminUser.push(
            <div key={getUser} className="colors sub-a object">
                <Link to="/admin/dashboard" className="item-lv1-title" id="admin">Admin</Link>
            </div>
        )
    }
    const clearLogin = () => {
        localStorage.removeItem('ten@key');
        window.location.reload(false);
        window.location.assign('http://localhost:3000/login');
    }

    useEffect(() => {
        inputSearch !== "" ? setProductSearch(dataSearch) : setProductSearch([])
    }, [inputSearch])

    return (
        <>
            <nav id="nav-bar">
                <ul className="menu-lv1">
                    <div className="logoHome">
                        <Link to="/">
                            <img src="https://clickbuy.com.vn/clickbuy.png" alt="" />
                        </Link>
                    </div>
                    <div className="box">
                        <div className="container-search">
                            <div className=''>
                                <Input type='text' id='PopoverFocus' placeholder=" Bạn cần tìm gì ...?"
                                    onChange={requestSearch} />
                                <UncontrolledPopover
                                    placement="bottom"
                                    target="PopoverFocus"
                                    trigger="focus">
                                    <ul className='list-group' style={{ minWidth: '200px' }}>
                                        {productSearch.map((item) => {
                                            return (
                                                <Link key={item.id} to={'/detailPro/' + item.id}>
                                                    <li className="list-group-item d-flex justify-content-between align-items-start">

                                                        <img src={item.image} style={{ width: '40px', height: '40px' }}></img>
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">{item.name}</div>
                                                            <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
                                                                <p style={{ fontWeight: '500', color: '#FF0000' }}>{value}</p>} />
                                                        </div>
                                                    </li>
                                                </Link>
                                            )
                                        })}
                                    </ul>

                                </UncontrolledPopover>
                            </div>
                        </div>
                    </div>
                    <li className="item-lv1">
                        <div className="colors sub-a object">
                            <Link to="/products/1" href="#" className="item-lv1-title" id="phone">Điện thoại</Link>
                        </div>
                        <ul className="menu-lv2">
                            {categories.map((item, i) => {
                                return (
                                    <li key={i} className="item-lv2">
                                        <Link to={"/products/category/" + item.id} className="item-group" >{item.name}</Link>
                                    </li>
                                )

                            })}
                        </ul>
                    </li>
                    <li className="item-lv1">
                        <div className="colors sub-a object">
                            <a href="#" className="item-lv1-title" id="laptop">Laptop</a>
                        </div>
                    </li>
                    <li className="item-lv1">
                        <div className="colors sub-a object">
                            <a href="#" className="item-lv1-title" id="tablet">Tablet</a>
                        </div>
                    </li>
                    <li className="item-lv1">
                        <div className="colors sub-a object">
                            <a href="#" className="item-lv1-title" id="phuKien">Phụ kiện</a>
                        </div>
                    </li>
                    <li className="item-lv1">
                        <div className="colors sub-a object">
                            <a href="#" className="item-lv1-title" id="hoTro">Hỗ Trợ</a>
                        </div>
                    </li>
                    <li className="item-lv1">
                        {adminUser}
                    </li>
                    <li className="item-lv1 cart">
                        <div className="colors sub-a object">
                            <Link to="/checkout" className="item-lv1-title" id="cart" >
                                <span className='cartCount'>{cart.length}</span></Link>
                        </div>
                    </li>

                    <li className="item-lv1">
                        <span className="name-user">{getUser}</span>
                        <i onClick={clearLogin} className="fas fa-sign-out-alt" style={{color: '#fff'}}></i>
                    </li>

                </ul>
                <div className="cb_rbar">
                    <a href="https://www.facebook.com/" title="Fanpage"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/watch?v=YQHsXMglC9A" title="My channel"><i className="fa fa-youtube"></i></a>
                    <span id="myButton" title="lên đầu trang"><i className="fa fa-angle-up"></i></span>
                </div>
            </nav >

        </>
    );
}

export default Menu;