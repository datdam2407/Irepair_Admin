// import React, { useState, useEffect } from "react";

// import {
//   Pagination,
//   PaginationItem,
//   PaginationLink,
// } from "reactstrap";
// // react-bootstrap components
// import {
//   Card,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { getWithToken } from "../service/ReadAPI";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faCaretDown,
//   faCaretUp,
// } from "@fortawesome/free-solid-svg-icons";
// function Dashboard() {
// //   let history = useHistory();

// // useEffect(() => {
// //     if (localStorage.getItem("token") === null) {
// //       history.push("/");
// //     }
// // }, "");

// const [dashboard, setDashboard] = useState([]);
// const [companyListID, setCompanyList] = useState([]);
// const [serviceList, setServiceList] = useState("");
// const [RPList, setRepairmanList] = useState("");
// const [OrderList, setOrderList] = useState("");
// const [OrderCancelList, setOrderCancelList] = useState("");
// const [OrderCusCancelList, setOrderCusCancelList] = useState("");
// const [OrderCompletedList, setOrderComletedlList] = useState("");
// const [Customer, setCustomer] = useState([]);
// const [MajorFields, setMajorFields] = useState("");
// const [Major, setMajor] = useState("");

// const [sortedField, setSortedField] = useState("Id");
// const [ascending, setAscending] = useState(true);
//   const carouselItems = [
//     {
//       src: require("assets/img/Plumber.jpg").default,
//       altText: "Slide 1",
//       caption: "",
//     },
//     {
//       src: require("assets/img/Electric .jpg").default,
//       altText: "Slide 2",
//       caption: "",
//     },
//     {
//       src: require("assets/img/abc.jpeg").default,
//       altText: "Slide 3",
//       caption: "",
//     },
//   ];
//   const covid19Items = [
//     {
//       src: require("assets/img/covid1.jpg").default,
//       altText: "Slide 1",
//       caption: "",
//     },
//     {
//       src: require("assets/img/covid2.jpg").default,
//       altText: "Slide 2",
//       caption: "",
//     },
//     {
//       src: require("assets/img/covid3.jpg").default,
//       altText: "Slide 3",
//       caption: "",
//     },
//     {
//       src: require("assets/img/covid4.jpg").default,
//       altText: "Slide 4",
//       caption: "",
//     },
//   ];
//   useEffect(() => {
  
//     // getWithToken("/api/v1.0/services?Status=1" ,localStorage.getItem("token")).then(
//     //   (res) => {
//     //     setServiceList(res.data);
//     //   }
//     // )
//     // getWithToken("/api/v1.0/orders" ,localStorage.getItem("token")).then(
//     //   (res) => {
//     //     let totalPrice = 0;
//     //     {OrderList.map((e, index) => {
//     //       totalPrice += e.Total;
//     //     })}
//     //     setOrderList(res.data);
    
//     //     setPrice(totalPrice)
//     //     console.log("aaaaLenght" , OrderList.length)
//     //     console.log("aaaatotalPrice" , totalPrice)
//     //   }
//     // )
//     // // đơn hủy
//     // getWithToken("/api/v1.0/orders?Status=2" ,localStorage.getItem("token")).then(
//     //   (res) => {
//     //     setOrderCancelList(res.data);
//     //   }
//     // )
//     // getWithToken("/api/v1.0/repairmans?Status=1" ,localStorage.getItem("token")).then(
//     //   (res) => {
//     //     setRepairmanList(res.data);
//     //   }
//     // )
//     getWithToken("/api/v1.0/all-count" , localStorage.getItem("token")).then(
//       (res) => {
//           var temp = res.data[0];
//           setDashboard(res.data[0]);
//           setCompanyList(temp.Companies);
//           setOrderComletedlList(temp.CompletedOrders);
//           setOrderCancelList(temp.CanceledOrders);
//           setCustomer(temp.Customer);
//           setOrderCancelList(temp.CustomerCancelOrder);
//           setMajorFields(temp.MajorFields);
//           setMajor(temp.Majors);
//           setOrderList(temp.Orders);
//           setRepairmanList(temp.RepairMan);
//           setServiceList(temp.Services);
//       });
//   }, []);
//   console.log("companyListID", dashboard)
//   console.log("companyListID", companyListID)

//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-istanbul text-warning"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Company</p>
//                       <Card.Title as="h4">{companyListID}</Card.Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                 <i className="fas fa-check"></i> 
//                   Updated
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-settings-gear-64 text-success"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Service</p>
//                       <Card.Title as="h4">{serviceList}</Card.Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                   <i className="far fa-calendar-alt mr-1"></i>
//                   Last day
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-single-02 text-warning"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">RepairMan</p>
//                       <Card.Title as="h4">{RPList}</Card.Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                   <i className="far fa-clock-o mr-1"></i>
//                   In the last hour
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-delivery-fast text-danger"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Order</p>
//                       <Card.Title as="h4">{OrderList}</Card.Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                   <i className="far fa-clock-o mr-1"></i>
//                   In the last hour
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-money-coins text-primary"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Cancel</p>
                          
//                       <Card.Title as="h4">{OrderCancelList}</Card.Title>
                   
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                 <i className="fas fa-check"></i> 
//                   Updated
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-money-coins text-primary"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Revenue</p>
                          
//                       <Card.Title as="h4">đ</Card.Title>
                   
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                 <i className="fas fa-check"></i> 
//                   Updated
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col lg="2" sm="6">
//             <Card className="card-stats">
//               <Card.Body>
//                 <Row>
//                   <Col xs="5">
//                     <div className="icon-big text-center icon-warning">
//                       <i className="nc-icon nc-favourite-28 text-primary"></i>
//                     </div>
//                   </Col>
//                   <Col xs="7">
//                     <div className="numbers">
//                       <p className="card-category">Followers</p>
//                       <Card.Title as="h4">{Customer}</Card.Title>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <hr></hr>
//                 <div className="numbers">
//                 <i className="fas fa-check"></i> 
//                    Following       
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//         <Col md="12">
//             <Card>
           
//               <Card.Body>
//                 <Row>
// <Col className="ml-auto mr-auto" md="6">
//                     <Card.Title as="h2" style={{
//                       marginLeft: '15px',
//                       color:
//                         'rgb(27 129 255)',
//                       fontWeight: '700'
//                     }}>Đơn hàng gần đây</Card.Title>
//                     <Table responsive>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Thợ sửa chữa{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Khách hàng{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Vấn đề cần sửa{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Giá tiền{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th  className="description">Trạng thái</th>
//                       <tbody>
//                                               <tr>
//                           <td>
//                             Nguyễn Tấn Phát
//                           </td>
//                           <td >
//                           Nguyễn Hoàng
//                           </td>
//                           <td>
//                             Máy lạnh không lạnh
//                           </td>
//                           <td>
//                             550,000 đ
//                           </td>
//                           <td style={{
//                             color:
//                               'green',
//                             fontWeight: '700'
//                           }}>
//                             Đã thanh toán
//                           </td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                     {/* <Pagination
//                       aria-label="Page navigation example"
//                       className="page-right"
//                       style={{
//                         paddingLeft: '250px'
//                       }}
//                     >
//                       <PaginationItem disabled={numberPage === 1}>
//                         <PaginationLink
//                           className="page"
//                           previous
//                           //disable={numberPage === 1 ? "true" : "false"}

//                           onClick={() => {
//                             if (numberPage - 1 > 0) {
//                               onClickPage(numberPage - 1);
//                             }
//                           }}
//                         >
//                           Previous
//                         </PaginationLink>
//                       </PaginationItem>
//                       {numberPage - 1 > 0 ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage - 1);
//                             }}
//                           >
//                             {numberPage - 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}
//                       <PaginationItem active>
//                         <PaginationLink className="page-active">
//                           {numberPage}
//                         </PaginationLink>
//                       </PaginationItem>
//                       {numberPage + 1 <= totalNumberPage ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage + 1);
//                             }}
//                           >
//                             {numberPage + 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}
//                       {numberPage + 2 <= totalNumberPage ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage + 2);
//                             }}
//                           >
//                             {numberPage + 2}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}

//                       <PaginationItem disabled={numberPage === totalNumberPage}>
//                         <PaginationLink
//                           className="page"
//                           next
//                           //disable={numberPage === totalNumberPage ? true : false}
//                           onClick={() => {
//                             if (numberPage + 1 <= totalNumberPage) {
//                               onClickPage(numberPage + 1);
//                             }
//                           }}
//                         >
//                           Next
//                         </PaginationLink>
//                       </PaginationItem>
//                     </Pagination> */}
//                   </Col>
                  
//                   <Col className="ml-auto mr-auto" md="6">
//                     <Card.Title as="h2" style={{
//                       marginLeft: '15px',
//                       color:
//                         'rgb(27 129 255)',
//                       fontWeight: '700'
//                     }}>Khách hàng thân thiết</Card.Title>
//                     <Table responsive>
//                     <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Khách hàng{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                         Số lần đặt đơn{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <th
//                         className="description"
//                         onClick={() => {
//                           if (sortedField === "Username" && ascending) {
//                             setSortedField("Username");
//                             setAscending(false);
//                           } else {
//                             setSortedField("Username");
//                             setAscending(true);
//                           }
//                         }}
//                       >
//                        Ngày đặt gần đây{" "}
//                         {sortedField === "Username" ? (
//                           ascending === true ? (
//                             <FontAwesomeIcon icon={faCaretUp} />
//                           ) : (
//                             <FontAwesomeIcon icon={faCaretDown} />
//                           )
//                         ) : (
//                           <FontAwesomeIcon icon={faCaretDown} />
//                         )}
//                       </th>
//                       <tbody>
//                         <tr>
//                           <td>
//                           Nguyễn Thái Bảo
//                           </td>
//                           <td >
//                             7 lần
//                           </td>
//                           <td style={{
//                             color:
//                               'green',
//                             fontWeight: '700'
//                           }}>
//                             11-10-2021
//                           </td>
//                         </tr>
                     
//                       </tbody>
//                     </Table>
//                     {/* <Pagination
//                       style={{
//                         paddingLeft: '250px'
//                       }}
//                       aria-label="Page navigation example"
//                       className="page-right"

//                     >
//                       <PaginationItem disabled={numberPage === 1}>
//                         <PaginationLink

//                           className="page"
//                           previous
//                           //disable={numberPage === 1 ? "true" : "false"}

//                           onClick={() => {
//                             if (numberPage - 1 > 0) {
//                               onClickPage(numberPage - 1);
//                             }
//                           }}
//                         >
//                           Previous
//                         </PaginationLink>
//                       </PaginationItem>
//                       {numberPage - 1 > 0 ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage - 1);
//                             }}
//                           >
//                             {numberPage - 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}
//                       <PaginationItem active>
//                         <PaginationLink className="page-active">
//                           {numberPage}
//                         </PaginationLink>
//                       </PaginationItem>
//                       {numberPage + 1 <= totalNumberPage ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage + 1);
//                             }}
//                           >
//                             {numberPage + 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}
//                       {numberPage + 2 <= totalNumberPage ? (
//                         <PaginationItem>
//                           <PaginationLink
//                             className="page"
//                             onClick={() => {
//                               onClickPage(numberPage + 2);
//                             }}
//                           >
//                             {numberPage + 2}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ) : (
//                         ""
//                       )}

//                       <PaginationItem

//                         disabled={numberPage === totalNumberPage}>
//                         <PaginationLink
//                           className="page"
//                           next
//                           //disable={numberPage === totalNumberPage ? true : false}
//                           onClick={() => {
//                             if (numberPage + 1 <= totalNumberPage) {
//                               onClickPage(numberPage + 1);
//                             }
//                           }}
//                         >
//                           Next
//                         </PaginationLink>
//                       </PaginationItem>
//                     </Pagination> */}
//                   </Col>
//                 </Row>

//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Dashboard;


import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
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
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import CardsHeader from "../views/Components/CardsHeader.js";
import "../assets/css/customSize.css";
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

function Dashboard() {
  const [activeNav, setActiveNav] = React.useState(1);
  // const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };
  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }
  return (
    <>
      <CardsHeader name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="8">
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
                  {/* <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    id="chart-sales-dark"
                    className="chart-canvas"
                  /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h5 className="h3 mb-0">Total orders: </h5>
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
          <Col xl="5">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0" style={{color:"#929234" , fontWeight:'700'}}>Customer loyalty</h5>
              </CardHeader>
              <CardHeader className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar-repairman"
                      src={require("../assets/img/thuanne.jpg").default}
                    />
                  </a>
                  <div className="mx-3">
                    <a
                      className="text-dark font-weight-600 text-sm"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Thuan Nguyen
                    </a>
                    <small className="d-block text-muted">3 days ago</small>
                  </div>
                </div>
                <div className="text-right ml-auto">
                  {/* <Button
                    className="btn-icon"
                    color="primary"
                    size="sm"
                    type="button"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text">Follow</span>
                  </Button> */}
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
                          id="tooltip36177092"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("../assets/img/thuanne.jpg").default}
                          /> */}
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip36177092">
                          Jessica Rowland
                        </UncontrolledTooltip>
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
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip857639221"
                        >
                          Audrey Love
                        </UncontrolledTooltip>
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
                          Michael Lewis
                        </UncontrolledTooltip>
                      </div>
                      <small className="pl-2 font-weight-bold">
                        and 30+ more
                      </small>
                    </div>
                  </Col>
                </Row>

                <div className="mb-1">
                  <Media className="media-comment">
                    <img
                      alt="..."
                      className="avatar avatar-lg media-comment-avatar rounded-circle"
                      src={require("../assets/img/khanhne2.jpg").default}
                    />
                    <Media>
                      <div className="media-comment-text">
                        <h6 className="h5 mt-0">Michael Lewis</h6>
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
                        <h6 className="h5 mt-0">Jessica Stones</h6>
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
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="7">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Loyal customers</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Project
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Budget
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Status
                        </th>
                        <th scope="col">Users</th>
                        <th className="sort" data-sort="completion" scope="col">
                          Completion
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/bootstrap.jpg")
                                    .default
                                }
                              /> */}
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Argon Design System
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2500 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-warning" />
                            <span className="status">pending</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip792717700"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/thuanne.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip792717700"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip654289872"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/team-2.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip654289872"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip409131762"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/team-3.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip409131762"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip50788433"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/team-4.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip50788433"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">60%</span>
                            <div>
                              <Progress max="100" value="60" color="warning" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/angular.jpg")
                                    .default
                                }
                              /> */}
                            </a>
                            <Media>
                              <span className="name mb-0 text-sm">
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip545726644"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/thuanne.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip545726644"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip823332447"
                              onClick={(e) => e.preventDefault()}
                            >
                              {/* <img
                                alt="..."
                                src={
                                  require("assets/img/theme/team-2.jpg").default
                                }
                              /> */}
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip823332447"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip354076640"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip354076640"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip625572621"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip625572621"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Black Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$3150 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">delayed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip927457712"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip927457712"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip959509788"
                              onClick={(e) => e.preventDefault()}
                            >
                              
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip959509788"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip239649821"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip239649821"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip908443321"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip908443321"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">72%</span>
                            <div>
                              <Progress max="100" value="72" color="danger" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                React Material Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$4400 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-info" />
                            <span className="status">on schedule</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip817843622"
                              onClick={(e) => e.preventDefault()}
                            >
                          
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip817843622"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip885824111"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip885824111"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip426851535"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip426851535"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip913358720"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip913358720"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">90%</span>
                            <div>
                              <Progress max="100" value="90" color="info" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Vue Paper UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2200 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip460474820"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip460474820"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip979995688"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip979995688"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip732882700"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip732882700"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip242724387"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip242724387"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Argon Design System
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$2500 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-warning" />
                            <span className="status">pending</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip318080952"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip318080952"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip221723068"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip221723068"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip138748612"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip138748612"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip431342349"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip431342349"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">60%</span>
                            <div>
                              <Progress max="100" value="60" color="warning" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip384464413"
                              onClick={(e) => e.preventDefault()}
                            >
                         
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip384464413"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip828512937"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip828512937"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip409745485"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip409745485"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip262162858"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip262162858"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Black Dashboard
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$3150 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-danger" />
                            <span className="status">delayed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip711925042"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip711925042"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip664693924"
                              onClick={(e) => e.preventDefault()}
                            >
                             
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip664693924"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip582913491"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip582913491"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip699784330"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip699784330"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">72%</span>
                            <div>
                              <Progress max="100" value="72" color="danger" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                      <tr>
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
                                Angular Now UI Kit PRO
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="budget">$1800 USD</td>
                        <td>
                          <Badge className="badge-dot mr-4" color="">
                            <i className="bg-success" />
                            <span className="status">completed</span>
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip912421317"
                              onClick={(e) => e.preventDefault()}
                            >
                           
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip912421317"
                            >
                              Ryan Tompson
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip912012329"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip912012329"
                            >
                              Romina Hadid
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip366509724"
                              onClick={(e) => e.preventDefault()}
                            >
                              
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip366509724"
                            >
                              Alexander Smith
                            </UncontrolledTooltip>
                            <a
                              className="avatar avatar-sm rounded-circle"
                              href="#pablo"
                              id="tooltip569311457"
                              onClick={(e) => e.preventDefault()}
                            >
                            
                            </a>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip569311457"
                            >
                              Jessica Doe
                            </UncontrolledTooltip>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="completion mr-2">100%</span>
                            <div>
                              <Progress max="100" value="100" color="success" />
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color=""
                              size="sm"
                              className="btn-icon-only text-light"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
            
            <div className="card-deck">
              <Card className="bg-gradient-default">
                <CardBody>
                  <div className="mb-2">
                    <sup className="text-white">$</sup>{" "}
                    <span className="h2 text-white">3,300</span>
                    <div className="text-light mt-2 text-sm">
                      Your current balance
                    </div>
                    <div>
                      <span className="text-success font-weight-600">
                        + 15%
                      </span>{" "}
                      <span className="text-light">($250)</span>
                    </div>
                  </div>
                  <Button
                    block
                    className="btn-neutral"
                    color="default"
                    size="sm"
                  >
                    Add credit
                  </Button>
                </CardBody>
                <CardBody>
                  <Row>
                    <div className="col">
                      <small className="text-light">Orders: 60%</small>
                      <Progress
                        className="progress-xs my-2"
                        max="100"
                        value="60"
                        color="success"
                      />
                    </div>
                    <div className="col">
                      <small className="text-light">Sales: 40%</small>
                      <Progress
                        className="progress-xs my-2"
                        max="100"
                        value="40"
                        color="warning"
                      />
                    </div>
                  </Row>
                </CardBody>
              </Card>
              <Card className="bg-gradient-danger">
                <CardBody>
                  <Row className="justify-content-between align-items-center">
                    <div className="col">
                   
                    </div>
                    <Col className="col-auto">
                      <Badge className="badge-lg" color="success">
                        Active
                      </Badge>
                    </Col>
                  </Row>
                  <div className="my-4">
                    <span className="h6 surtitle text-light">Username</span>
                    <div className="h1 text-white">@johnsnow</div>
                  </div>
                  <Row>
                    <div className="col">
                      <span className="h6 surtitle text-light">Name</span>
                      <span className="d-block h3 text-white">John Snow</span>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col xl="8">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top 5 Company</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
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
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />
                      50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Best service</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
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
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            color="gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            color="gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress
                            max="100"
                            value="80"
                            clor="gradient-primary"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            color="gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
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
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Team members</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            className="avatar-rounded-circle-b"
                            alt="..."
                            src={require("../assets/img/datne2.jpg").default}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Đạt Đàm
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          FE
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                          className="avatar-rounded-circle-b"
                            alt="..."
                            src={require("../assets/img/dangne.jpg").default}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Tôi tên Đăng
                          </a>
                        </h4>
                        <span className="text-warning">●</span>{" "}
                        <small>In a meeting</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          MB
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                          className="avatar-rounded-circle-b"
                            alt="..."
                            src={require("../assets/img/khanhne2.jpg").default}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            BoinhaGiauz2k7
                          </a>
                        </h4>
                        <span className="text-danger">●</span>{" "}
                        <small>Offline</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          BE
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                                                      className="avatar-rounded-circle-b"
                            alt="..."
                            src={require("../assets/img/Phatne2.jpg").default}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Phat Leader ne
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          FS
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Team members</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/thuanne.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            John Michael
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Alex Smith
                          </a>
                        </h4>
                        <span className="text-warning">●</span>{" "}
                        <small>In a meeting</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Samantha Ivy
                          </a>
                        </h4>
                        <span className="text-danger">●</span>{" "}
                        <small>Offline</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            John Michael
                          </a>
                        </h4>
                        <span className="text-success">●</span>{" "}
                        <small>Online</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Progress track</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={
                              require("assets/img/theme/bootstrap.jpg").default
                            }
                          /> */}
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Back end System</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="orange"
                          max="100"
                          value="80"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={
                              require("assets/img/theme/angular.jpg").default
                            }
                          /> */}
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Front-end design</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="60"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/sketch.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Mobile Design</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="88"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* <img
                            alt="..."
                            src={require("assets/img/theme/react.jpg").default}
                          /> */}
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Tester</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="info"
                          max="100"
                          value="60"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
