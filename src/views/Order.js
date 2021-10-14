import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ModalTitle,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  Media,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import moment from "moment";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import { del, post, get, getWithToken } from "../../src/service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';

export default function Order() {

  const [CustomerDelete, setCustomerDelete] = useState(null);
  const [modalDelete, setCustomerModalDelete] = useState(false);
  const toggleDelete = () => setCustomerModalDelete(!modalDelete);
  //edit
  const [CustomerEdit, setCustomerEdit] = useState(null);
  const [modalEdit, setCustomerModalEdit] = useState(false);
  const toggleEdit = () => setCustomerModalEdit(!modalEdit)

  const [modalCreate, setCustomerModalCreate] = useState(false);
  const toggleCreate = () => setCustomerModalCreate(!modalCreate)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [Selectservice, setSelectservice] = useState();


  const [customer_Name, setcustomer_Name] = useState("");
  const [address, setaddress] = useState("");

  const [useListCustomerShow, setUseListCustomerShow] = useState([]);
  const [useListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [customerListID, setCustomerListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  useEffect(() => {
    getWithToken("/api/v1.0/services", localStorage.getItem("token")).then(
      (res) => {
        var tempS = res.data;
        console.log(res.data);
        setServiceList(tempS);

      })
    getWithToken("/api/v1.0/order", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          var temp = res.data;
          setCustomerList(temp);
          setUseListCustomerShow(temp);
          setUseListCustomerShowPage(temp.slice(numberPage * 10 - 10, numberPage * 10));
          setTotalNumberPage(Math.ceil(temp.length / 10));
        }
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: ' 100%'
    },
    tableHeaderCell: {
      color: 'burlywood',
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      backgroundColor: 'gray',
      fontWeight: '700',

    },
    thmajorheaderform: {
      fontWeight: 'bold',
      fontWeight: '700',
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },

    avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontSize: '200px',
      right: '10px',
      overflow: 'unset',
      borderRadius: '32%',
      // img: 'string',

    },
    name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark,

    },
    Status: {
      fontWeight: '700',
      width: '71px',
      fontSize: '0.76rem',
      color: 'white',
      backgroundColor: 'green',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
    }
  }));
  const classes = useStyles();

  function getCustomerListID() {
    get("/api/v1.0/customer/get-by-id" + CustomerEdit).then((res) => {
      var temp = res.data;
      setCustomerListID(temp);
    }).catch((err) => {
      console.log(err);
    });
  }

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 10 - 10, number * 10));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 10));
  }
  // create form 
  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/api/v1.0/customer/create",
      {
        customer_Name: e.target.customer_Name.value,
        address: e.target.address.value,
        description: e.target.description.value,
        email: e.target.email.value,
        hotline: e.target.hotline.value,
        is_Online: 1,
        is_Delete: 0,
        picture: e.target.picture.value,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/Customer";
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
  // custom state
  function displayStateName(type) {
    const stateValue = {
      1: "Active",
      0: "Not Alaviable",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function displayRepairName(type) {
    const stateValue = {
      "9e2b3583-c775-4273-aa7f-41ef03498d93": "Dat Dam",

      "7c172d79-7c5d-4ed5-8e71-26ba2e7bf1a3": "nguyen thuan",
      "84066527-2ba2-421a-8637-35d765b153e1": "Tâm Đăng",
      "b123ea59-f40d-495d-b4c8-3be7c96200ad": "Nguyễn Thuần",
      "50d2c8b8-2a11-4802-9592-4f76e92aed12": "Pham Tan Phat (K14 HCM)",
      "90b961b3-6c48-4bed-9169-cbbbc978cfee": "Đỗ Dương Tâm Đăng - K14 HCM",

    };
    return stateValue[type] ? stateValue[type] : "";
  }

  function displayServiceName(type) {
    const stateValue = {
      "3b910bd2-8046-47bf-ab8e-00145f6d9ffb": "Sửa chữa lốc máy",
      "6aeac270-3ce6-4693-b9af-07e8575e72e6": "Kiểm tra dàn lạnh",
      "42931fd3-b056-4210-8467-0818059b8157": "Sửa Quần",
      "4a0839a2-a1dd-4411-a387-0a898d71a38a": "Sửa Laptop",
      "03372569-1d24-4af6-ac50-0c0ec5827191": "Sửa Laptop",
      "b68e53f9-d13d-4631-b749-22f50a1e2ad3": "Đo và bơm gas máy lạnhh",
      "616a22f4-05c8-4617-86bf-255292bdafad": "Tủ Đông",

    };
    return stateValue[type] ? stateValue[type] : "";
  }


  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" }}
      onClick={x}
    >
      X
    </button>
  );
  return (
    <>
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          <Card.Header>
            {/* <Button

                  onClick={() => {
                    // setCustomerEdit(e.Id);
                    // getCustomerListID();
                    // handleSubmit(e);
                    setCustomerModalCreate(true);
                  }}>
                  Create new Customer
                </Button> */}
          </Card.Header>
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="description">Customer</th>
                  <th className="description">Address </th>
                  <th className="description">Repairman</th>

                  <th className="description">Service</th>
                  {/* <th className="description">Username</th> */}
                  
                  <th className="description">Created Date </th>
                  <th className="description">Payment Date</th>
                  <th className="description">Total</th>

                  <th className="description">Point</th>
                  <th className="description">Feedback</th>
                  <th className="description">Views</th>
                </tr>
              </thead>
              <tbody>
                {useListCustomerShowPage.map((e, index) => {
                  return (
                    <tr key={index}>

                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>{displayRepairName(e.CustomerId)}</Typography>
                            <Typography color="black" variant="body2">{(e.CustomerId)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        {e.CustomerAddress}
                      </td>
                      <td>
                        {displayRepairName(e.RepairmanId)}
                      </td>
                      <td>
                        {displayServiceName(e.ServiceId)}
                      </td>
                      <td >{moment(e.CreateTime).format("MM-DD-YYYY")}
                      </td>
                      <td>
                      {moment(e.PaymentTime).format("MM-DD-YYYY")}
                      </td>
                      <td>
                        {e.Total}
                      </td>
                      <td className="point-customer">
                        {e.FeedbackPoint}✩
                      </td>
                      <td className="point-customer">
                        {e.FeedbackMessage}
                      </td>
                      <td>
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              // setSelectservice(e);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>

                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row>
              <Col md={6}></Col>

              <Pagination
                aria-label="Page navigation example"
                className="page-right"
              >
                <PaginationItem disabled={numberPage === 1}>
                  <PaginationLink
                    className="page"
                    previous
                    //disable={numberPage === 1 ? "true" : "false"}

                    onClick={() => {
                      if (numberPage - 1 > 0) {
                        onClickPage(numberPage - 1);
                      }
                    }}
                  >
                    Previous
                  </PaginationLink>
                </PaginationItem>
                {numberPage - 1 > 0 ? (
                  <PaginationItem>
                    <PaginationLink
                      className="page"
                      onClick={() => {
                        onClickPage(numberPage - 1);
                      }}
                    >
                      {numberPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  ""
                )}
                <PaginationItem active>
                  <PaginationLink className="page-active">
                    {numberPage}
                  </PaginationLink>
                </PaginationItem>
                {numberPage + 1 <= totalNumberPage ? (
                  <PaginationItem>
                    <PaginationLink
                      className="page"
                      onClick={() => {
                        onClickPage(numberPage + 1);
                      }}
                    >
                      {numberPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  ""
                )}
                {numberPage + 2 <= totalNumberPage ? (
                  <PaginationItem>
                    <PaginationLink
                      className="page"
                      onClick={() => {
                        onClickPage(numberPage + 2);
                      }}
                    >
                      {numberPage + 2}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  ""
                )}

                <PaginationItem disabled={numberPage === totalNumberPage}>
                  <PaginationLink
                    className="page"
                    next
                    //disable={numberPage === totalNumberPage ? true : false}
                    onClick={() => {
                      if (numberPage + 1 <= totalNumberPage) {
                        onClickPage(numberPage + 1);
                      }
                    }}
                  >
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}
        >
          <ModalTitle>Do you want to edit Customer</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                name="customer_Name"
                id="customer_Name"
                placeholder="Name"
                onChange={customer_Name}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text"
                type="text"
                name="Country"
                id="Country"
                placeholder="Country"
                onChange={address}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Price" step="10000" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                id="lastname"
                onChange={address}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleCustomerDetele();

            setCustomerModalEdit(false);
          }}
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDelete)}
          toggle={toggleDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this customer</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleCustomerDetele();
              setCustomerModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
        >
          <h3> Detailed Field Information </h3>
        </ModalHeader>
        <ModalBody>

          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>  FullName</Col>
            <Col className="view-item-size" md={8}>
              {Selectservice !== undefined ? Selectservice.FullName : ""}
              {/* {setSelectservice !== undefined ? displayMajorName(Selectservice.MajorId) : ""} */}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}> Email</Col>
            <Col className="view-item-size" md={8}>
              {Selectservice !== undefined ? Selectservice.Email : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>Date</Col>
            <Col className="view-item-size" md={8}>
              {Selectservice !== undefined ? Selectservice.CreateDate : ""}
            </Col>
          </Row>

          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}> Phone</Col>
            <Col className="view-item-size" md={8}>{Selectservice !== undefined ? Selectservice.PhoneNumber : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

