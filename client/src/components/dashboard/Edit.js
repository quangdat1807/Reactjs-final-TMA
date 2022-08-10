import {
    useParams
} from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
// import Menu from "../home/Menu";

function Edit() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let { id } = useParams();
    console.log(id)

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const onSubmit = data => {
        console.log(data)
        var config = {
            method: "put",
            url: "http://localhost:8080/api/product/" + id,
            data: data
        };
        console.log(data)
        axios(config)
            .then(function () {
                toast.success('Sửa thành công!')
            })
            .then(
                (result) => {
                    setProduct(result)
                    window.location.assign('http://localhost:3000/admin/products/1');
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    //  getdata category
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/category")
                .then(result => {
                    console.log(result);
                    setCategory(result.data);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        fetchData();

        // load data from
        const dataForm = async () => {
            await axios.get("http://localhost:8080/detail/" + id)
                .then(result => {
                    console.log(result.data);
                    setData(result.data);

                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        dataForm();
    }, []);

    // load image
    const [picture, setPicture] = useState({
        picture: ``
    })
    const onChangeIMG = async (event) => {
        const target = event.target.files[0]
        const base64 = await convertBase64(target);
        setPicture({ picture: `${base64}` })
        console.log(picture.picture);

    };
    const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);
        })

    }


    var items = [];
    for (var i = 0; i < category.length; i++) {
        items.push(
            <option value={category[i].idcategory}>{category[i].name}</option>
        );
    }

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
                Sửa sản phẩm
            </h2>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {data.map((todo, i) => {
                        return (
                            <div key={i} className="row">

                                {/* end */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="first">Tên sản phẩm</label>
                                        <input {...register("name", { required: true, })}
                                            type="text" className="form-control" id="last" defaultValue={todo.name}
                                        />
                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.name && "Tên không được trống!"}</strong>
                                    </div>
                                </div>
                                {/* end */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="company">Giá bán</label>
                                        <input {...register("price", { required: true, pattern: { value: /\d+/, message: "Phải nhập số", }, })}
                                            className="form-control" id="company" defaultValue={todo.price} />
                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.price && "Giá không đúng định dạng!"}</strong>
                                    </div>
                                </div>

                                {/* end */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="category">Hãng sản xuất</label>
                                        <select {...register("idcategory")} className="form-control">
                                            {category.map((cate, index) => {
                                                return (
                                                    <option key={index} value={cate.id}>{cate.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                {/* end */}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="url">
                                            Your Website <small>Please include http://</small>
                                        </label>
                                        <input {...register("image", { required: true, })}
                                            type="text" className="form-control" id="url" placeholder="url" defaultValue={todo.image}
                                        />
                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.image && "Ảnh không đúng định dạng!"}</strong>

                                        <label htmlFor="exampleFormControlFile1">
                                            File (jpg/png):
                                        </label>
                                        <input className="img" type="file" onChange={onChangeIMG} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="description">Mô tả</label>
                                        <textarea {...register("description")}
                                            type="text" className="form-control" id="last" defaultValue={todo.description}
                                        />
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                    <button type="submit" className="btn btn-success">
                        Sửa
                    </button>
                    <Toaster />
                </form>
            </div>
        </div>
    );
}
export default Edit;

