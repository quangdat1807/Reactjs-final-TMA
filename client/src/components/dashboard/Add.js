import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from 'react';

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
} from "react-bootstrap";
import axios from 'axios';
import "../dashboard/css/Add.css"
import { Context } from "../../contexts/Context";

function Add() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { categories } = useContext(Context)


    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:8080/api/product", data)
            .then(function (response) {
                // window.location.assign('http://localhost:3000/admin/products/1');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Container fluid>
            <Row>
                <Col md="8">
                    <Card>
                        {/* <Card.Header>
                <Card.Title as="h4">Thêm sản phẩm</Card.Title>
              </Card.Header> */}
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
                                                {...register("price", { required: true, pattern: { value: /\d+/, message: "Phải nhập số", } })}
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
                                            >{categories.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })}</Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Form.Group>
                                            <label>Mô tả</label>
                                            <Form.Control
                                                cols="80"
                                                defaultValue=" "
                                                rows="4"
                                                as="textarea"
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                >
                                    Thêm sản phẩm
                                </Button>
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
                                        src="https://m.media-amazon.com/images/I/51v+u0MB++L.jpg"
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
        </Container>
    )
}

export default Add;


