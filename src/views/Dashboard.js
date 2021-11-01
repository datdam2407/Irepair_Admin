import React, { useState, useEffect } from "react";
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
  Media,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
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
import { getWithToken } from "../service/ReadAPI";
function Dashboard() {

  const [dashboard, setDashboard] = useState([]);
  // const [companyListid, setCompanyList] = useState([]);
  // const [serviceList, setServiceList] = useState("");
  // const [RPList, setRepairmanList] = useState("");
  // const [OrderList, setOrderList] = useState("");
  // const [OrderCancelList, setOrderCancelList] = useState("");
  // const [OrderCusCancelList, setOrderCusCancelList] = useState("");
  // const [OrderCompletedList, setOrderComletedlList] = useState("");
  // const [Customer, setCustomer] = useState([]);
  const [TopCustomer, setTopCustomer] = useState([]);
  const [TopCompany, setTopCompany] = useState([]);
  const [TopService, setTopService] = useState([]);
  const [ShowRoyalName, setShowRoyal] = useState([]);
  const [UseListCustomerShow, setUseListCustomerShow] = useState([]);
  const [UseListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  // const [MajorFields, setMajorFields] = useState("");
  // const [Major, setMajor] = useState("");

  useEffect(() => {

    // getWithToken("/api/v1.0/all-count" , localStorage.getItem("token")).then(
    //   (res) => {
    //       setTopCompany(res.data.topComps);
    //       setUseListCompanyShow(res.data.topCompany);
    //       setUseListCompanyShowPage(res.data.topCompany.slice(numberPage2 * 10 - 10, numberPage2 * 10));       
    //       setTotalNumberPage2(Math.ceil(res.data.topCompany.length / 10));
    //     });
    getWithToken("/api/v1.0/all-count", localStorage.getItem("token")).then(
      (res) => {
        setTopCustomer(res.data.topCustomer);
        setTopCompany(res.data.topComps);
        setTopService(res.data.topService);
        setUseListCustomerShow(res.data.topCustomer);
        setShowRoyal(res.data.topCustomer[0].fullName);
        setUseListCustomerShowPage(res.data.topCustomer.slice(numberPage * 10 - 10, numberPage * 10));

        setTotalNumberPage(Math.ceil(res.data.topCustomer.length / 10));
      });
  }, []);

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 10 - 10, number * 10));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 10));
  }
  console.log("top 10 cus", TopCustomer)
  console.log("top 10 company", TopCompany)
  console.log("top 10 service", TopService)
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
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="title-customer-h3">Customer loyalty</h3>
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
                                    View details
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >

                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >

                                  </DropdownItem>
                                </DropdownMenu>
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
                    <h3 className="mb-0">Top 5 Companies</h3>
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
                    <h3 className="mb-0">Best service</h3>
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
      </Container>
    </>
  );
}

export default Dashboard;
