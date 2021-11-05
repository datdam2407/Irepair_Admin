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
  Form ,
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
import NumberFormat from 'react-number-format';
import CardsHeader from "../views/Components/CardsHeader.js";
import "../assets/css/customSize.css";
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";
import { getWithToken ,postWithToken  } from "../service/ReadAPI";
export default function Dashboard() {
  const [dataBase , setDataBase] = useState([]);
  const [loadDataBase, setLoadDatabase] = useState(true);

const [modalCreate, setTipsModalCreate] = useState(false);
const toggleCreate = () => setTipsModalCreate(!modalCreate)

const [tips , setTips] = useState([]);

  const [TopCustomer, setTopCustomer] = useState([]);
  const [TopCompany, setTopCompany] = useState([]);
  const [content , setcontent] = useState("");
  const [title, settitle] = useState("");
  const [imageUrl , setimageUrl ] = useState("");
  const [TopService, setTopService] = useState([]);
  const [ShowRoyalName, setShowRoyal] = useState([]);
  const [UseListCustomerShow, setUseListCustomerShow] = useState([]);
  const [UseListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);


  const ref = firebase.firestore().collection("tips");

const db = firebase.firestore();
const storge = firebase.storage();
const [data, setData] = useState({
  content : "",
  imageUrl : null,
  title : ""
});
function handleChange(e){
  e.preventDefault();
  const {name , value} = e.target;
  setData((prev) => {
    return {...prev ,[name]:value}
  })
}

 
  const createTips = (e) => {
    ref.add({
      content : content,
      imageUrl :localStorage.getItem("urlUpload"),
      title : title
    }).then((res) =>  window.location="/admin/dashboard")
         
  }
   useEffect(() => {
    getDataAll();
  }, []);
    async function getDataAll(){
      return await   getWithToken("/api/v1.0/all-count", localStorage.getItem("token")).then(
        (res) => {
          setTopCustomer(res.data.topCustomer);
          setTopCompany(res.data.topComps);
          setTopService(res.data.topService);
          setUseListCustomerShow(res.data.topCustomer);
          // setShowRoyal(res.data.topCustomer[0].fullName);
          setUseListCustomerShowPage(res.data.topCustomer.slice(numberPage * 10 - 10, numberPage * 10));
          setTotalNumberPage(Math.ceil(res.data.topCustomer.length / 10));
        });
    }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 10 - 10, number * 10));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 10));
  }
  const [activeNav, setActiveNav] = React.useState(1);
  // const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };


  React.useEffect(() =>{
    const fetchData = async () => {
    const db = firebase.firestore();
    const data = await db.collection("tips").get()
    setTips(data.docs.map(doc => doc.data()))
    }
    fetchData()
    },[])
  // console.log("database" , ref)
  let history = useHistory();

  // if(){
  //   // history.push("/");
  // }
  
  return (
    <>
      <CardsHeader name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="8">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="title-customer-h3">LOYALTY CUSTOMER</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>

                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          #
                        </th>
                        <th className="sort" data-sort="name" scope="col">
                          Customer
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Address
                        </th>
                        {/* <th className="sort" data-sort="status" scope="col">
                          Status
                        </th> */}
                        <th scope="col">Orders</th>

                        <th scope="col"></th>
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
                              <span className="name mb-0 text-sm">
                                System
                              </span>
                            </Media>
                          </Media>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list">
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
                                <span className="completion mr-2">{e.orders}</span>

                              </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td className="text-end">
                              <UncontrolledDropdown>
                                {/* <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle> */}
                                {/* <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    View details
                                  </DropdownItem>
                         
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >

                                  </DropdownItem>
                                </DropdownMenu> */}
                              </UncontrolledDropdown>
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
          {/* <Col xl="8">
            <Card className="bg-default">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-light text-uppercase ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 text-white mb-0">Sales value</h5>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem className="mr-2 mr-md-0">
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                
                </div>
              </CardBody>
            </Card>
          </Col> */}

          <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h5 className="h3 mb-0">Revenus:  
                    <NumberFormat className="input-type-css-order"
                          thousandsGroupStyle="thousand"
                          value={localStorage.getItem("revenus")}
                          decimalSeparator="."
                          locale="vn"
                          thousandSeparator={true}
                          disabled />VND</h5> 
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                    className="chart-canvas"
                    id="chart-bars"
                  />
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xl="8">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">TOP 5 COMPANIES</h3>
                  </div>
                  
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => window.location.href = "/admin/Company"}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Company name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  {TopCompany.map((e, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.companyName}</td>

                        <td scope="row">{e.address}</td>
                        <td></td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />
                          {e.orders}

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
                    <h3 className="mb-0">BEST SERVICE</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => window.location.href = "/admin/service"}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Service Name</th>
                    <th scope="col">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {TopService.map((e, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{e.id}</td> */}
                        <td>{e.serviceName}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{e.orders}</span>
                            <div>
                              <Progress
                                max="100"
                                value="30"
                                color="gradient-warning"
                              />
                            </div>
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
          <Col xl="5">
            <Card>
              <CardHeader>
                <h2 className="title-customer-h3">IREPAIR</h2>
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
              <CardBody>
                <p className="mb-4">
                  App is calling repairman weakly! Very useful
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
                        <span className="text-muted">150</span>
                      </a>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="ni ni-chat-round" />
                        <span className="text-muted">36</span>
                      </a>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="ni ni-curved-next" />
                        <span className="text-muted">12</span>
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
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip260223080"
                        >
                          Nguyen Khanh
                        </UncontrolledTooltip>
                      </div>
                      <small className="pl-2 font-weight-bold">
                        and 3+ more
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
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Content</th>
                    <th scope="col">Description</th>
                    <th scope="col">Title</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {tips.map((tips,index) => {
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
      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

        >
          <ModalTitle>Do you want to create new company</ModalTitle>
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

      </Modal>

    </>
  );
}

