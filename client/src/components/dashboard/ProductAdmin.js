import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import Menu from "../home/Menu";
import "../dashboard/css/Admin.css";
import { Context } from '../../contexts/Context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ProductAdmin() {

    const [data, setData] = useState([]);
    const [tongtrang, setTongtrang] = useState(0);
    const { categories } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0)

    let { numberpage } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            await axios("http://localhost:8080/admin/products/" + numberpage)
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
                    setTongtrang(Math.ceil(result[0].total / 5));
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    function Pagination() {
        var items = []

        for (var i = 1; i <= tongtrang; i++) {
            items.push(
                <li key={i} className="page-item"><a className="page-link" href={'/admin/products/' + i}>{i}</a></li>

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

    function DeleteProduct() {
        axios.delete("http://localhost:8080/api/product/" + id)
            .then(function () {
                window.location.reload();
            })
            .catch((error) => {
                console.log("error", error);
            }
            )
        setOpen(false);
    }

    const showConfirm = (id) => {
        setId(id)
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Thao tác</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>
                                    <img
                                        src={item.image}
                                        style={{ width: "100px", height: "100px" }}
                                    ></img>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                {categories.map((cate) => {
                                    if (cate.id === item.idcategory) {
                                        return (
                                            <td key={item.id}>{cate.name} </td>
                                        )
                                    }

                                })}

                                <td className="description">{item.description}</td>
                                <td>
                                    <button className="button-one">
                                        <Link to={`/api/product/${item.id}`}>
                                            <i className="ic1 fas fa-edit"></i> </Link>
                                    </button>
                                    <Button className="button-one" onClick={() => showConfirm(item.id)} >
                                        <span>
                                            <i className="ic1 far fa-trash-alt"></i>
                                        </span>
                                    </Button>
                                    <Modal show={open} >
                                        <Modal.Body>Bạn chắc chắn muốn xóa ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={() => DeleteProduct()}>
                                                Ok
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <Pagination />
        </>
    );
}

export default ProductAdmin;