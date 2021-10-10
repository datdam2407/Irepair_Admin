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
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { Link } from "react-router-dom";
import { del, post, get, getWithToken } from "../../src/service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';

export default function Customer() {

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

  const [AvatarCus, setAvatarCus] = useState("");
  const [CreateDate, setCreateDate] = useState("");
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Username, setUsername] = useState("");


  const [useListCustomerShow, setUseListCustomerShow] = useState([]);
  const [useListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerListID, setCustomerListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  useEffect(() => {
    getCustomerList();
    getWithToken("/api/v1.0/customers", localStorage.getItem("token")).then(
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
  function getCustomerList() {
    getWithToken("/api/v1.0/customers", localStorage.getItem("token")).then((res) => {
      var temp = res.data;
      // setName(temp.name);
      // setDescription(temp.description);
      // setImage(temp.picture);
      // setIsDeleted(temp.is_Delete);

    }).catch((err) => {
      console.log(err);
    });
  }


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
                  <th className="description">Image</th>
                  <th className="description">Customer</th>
                  <th className="description">Phone </th>
                  <th className="description">Email</th>
                  {/* <th className="description">Username</th> */}
                  <th className="description">Create Date</th>
                  <th className="description">FullName</th>
                  <th className="description">Uid</th>
                  <th className="description">Views</th>
                </tr>
              </thead>
              <tbody>
                {useListCustomerShowPage.map((e, index) => {
                  return (
                    <tr key={index}>
                      
                      <td>
                        <img src={e.Avatar}/>
                      </td>
                     <TableCell>
                            <Grid container>
                              <Tooltip html={(
                                <div style={{ width: 700, height: 300 }}>
                                  <strong>
                                    <ModalHeader
                                      style={{ color: "yellow" }}
                                    >
                                      Detailed User Information
                                    </ModalHeader>
                                    <ModalBody>
                                      <Row>
                                        <Col md={2}> Full Name:</Col>
                                        <Col md={3}> {e.FullName}</Col>
                                      </Row>
                                      <Row>
                                        <Col md={2}>Create Date:</Col>
                                        <Col md={3}>
                                          {e.CreateDate}
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col md={2}>Email:</Col>
                                        <Col md={3}>
                                          {e.Email}
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col md={3} ><img className="text-left-topic-toolpi" src={e.Avatar} /></Col>
                                      </Row>

                                    </ModalBody>
                                  </strong>
                                </div>
                              )}
                              >
                                <Grid item lg={2}>
                                  <Avatar src={e.Avatar} className={classes.avatar}>
                                  </Avatar>
                                </Grid>
                              </Tooltip>
                              <Grid item lg={10}>
                                <Typography className={classes.name}>{e.FullName}</Typography>
                                <Typography color="textSecondary" variant="body2">{e.Id}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
              
              
                      <td>
                        {e.PhoneNumber}
                      </td>
                      <td>
                        {e.Email}
                      </td>
                      {/* <td>
                        {e.Username}
                      </td> */}
                      <td >{moment(e.CreateDate).format("MM-DD-YYYY")}
                      </td>
                      <td>
                        {e.FullName}
                      </td>
                      <td>
                        {e.Uid}
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
                              setModalStatus(true);
                              setSelectservice(e);
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
          Detailed Field Information
        </ModalHeader>
        <ModalBody>
        <Row>
            <Col></Col>
            <Col md={3}>Picture</Col>
            <Col md={8}>
              {Selectservice !== undefined ? <img className="text-left-topic" src={Selectservice.Avatar} /> : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}> FullName</Col>
            <Col md={8}>
              {Selectservice !== undefined ? Selectservice.FullName : ""}
              {/* {setSelectservice !== undefined ? displayMajorName(Selectservice.MajorId) : ""} */}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Email</Col>
            <Col md={8}>
              {Selectservice !== undefined ? Selectservice.Email : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Create Date</Col>
            <Col md={8}>
              {Selectservice !== undefined ? Selectservice.CreateDate : ""}
            </Col>
          </Row>
          
          <Row>
            <Col></Col>
            <Col md={3}>Phone</Col>
            <Col md={8}>{Selectservice !== undefined ? Selectservice.PhoneNumber : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

