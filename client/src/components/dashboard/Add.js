import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Table,
    Modal,
    ModalBody,
    Input,
    FormGroup,
    Label,
} from "reactstrap";
import axios from 'axios';
import "../dashboard/css/Add.css"
import { Context } from "../../contexts/Context";

function Add() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { categories } = useContext(Context)


    const onSubmit = (data) => {
        console.log(data);
        var config = {
            method: "post",
            url: "http://localhost:8080/api/product",
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response);

                window.location.assign('http://localhost:3000/admin/products/1');
                if (response.data == "Thành Công") {

                }


            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(data)
    }
    return (
        <div className="col-md-4" style={{margin: "auto"}}>
        <form onSubmit={handleSubmit(onSubmit)} className="row gx-3 gy-2 align-items-center">
            <h1>Thêm sản phẩm</h1>
            <div className="col-md-6">

                <input type="text" name="name" className="form-control" placeholder="Nhập tên"{...register("name", { required: true })} />
                <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.name && "Tên không để trống!"}</strong>
            </div>
            <div className="col-md-6">

                <input type="number" className="form-control" placeholder="Nhập giá" {...register("price", { required: true, minLength: 6, maxLength: 9 })} />
                <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.price && "Giá không hợp lệ!"}</strong>
            </div>

            <div className="col-md-6">

                <input type="text" className="form-control" placeholder="Link ảnh" id="Role" {...register("image")} />
                <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.image && "Không hợp lệ!"}</strong>
            </div>
            <div className="col-md-6">
                <select {...register("idcategory")}>
                    {categories.map(item => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="col-md-12">
                <label htmlFor="description"></label>
                <textarea type="text" className="form-control" placeholder="Mô tả" id="Role" {...register("description")} />
            </div>

            <button type="submit" className="btn btn-primary">Thêm</button>
        </form>
        </div>
    )
}

export default Add;


