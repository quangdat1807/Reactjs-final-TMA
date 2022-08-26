import {
    useParams
} from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
} from "react-bootstrap";

function Edit() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let { id } = useParams();

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);

    const onSubmit = async data => {
        console.log(data)
        await axios.put("http://localhost:8080/api/product/" + id, data)
            .then(function () {
                toast.success('Sửa thành công!')
            })
            .then(function () {
                setTimeout(() => {
                    window.location.assign('http://localhost:3000/admin/products/1');
                }, 500);

            })
            .catch((error) => {
                console.log(error);
            })

    }

    //  getdata category
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8080/category")
                .then(result => {
                    setCategory(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        };
        fetchData();

        // load data from
        const dataForm = async () => {
            await axios.get("http://localhost:8080/detail/" + id)
                .then(result => {
                    setData(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
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


    // var items = [];
    // for (var i = 0; i < category.length; i++) {
    //     items.push(
    //         <option value={category[i].idcategory}>{category[i].name}</option>
    //     );
    // }


    return (
        <Container fluid>
            {data.map((todo, i) => {
                return (
                    <div key={i}>
                        <Row>

                            <Col md="8">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">Sửa sản phẩm</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit(onSubmit)}>


                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label>Tên sản phẩm</label>
                                                        <Form.Control
                                                            placeholder="Nhập tên..."
                                                            type="text"
                                                            {...register("name", { required: true })}
                                                            defaultValue={todo.name}
                                                        ></Form.Control>
                                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.name && "Tên không để trống!"}</strong>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label>Giá sản phẩm</label>
                                                        <Form.Control
                                                            placeholder="Nhập giá..."
                                                            type="number"
                                                            defaultValue={todo.price}
                                                            {...register("price", { required: true, minLength: 6, maxLength: 9 })}
                                                        ></Form.Control>
                                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.price && "Giá không hợp lệ!"}</strong>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <Form.Group>
                                                        <label>Ảnh</label>
                                                        <Form.Control
                                                            placeholder="Nhập ảnh..."
                                                            type="text"
                                                            defaultValue={todo.image}
                                                            {...register("image", { required: true })}
                                                        ></Form.Control>
                                                        <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.image && "Không hợp lệ!"}</strong>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>Loại sản phẩm</label>
                                                        <Form.Select
                                                            placeholder="City"
                                                            type="text"
                                                            {...register("idcategory", { required: true })}
                                                        >
                                                            {category.map((cate, index) => {
                                                                return (
                                                                    <option key={index} value={cate.id}>{cate.name}</option>
                                                                );
                                                            })}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <Form.Group>
                                                        <label>Mô tả</label>
                                                        <Form.Control
                                                            cols="80"
                                                            rows="4"
                                                            defaultValue=" "
                                                            as="textarea"
                                                            {...register("description")}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="info"
                                            >
                                                Sửa sản phẩm
                                            </Button>
                                            <Toaster />
                                            <div className="clearfix"></div>


                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card className="card-user">

                                    <Card.Body>
                                        <div className="author">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="avatar border-gray"
                                                    src={todo.image}
                                                ></img>
                                            </a>
                                        </div>

                                    </Card.Body>
                                    <hr></hr>
                                    <div className="button-container mr-auto ml-auto">
                                        <Button
                                            className="btn-simple btn-icon"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            variant="link"
                                        >
                                            <i className="fab fa-facebook-square"></i>
                                        </Button>
                                        <Button
                                            className="btn-simple btn-icon"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            variant="link"
                                        >
                                            <i className="fab fa-twitter"></i>
                                        </Button>
                                        <Button
                                            className="btn-simple btn-icon"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            variant="link"
                                        >
                                            <i className="fab fa-google-plus-square"></i>
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </Container >
        //     <div className="container">
        //         <form onSubmit={handleSubmit(onSubmit)}>
        //             {data.map((todo, i) => {
        //                 return (
        //                     <div key={i} className="row">

        //                         {/* end */}

        //                         <div className="col-md-6">
        //                             <div className="form-group">
        //                                 <label htmlFor="first">Tên sản phẩm</label>
        //                                 <input {...register("name", { required: true, })}
        //                                     type="text" className="form-control" id="last" defaultValue={todo.name}
        //                                 />
        //                                 <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.name && "Tên không được trống!"}</strong>
        //                             </div>
        //                         </div>
        //                         {/* end */}

        //                         <div className="col-md-6">
        //                             <div className="form-group">
        //                                 <label htmlFor="company">Giá bán</label>
        //                                 <input {...register("price", { required: true, pattern: { value: /\d+/, message: "Phải nhập số", }, })}
        //                                     className="form-control" id="company" defaultValue={todo.price} />
        //                                 <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.price && "Giá không đúng định dạng!"}</strong>
        //                             </div>
        //                         </div>

        //                         {/* end */}

        //                         <div className="col-md-6">
        //                             <div className="form-group">
        //                                 <label htmlFor="category">Hãng sản xuất</label>
        //                                 <select {...register("idcategory")} className="form-control">
        //                                     {category.map((cate, index) => {
        //                                         return (
        //                                             <option key={index} value={cate.id}>{cate.name}</option>
        //                                         );
        //                                     })}
        //                                 </select>
        //                             </div>
        //                         </div>

        //                         {/* end */}

        //                         <div className="col-md-6">
        //                             <div className="form-group">
        //                                 <label htmlFor="url">
        //                                     Your Website <small>Please include http://</small>
        //                                 </label>
        //                                 <input {...register("image", { required: true, })}
        //                                     type="text" className="form-control" id="url" placeholder="url" defaultValue={todo.image}
        //                                 />
        //                                 <strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.image && "Ảnh không đúng định dạng!"}</strong>

        //                                 <label htmlFor="exampleFormControlFile1">
        //                                     File (jpg/png):
        //                                 </label>
        //                                 <input className="img" type="file" onChange={onChangeIMG} />
        //                             </div>
        //                         </div>

        //                         <div className="col-md-6">
        //                             <div className="form-group">
        //                                 <label htmlFor="description">Mô tả</label>
        //                                 <textarea {...register("description")}
        //                                     type="text" className="form-control" id="last" defaultValue={todo.description}
        //                                 />
        //                             </div>
        //                         </div>

        //                     </div>
        //                 )
        //             })}

        //             <button type="submit" className="btn btn-success">
        //                 Sửa
        //             </button>
        //             <Toaster />
        //         </form>
        //     </div>
        // </div>
    );
}
export default Edit;

