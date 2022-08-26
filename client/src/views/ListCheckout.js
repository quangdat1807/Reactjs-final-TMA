import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios';
// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CurrencyFormat from 'react-currency-format';
import { Context } from '../contexts/Context';

function ListCheckout() {
  const { products } = useContext(Context)
  const [dataCheckout, setDataCheckout] = useState([]);
  const [dataCheckoutDetails, setDataCheckoutDetails] = useState([]);
  const [receiptDetail, setReceiptDetail] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const ListDataCheckout = async () => {
      await axios.get("http://localhost:8080/checkout")
        .then(result => {
          setDataCheckout(result.data);
        },
          (error) => {
            console.log(error);
          }
        )
    }
    ListDataCheckout()
    const DataCheckoutDetails = async () => {
      await axios.get("http://localhost:8080/checkoutDetail")
        .then(result => {
          setDataCheckoutDetails(result.data);
        },
          (error) => {
            console.log(error);
          })
    }
    DataCheckoutDetails()
  }, [])


  console.log(products)
  console.log(receiptDetail)

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Thông tin đặt hàng</Card.Title>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Họ và tên</th>
                      <th className="border-0">Số điện thoại</th>
                      <th className="border-0">Địa chỉ</th>
                      <th className="border-0">Ngày đặt</th>
                      <th className="border-0">Mô tả</th>
                      <th className="border-0">Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCheckout.map(item => {
                      let date = moment(item.created_Date).format('DD/MM/YYYY, h:mm:ss')
                      let receipt = []


                      dataCheckoutDetails.filter(data => {
                        if (item.phoneNumber === data.phoneCustomer) {
                          receipt.push(data)

                        }
                      })

                      function handleDataReceipt(phoneNumber) {
                        console.log(phoneNumber)
                        setReceiptDetail(receipt)
                      }

                      return (

                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.fullName}</td>
                          <td>0{item.phoneNumber}</td>
                          <td>{item.address}, {item.addressDetail}</td>
                          <td>{date}</td>
                          <td>{item.description}</td>
                          <td>
                            <Button variant="primary" onClick={() => { handleShow(); handleDataReceipt(item.phoneNumber) }}>
                              ...
                            </Button>


                            <Modal show={show} onHide={handleClose} animation={false}
                              size="lg"
                              aria-labelledby="contained-modal-title-vcenter"
                              style={{ display: 'flex' }}
                              centered>

                              <Modal.Header closeButton>
                                <Modal.Title>Thông tin đơn hàng</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Table className="table-hover table-striped">
                                  <thead>
                                    <tr>
                                      <th className="border-0">Hình ảnh</th>
                                      <th className="border-0">Sản phẩm</th>
                                      <th className="border-0">Số lượng</th>
                                      <th className="border-0">Đơn giá</th>
                                      <th className="border-0">Tổng giá</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {receiptDetail.map(dataReceipt => {
                                      const nameProduct = []
                                      const image = []
                                      const price = []
                                      {
                                        products.filter(product => {
                                          if (product.id === dataReceipt.productId) {
                                            nameProduct.push(product.name)
                                            image.push(product.image)
                                            price.push(product.price)
                                          }

                                        })
                                      }
                                      console.log(nameProduct)
                                      return (
                                        <tr key={dataReceipt.id}>
                                          <td style={{ width: '100px' }}><img src={image} style={{ width: '50%' }}></img></td>
                                          <td>{nameProduct}</td>
                                          <td>{dataReceipt.quantity}</td>
                                          <td>{price} VND</td>
                                          <td>{dataReceipt.quantity * price} VND</td>
                                          
                                        </tr>
                                      )
                                    })
                                    }
                                  </tbody>
                                </Table>
                              </Modal.Body>
                            </Modal>

                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListCheckout;
