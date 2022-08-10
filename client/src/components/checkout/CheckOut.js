import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import Menu from '../home/Menu'
import Footer from '../home/Footer'
import { Context } from '../../contexts/Context'
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import { useForm } from 'react-hook-form';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"
import axios from 'axios';
import useLocationForm from "./useLocationForm";
import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import './css/checkout.css'


export const CheckOut = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { cart, total, getTotal, reduction, increase, removeProduct, CartEmpty } = useContext(Context);

  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);

  const [isCart, setIsCart] = useState(false);
  const [address, setAddress] = useState("");


  useEffect(() => {
    let cartLength = cart.length;
    cartLength !== 0 ? setIsCart(true) : setIsCart(false);
  }, [cart]);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  useEffect(() => {
    getTotal();
  }, [])

  useEffect(() => {
    let detailAddress = ""
    if (selectedCity && selectedDistrict && selectedWard !== null) {
      detailAddress = selectedWard.label + ',' + selectedDistrict.label + ',' + selectedCity.label
    }

    setAddress(detailAddress);
  }, [state])


  function CartData() {
    function onSubmit(data) {
      let product = []
      for (let i = 0; i < cart.length; i++) {
        product.push({
          id: cart[i].id,
          quantity: cart[i].quantity,
        })
      }
      data.addressDetail = address
      data.created_Date = moment().format("YYYY-MM-DD hh:mm:ss")

      const postData = async () => {
        await axios.post("http://localhost:8080/checkout", {
          contact: data,
          products: product
        })
          .then(result => {
            localStorage.removeItem('dataCart')
            alert('Đặt hàng thành công')
            window.location.assign('/products/1')
          })
          .catch((error) => {
            console.log(error);
          });
      }
      postData();
    }
    
    

    // useEffect(() => {
    //   'use strict'

    //   window.addEventListener('load', function () {
    //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //     var forms = document.getElementsByClassName('needs-validation')

    //     // Loop over them and prevent submission
    //     Array.prototype.filter.call(forms, function (form) {
    //       form.addEventListener('submit', function (event) {
    //         if (form.checkValidity() === false) {
    //           event.preventDefault()
    //           event.stopPropagation()
    //         }
    //         form.classList.add('was-validated')
    //       }, false)
    //     })
    //   }, false)
    // }, [])


    return (
      <><Menu />
        <div className="container">
          <div className="py-5" >
            <Link to={"/products/1"} style={{ display: 'flex' }}>
              <i className="bi bi-chevron-left" style={{ fontSize: '25px', color: 'black' }}></i>
              <strong className="text-muted">Quay lại</strong></Link>
          </div>
          <div className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-4 order-md-3 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill" style={{ fontSize: "20px", color: "black" }}>{cart.length}</span>
              </h4>

              <ul className="list-group mb-3 sticky-top">
                {cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className=''>
                      <h6 className="my-0" >{item.name}</h6>
                      <div className="btn-group me-2" role="group" aria-label="First group">
                        <button type='button' className="btn btn-outline-secondary up-down" onClick={() => reduction(item.id)}> - </button>
                        <button type="button" className="btn btn-outline-secondary up-down" >{item.quantity}</button>
                        <button type='button' className="btn btn-outline-secondary up-down" onClick={() => increase(item.id)}> + </button>
                      </div>
                    </div>

                    <CurrencyFormat value={item.price * item.quantity} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
                      <span className="price-number">{value}</span>} />
                    <div className="remove-product" onClick={() => removeProduct(item.id)}><i className="bi bi-dash-circle"></i></div>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Tổng giá: </span>
                  <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' ₫'} renderText={value =>
                    <strong className="price-total">{value}</strong>} />

                </li>
              </ul>
            </div>
            <div className="col-md-1">
            </div>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3">Thông tin đặt hàng</h4>
              <form className="needs-validation">
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" id="fullName" placeholder="Họ và tên*" required="" {...register("fullName", { required: true, minLength: 8, maxLength: 50 })} />
                    <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.fullName && "Tên chưa đúng định dạng ( a-z, 8-50 ký tự)"}</strong>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" id="phoneNumber" placeholder="Số điện thoại*" required="" {...register("phoneNumber", { required: true, minLength: 10, maxLength: 11 })} />
                    <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.phoneNumber && "Số điện thoại chưa đúng định dạng!"}</strong>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <Select
                      name="cityId"
                      key={`cityId_${selectedCity?.value}`}
                      isDisabled={cityOptions.length === 0}
                      options={cityOptions}
                      onChange={(option) => onCitySelect(option)}
                      defaultValue={selectedCity}
                      placeholder="Tỉnh/Thành"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Select
                      name="districtId"
                      key={`districtId_${selectedDistrict?.value}`}
                      isDisabled={districtOptions.length === 0}
                      options={districtOptions}
                      onChange={(option) => onDistrictSelect(option)}
                      defaultValue={selectedDistrict}
                      placeholder="Quận/Huyện"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Select
                      name="wardId"
                      key={`wardId_${selectedWard?.value}`}
                      isDisabled={wardOptions.length === 0}
                      options={wardOptions}
                      onChange={(option) => onWardSelect(option)}
                      defaultValue={selectedWard}
                      placeholder="Phường/Xã"
                    />
                  </div>

                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="address" placeholder="Địa chỉ nhận hàng*" required="" {...register("address", { required: true })} />
                  <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.address && "Vui lòng nhập địa chỉ!"}</strong>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" id="email" placeholder="Email" {...register("email")} />
                </div>
                <hr className="mb-4" />
                <div className="row">
                  <div className="col-md-12 mb-6">
                    <textarea className="col-md-12" placeholder=" Ghi chú" {...register("description")} ></textarea>
                  </div>
                </div>
                <hr className="mb-4" />
                <button className="btn btn-primary btn-lg btn-block" type="submit">Đặt hàng</button>
                <Toaster reverseOrder={false}/>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {isCart ? <CartData /> : <CartEmpty />}
      <Footer />
    </>
  )

}
