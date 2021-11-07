import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import ImageUpload from "./Upload/ImageUpload.js";
// javascipt plugin for creating charts
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Form,
  ModalTitle,
  Tooltip,
} from "react-bootstrap";
import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import {
  Avatar,
} from '@material-ui/core';
// core components
import CardsHeader from "../views/Components/CardsHeader.js";
import "../assets/css/customSize.css";
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";
import { getWithToken, postWithToken } from "../service/ReadAPI";
export default function Dashboard() {


  const [modalCreate, setTipsModalCreate] = useState(false);
  const toggleCreate = () => setTipsModalCreate(!modalCreate)

  const [tips, setTips] = useState([]);

  const [TopCustomer, setTopCustomer] = useState([]);
  const [TopCompany, setTopCompany] = useState([]);

  const [imageUrl, setimageUrl] = useState("");
  const [TopService, setTopService] = useState([]);
  const [TotalService, setTotalService] = useState([]);
  const [ShowRoyalName, setShowRoyal] = useState([]);
  const [UseListCustomerShow, setUseListCustomerShow] = useState([]);
  const [UseListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  const [customersUsesCompanyService, setcustomersUsesCompanyService] = useState("");
  const [completedOrders, setCompletedOrders] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [TotalMoneyCompany, setTotalMoneyCompany] = useState("");
  const [canceledOrders, setCanceledOrders] = useState("");
  const ref = firebase.firestore().collection("tips");

  const db = firebase.firestore();
  const storge = firebase.storage();
  const [data, setData] = useState({
    content: "",
    imageUrl: null,
    title: ""
  });
  useEffect(() => {
    getDataAll();
  }, []);
  async function getDataAll() {
    return await getWithToken("/api/v1.0/all-count", localStorage.getItem("token")).then(
      (res) => {
        setTopCustomer(res.data.topCustomer);
        setTopCompany(res.data.topComps);
        setTopService(res.data.topService);
        setTotalService(res.data.services);
        setUseListCustomerShow(res.data.topCustomer);
        setcustomersUsesCompanyService(res.data.customerCancelOrder);
        setCompletedOrders(res.data.completedOrders);
        setTotalOrders(res.data.orders);
        setTotalMoneyCompany(res.data.totalMoneyOfCompletedOrder);
        setCanceledOrders(res.data.canceledOrders);
        setUseListCustomerShowPage(res.data.topCustomer.slice(numberPage * 10 - 10, numberPage * 10));
        setTotalNumberPage(Math.ceil(res.data.topCustomer.length / 10));
      });
  }
  console.log("object",TotalMoneyCompany)
  
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("tips").get()
      setTips(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  return (
    <>
      <CardsHeader name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>

        <Row style={{ paddingTop: '10px' }}>
          <Col xl="8">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">TOP 5 COMPANIES <i style={{paddingLeft:'7px'}} class="fa fa-building" aria-hidden="true"></i>
</h3>
                  </div>

                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => window.location.href = "/admin/Company"}
                      size="sm"
                    >
                      View All
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light-css-dash">
                  <tr>
                    <th style={{ color: 'black', fontWeight: '700' }}>#</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Company name</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Address</th>
                    <th style={{ color: 'black', fontWeight: '700' }}></th>
                    <th style={{ color: 'black', fontWeight: '700' }}>order rate</th>
                  </tr>
                </thead>
                <tbody style={{ paddingTop: '10px', backgroundColor: '#c8e3fa', border: '1px solid #c8e3fa' }}>
                  {TopCompany.map((e, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.companyName}</td>

                        <td scope="row">{e.address}</td>

                        <td></td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />
                          {e.orders} orders
                        </td>
                        {/* <i className="fas fa-arrow-down text-warning mr-3" /> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">BEST SERVICE <i style={{paddingLeft:'7px'}} class="fa fa-newspaper" aria-hidden="true"></i>
</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => window.location.href = "/admin/service"}
                      size="sm"
                    >
                      View All
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light-css-dash">
                  <tr>
                    <th style={{ color: 'black', fontWeight: '700' }}>#</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Service Name</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Orders</th>
                  </tr>
                </thead>
                <tbody style={{ paddingTop: '10px', backgroundColor: '#c8e3fa', border: '1px solid #c8e3fa' }}>
                  {TopService.map((e, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{e.id}</td> */}
                        <td>{e.serviceName}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2" style={{ paddingLeft: '10px', color: 'green', fontWeight: '700' }}>{e.orders}</span>
                            <i className="fa fa-truck" style={{ color: '#447DF7' }} />

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="6">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="title-customer-h3">LOYALTY CUSTOMER <i style={{paddingLeft:'7px'}} class="fa fa-users" aria-hidden="true"></i>
</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>

                    <thead className="thead-light-css-dash">
                      <tr>
                        <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700' }}>
                          #
                        </th>
                        <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700' }}>
                          Customer
                        </th>
                        <th className="sort" data-sort="budget" style={{ color: 'black', fontWeight: '700' }}>
                          Address
                        </th>
                        {/* <th className="sort" data-sort="status" style={{color:'black',fontWeight:'700'}}>
                          Status
                        </th> */}
                        <th style={{ color: 'black', fontWeight: '700' }}>Orders</th>

                        <th style={{ color: 'black', fontWeight: '700' }}></th>
                        <th scope="row" ></th>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                            </a>
                            <Media>

                            </Media>
                          </Media>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list" style={{ paddingTop: '10px', backgroundColor: '#c8e3fa', border: '1px solid #c8e3fa' }}>
                      {UseListCustomerShowPage.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>      <Avatar style={{
                              backgroundColor: '#FFFFFF',
                              fontSize: '200px',
                              right: '10px',
                              overflow: 'unset',
                              borderRadius: '32%',

                            }} src={e.avatar}>
                            </Avatar></td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">{e.fullName}</span>
                              </Badge>
                            </td>
                            <td>{e.address}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2" style={{ color: 'green', fontWeight: '700' }}>{e.orders}</span>
                                <i className="fa fa-shopping-basket" aria-hidden="true" style={{ color: '#447DF7' }} />

                              </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td className="text-end">
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>

            </Row>
          </Col>
          <Col xl="6">
            <Card>


              <CardHeader className="border-0">
                <h3 className="title-customer-h3">STATISTIC <i style={{paddingLeft:'7px'}} class="fa fa-th-list" aria-hidden="true"></i> </h3>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light-css-dash">
                  <tr>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }}>Customer cancel orders</th>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }} >Repairman cancel orders</th>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }} >Total order canceled</th>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }}>Total completed</th>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }}>Total orders</th>
                    <th className="sort" data-sort="name" style={{ color: 'black', fontWeight: '700',paddingLeft:'10px' }} >Total services</th>
                  </tr>
                </thead>
                <tbody className="list" style={{ paddingTop: '10px', backgroundColor: '#c8e3fa', border: '1px solid #c8e3fa' }}>
                  <tr>
                    <td style={{ color: 'red', fontWeight: '700' ,textAlign:'left'}}>{customersUsesCompanyService} canceled</td>
                    <td style={{ color: 'red', fontWeight: '700',textAlign:'left' }}>
                    {canceledOrders - customersUsesCompanyService} canceled
                    </td>
                    <td style={{ color: 'red', fontWeight: '700',textAlign:'left' }}>
                      {canceledOrders} canceled
                    </td>
                    <td style={{ color: 'green', fontWeight: '700',textAlign:'center' }}>
                      {completedOrders} completed
                    </td>
                    <td style={{ color: 'green', fontWeight: '700' ,textAlign:'center',paddingLeft:'10px' }}>
                      {totalOrders} orders
                    </td>

                
                    <td style={{ color: 'green', fontWeight: '700',textAlign:'center' }}>
                      {TotalService} 
                      <i style={{paddingLeft:'5px'}}  class="fa fa-tasks" aria-hidden="true"></i>
                    </td>
                   
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xl="5">
            <Card>
              <CardHeader>
                <h2 className="title-customer-h3">iREPAIR</h2>
              </CardHeader>
              <CardHeader className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar-repairman"
                      src={require("../assets/img/worker-picture.png").default}
                    />
                  </a> */}
                  <div className="mx-3">
                    <a
                      className="text-dark font-weight-600 text-sm"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      {ShowRoyalName}
                    </a>
                    {/* <small className="d-block text-muted">3 days ago</small> */}
                  </div>
                </div>
              </CardHeader>
              <CardBody style={{ backgroundColor: '#c8e3fa', border: '1px solid  #c8e3fa' }}>
                <p style={{color: '#058ede',fontWeight:'700'}} className="mb-4">
                  Customers will easily find repairmans who meet their criteria and requirements at a reasonable price without spending much time.
                </p>
                <p style={{color: '#058ede',fontWeight:'700'}}>
                  While repair units easily reach more potential customers, at a cheaper cost.
                </p>
                <img
                  alt="..."
                  className="img-fluid rounded"
                  src={require("../assets/img/img-1-1000x600.jpg").default}
                />
                <Row className="align-items-center my-3 pb-3 border-bottom">
                  <Col sm="6">
                    <div className="icon-actions">
                      <a
                        className="like active"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="ni ni-like-2" />
                        <span className="text-muted">© 2021 Azai Group</span>
                      </a>
                    </div>
                  </Col>
                  <Col className="d-none d-sm-block" sm="6">
                    <div className="d-flex align-items-center justify-content-sm-end">
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-xs rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >

                        </a>

                        <a
                          href="#pablo"
                          id="tooltip857639221"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="avatar-repairman-footer"
                            src={require("../assets/img/thuanne.jpg").default}
                          />
                        </a>

                        <a
                          // className="avatar avatar-xs rounded-circle"
                          href="#pablo"
                          id="tooltip260223080"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="avatar-repairman-footer"
                            src={require("../assets/img/dangne2.jpg").default}
                          />
                        </a>
                      </div>
                      <small className="pl-2 font-weight-bold">
                        and {localStorage.getItem("Customer") - 2}+ more
                      </small>
                    </div>
                  </Col>
                </Row>

                {/* <div className="mb-1">
                  <Media className="media-comment">
                    <img
                      alt="..."
                      className="avatar avatar-lg media-comment-avatar rounded-circle"
                      src={require("../assets/img/khanhne2.jpg").default}
                    />
                    <Media>
                      <div className="media-comment-text">
                        <h6 className="h5 mt-0">Nguyen Khanh</h6>
                        <p className="text-sm lh-160">
                          Cras sit amet nibh libero nulla vel metus scelerisque
                          ante sollicitudin. Cras purus odio vestibulum in
                          vulputate viverra turpis.
                        </p>
                        <div className="icon-actions">
                          <a
                            className="like active"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="ni ni-like-2" />
                            <span className="text-muted">3 likes</span>
                          </a>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <i className="ni ni-curved-next" />
                            <span className="text-muted">2 shares</span>
                          </a>
                        </div>
                      </div>
                    </Media>
                  </Media>
                  <Media className="media-comment">
                    <img
                      alt="..."
                      className="avatar avatar-lg media-comment-avatar rounded-circle"
                      src={require("../assets/img/thuanne.jpg").default}
                    />
                    <Media>
                      <div className="media-comment-text">
                        <h6 className="h5 mt-0">Le Thuan</h6>
                        <p className="text-sm lh-160">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                        </p>
                        <div className="icon-actions">
                          <a
                            className="like active"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="ni ni-like-2" />
                            <span className="text-muted">10 likes</span>
                          </a>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <i className="ni ni-curved-next" />
                            <span className="text-muted">1 share</span>
                          </a>
                        </div>
                      </div>
                    </Media>
                  </Media>
                  <hr />
                  <Media className="align-items-center">
                       <img
                      className="avatar-rounded-circle-b-c"

                      alt="..."
                      src={localStorage.getItem("photo")}
                    ></img>
                    <Media body>
                      <Form>
                        <Input
                          placeholder="Write your comment"
                          rows="1"
                          type="textarea"
                        />
                      </Form>
                    </Media>
                  </Media>
                </div> */}
              </CardBody>
            </Card>
          </Col>


          <Col xl="7">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">FAVORITE TIPS</h3>
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light-css-dash">
                  <tr>
                    <th style={{ color: 'black', fontWeight: '700' }}>#</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Content</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Description</th>
                    <th style={{ color: 'black', fontWeight: '700' }}>Title</th>
                  </tr>
                </thead>
                <tbody style={{ paddingTop: '10px', backgroundColor: '#c8e3fa', border: '1px solid #c8e3fa' }}>

                  {tips.map((tips, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><img className="avatar-repairman" src={tips.imageUrl} /></td>

                        <td>{tips.content} </td>
                        <td>
                          {tips.title}

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>


      </Container>
      {/* <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

        >
          <ModalTitle>Do you want to create new f</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
          >
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"
                placeholder="Name"
                name="title"
                onChange={e => settitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text"
                placeholder="Content"
                onChange={e => setcontent(e.target.value)}
              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
  
                    
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleCreate}>
            Cancel
          </Button>
          <Button onClick={(e) =>  // handleCompanyDetele();
            // handleSubmit()
            createTips()
            // e.preventDefault()
            // setCompanyModalEdit(false);
          }
          >
            Save
          </Button>
          <ImageUpload setData={setData}/>

        </ModalFooter>

      </Modal> */}

    </>
  );
}

