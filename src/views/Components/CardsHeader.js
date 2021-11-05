import React, { useState, useEffect } from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import NumberFormat from 'react-number-format';

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
import { getWithTokenParams, getWithToken } from "../../service/ReadAPI";

function CardsHeader() {

// useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       history.push("/");
//     }
// }, "");

const [dashboard, setDashboard] = useState([]);
const [companyListID, setCompanyList] = useState([]);
const [companyListID2, setCompanyList2] = useState([]);
const [serviceList, setServiceList] = useState("");
const [RPList, setRepairmanList] = useState("");
const [OrderList, setOrderList] = useState("");
const [OrderCancelList, setOrderCancelList] = useState("");
const [OrderCusCancelList, setOrderCusCancelList] = useState("");
const [OrderCompletedList, setOrderComletedlList] = useState("");
const [Customer, setCustomer] = useState([]);
const [TopCustomer, setTopCustomer] = useState([]);
const [MajorFields, setMajorFields] = useState("");
const [Major, setMajor] = useState("");
 
const [sortedField, setSortedField] = useState("Id");
const [ascending, setAscending] = useState(true);

  useEffect(() => {

    getCompanyList2();
    getCompanyList();
  }, []);
  localStorage.setItem("Customer" , Customer)
  async function getCompanyList2 (){
    return await   getWithToken("/api/v1.0/all-count" , localStorage.getItem("token")).then(
      (res) => {
          var temp = res.data[0];
          setDashboard(res.data[0]);
          setCompanyList(res.data.companies);
          setOrderComletedlList(res.data.completedOrders);
          setOrderCancelList(res.data.canceledOrders);
          setCustomer(res.data.customer);
          setOrderCancelList(res.data.customerCancelOrder);
          setMajorFields(res.data.majorFields);
          setMajor(res.data.majors);
          setOrderList(res.data.orders);
          setRepairmanList(res.data.repairMan);
          setServiceList(res.data.services);
          setTopCustomer(res.data.topCustomer);
      });
  }

  function getCompanyList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {

      getWithTokenParams("/api/v1.0/companies", params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setCompanyList2(temp);      
      }).catch((err) => {
        console.log(err);
      });
    }
  }
// console.log("top 10 cus", TopCustomer)
  return (
    <>
      <div className="header-body-header-a">
        <Container fluid>
          <div className="header-body-header">
            <Row>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody style={{backgroundColor:'#91ccff'}} >
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
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
                        <i className="fa fa-arrow-up" style={{color:'#447DF7'}} /> 
                      </span>{" "}
                      <span className="text-nowrap">Total Companies</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody style={{backgroundColor:'#91ccff'}}>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-uppercase text-muted mb-0"
                        >
                            Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{Customer}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35"/>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-user-circle" style={{color:'#447DF7'}}/> 
                      </span>{" "}
                      <span className="text-nowrap">Total Users</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody style={{backgroundColor:'#91ccff'}}>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
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
                        <i className="fa fa-truck" style={{color:'#447DF7'}}/> 
                      </span>{" "}
                      <span className="text-nowrap">Total orders</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody style={{backgroundColor:'#91ccff'}}>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-uppercase text-muted mb-0"
                        >
                          Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> 
                        <NumberFormat className="input-type-css-order"
                          thousandsGroupStyle="thousand"
                          value={localStorage.getItem("revenus")}
                          decimalSeparator="."
                          thousandSeparator={true}
                          disabled 
                          style={{textAlign:'left', color:'black',fontWeight:'700',paddingBottom:'10px'}}/></span>
                        </div>
                        
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                      <span className="text-success mr-2">
                        <i className="fa fa-address-card" style={{color:'#447DF7'}}/> 
                      </span>{" "}   
                      <span className="text-nowrap">Last 24 Hours</span>               
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
