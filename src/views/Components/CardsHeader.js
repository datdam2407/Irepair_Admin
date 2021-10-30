import React, { useState, useEffect } from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { getWithToken } from "../../service/ReadAPI";

function CardsHeader() {

// useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       history.push("/");
//     }
// }, "");

const [dashboard, setDashboard] = useState([]);
const [companyListID, setCompanyList] = useState([]);
const [serviceList, setServiceList] = useState("");
const [RPList, setRepairmanList] = useState("");
const [OrderList, setOrderList] = useState("");
const [OrderCancelList, setOrderCancelList] = useState("");
const [OrderCusCancelList, setOrderCusCancelList] = useState("");
const [OrderCompletedList, setOrderComletedlList] = useState("");
const [Customer, setCustomer] = useState([]);
const [MajorFields, setMajorFields] = useState("");
const [Major, setMajor] = useState("");

const [sortedField, setSortedField] = useState("Id");
const [ascending, setAscending] = useState(true);

  useEffect(() => {
  
    getWithToken("/api/v1.0/all-count" , localStorage.getItem("token")).then(
      (res) => {
          var temp = res.data[0];
          setDashboard(res.data[0]);
          setCompanyList(temp.Companies);
          setOrderComletedlList(temp.CompletedOrders);
          setOrderCancelList(temp.CanceledOrders);
          setCustomer(temp.Customer);
          setOrderCancelList(temp.CustomerCancelOrder);
          setMajorFields(temp.MajorFields);
          setMajor(temp.Majors);
          setOrderList(temp.Orders);
          setRepairmanList(temp.RepairMan);
          setServiceList(temp.Services);
      });
  }, []);


  return (
    <>
      <div className="header-body-header-a">
        <Container fluid>
          <div className="header-body-header">
            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Company
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                {companyListID}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                            Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Customer}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Order
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{OrderList}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
