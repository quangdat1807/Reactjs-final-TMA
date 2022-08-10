import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Link,
  useParams
} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import Footer from "../home/Footer";
import Menu from '../home/Menu';
import { Context } from '../../contexts/Context';

export const ProductsCate = () => {
  const { categories } = useContext(Context);
  const [products, setProducts] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const ProductsCate = async () => {
      await axios("http://localhost:8080/products/category/" + id)
        .then(result => {
          setProducts(result.data);
        },
          (err) => {
            console.log(err);
          })
    };
    ProductsCate();
  }, [id])

  function NavNoti() {

    let items = [];
    let message = [];


    if (products.length !== 0) {
      for (let i = 0; i < categories.length; i++) {
        if (products[0].idcategory == categories[i].id) {
          items.push(categories[i].name);
        }
      }
    } else {
      message.push("Hiện tại không có loại sản phẩm này!")
    }
    return (
      <div className="noti">
        <ul className="noti-header">
          <li className="noti-item">
            <a href="/">Trang chủ</a></li>
          <span> » </span>
          <li className="noti-item">
            <a href="/product/1">Điện thoại</a></li>
          <span> » </span>
          <li className="noti-item">
            {items}
            {message}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="Container">
      <div className="menu">
        <Menu />
      </div>
      <div className="products">
        <div className="khuyenMaiHot">
          <div className="nameS">
            <span>Khuyến mãi hot</span>
          </div>
        </div>
        <NavNoti />

        <div className="list-pro">
          {products.map((item) => {
            return (
              <div className="product_item" key={item.id}>
                <div className="items">
                  <Link to={'/detailPro/' + item.id} >
                    <p><img src={item.image} className="App-logo" alt="logo" /></p>
                    <h6>{item.name}</h6>
                    <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
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
  )
}
