import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  ModalTitle,
  Table,
} from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  Input,
} from "reactstrap";
import NumberFormat from 'react-number-format';

import moment from "moment";
import {
  TableCell,
  Grid,
  Typography,
} from '@material-ui/core';
import { post, getWithToken } from "../../src/service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
export default function Order() {

  const [modalDelete, setCustomerModalDelete] = useState(false);
  const toggleDelete = () => setCustomerModalDelete(!modalDelete);
  //edit
  const [modalEdit, setCustomerModalEdit] = useState(false);
  const toggleEdit = () => setCustomerModalEdit(!modalEdit)

  const [modalCreate, setCustomerModalCreate] = useState(false);
  const toggleCreate = () => setCustomerModalCreate(!modalCreate)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [Selectservice, setSelectservice] = useState();



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);
  //sort

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  const [searchName, setSearchName] = useState("");


  const [customer_Name, setcustomer_Name] = useState("");
  const [address, setaddress] = useState("");

  const [useListCustomerShow, setUseListCustomerShow] = useState([]);
  const [useListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  useEffect(() => {
    getWithToken("/api/v1.0/services", localStorage.getItem("token")).then(
      (res) => {
        var tempS = res.data;
        console.log(res.data);
        setServiceList(tempS);

      })
    getWithToken("/api/v1.0/orders", localStorage.getItem("token")).then(
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

  //search fc
  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/repairmans?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setCustomerList(temp);
        sort(sortedField, ascending, temp);
        setNumberPage(1);
        setUseListCustomerShow(temp);
        setUseListCustomerShowPage(temp.slice(0, 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/order", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setCustomerList(temp2);
            setUseListCustomerShow(temp2);
            setUseListCustomerShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
            setTotalNumberPage(Math.ceil(temp2.length / 8));
          }
        })
    }
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
   color: '#1d98e0f7',

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


  //sort
  function sort(field, status, items) {
    items.sort((a, b) => {
      if (a[field] < b[field]) {
        if (status) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a[field] > b[field]) {
        if (status) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
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
      "50d2c8b8-2a11-4802-9592-4f76e92aed12": "Pham Tan Phat",
      "e0ca88d0-e18d-4127-ae93-d81863c734e0": "Pham Tan Phat",
      "90b961b3-6c48-4bed-9169-cbbbc978cfee": "Đỗ Dương Tâm Đăng",
      "9f5e4a52-c68b-4eab-9358-a8a90af49f3e": "Đỗ Dương Tâm Đăng",
      "8a022b6b-95de-4430-82b4-2b2fb6e43abf": "Nguyễn Hoàng Quốc Khánh",
      "08f7ee82-6f78-40fa-a368-2bdf202df346": "Lê Vương",
      "8f9cd415-da56-44af-8116-6ccbe3e3b037": "Phạm Hữu Nghĩa",
      // "8f9cd415-da56-44af-8116-6ccbe3e3b037": "Phạm Hữu Nghĩa",
      "00c4858a-f32a-4218-9266-641088f1e373": "Đỗ Dương Tâm Đăng",


//
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
      "dd47f3bf-9a93-422c-baa8-ad659d6334ba": "Vá vết xước thân xe",
      "4a46e366-774b-428b-bb19-8104c0544f87": "Vá vết xước thân xe",
      "d865633f-de3f-4b16-889d-4285739d6da5": "Thay Nhớt",
      "0533e4c5-68db-43df-833c-557fd3d4dca7": "Thay Nhớt",
      "9c86debe-48cd-4ef9-9afd-6a73db4b3129": "Đo và cân chỉnh áp suất lốp",
      "02d59c6b-8e61-48cc-a01d-2eb7da6350d8": "Đo và cân chỉnh áp suất lốp",
      "9a5a8a2e-c7dc-439c-94c3-fe9116114f0f": "Đo và cân chỉnh áp suất lốp",
      "48623af0-6de4-4fed-9e25-3a6835ae7c3b":"Thay nhớt chuyên dụng cho xe ô tô máy xăng",

    };
    return stateValue[type] ? stateValue[type] : "";
  }


  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#1bd1ff" }}
      onClick={x}
    >
      X
    </button>
  );
  return (
    <>
      <Col md="12">
        <Card className="strpied-tabled-with-hover">
          {/* <div className="header-form">
            <Row>
              <Col md={2}>
                <Form
                  onClick={(e) => {
                    onSubmitSearch(e);
                  }}
                >
                  <InputGroup className="fixed">
                    <Input onChange={e => setSearchName(e.target.value)} placeholder="Search name..."></Input>
                    <Button className="dropdown-filter-css" >
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </div> */}
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th
                    className="description"
                    onClick={() => {
                      if (sortedField === "Id" && ascending) {
                        setSortedField("Id");
                        setAscending(false);
                        sort("Id", false, useListCustomerShowPage);
                      } else {
                        setSortedField("Id");
                        setAscending(true);
                        sort("Id", true, useListCustomerShowPage);
                      }
                    }}
                  >
                    Customer{" "}
                    {sortedField === "Id" ? (
                      ascending === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>
                  <th
                    className="description"
                    onClick={() => {
                      if (sortedField === "CustomerAddress" && ascending) {
                        setSortedField("CustomerAddress");
                        setAscending(false);
                        sort("CustomerAddress", false, useListCustomerShowPage);
                      } else {
                        setSortedField("CustomerAddress");
                        setAscending(true);
                        sort("CustomerAddress", true, useListCustomerShowPage);
                      }
                    }}
                  >
                    Address{" "}
                    {sortedField === "CustomerAddress" ? (
                      ascending === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>
                  <th
                    className="description"
                    onClick={() => {
                      if (sortedField === "RepairmanId" && ascending) {
                        setSortedField("RepairmanId");
                        setAscending(false);
                        sort("RepairmanId", false, useListCustomerShowPage);
                      } else {
                        setSortedField("RepairmanId");
                        setAscending(true);
                        sort("RepairmanId", true, useListCustomerShowPage);
                      }
                    }}
                  >
                    Repairman{" "}
                    {sortedField === "RepairmanId" ? (
                      ascending === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>

                  <th
                    className="description"
                    onClick={() => {
                      if (sortedField === "ServiceId" && ascending) {
                        setSortedField("ServiceId");
                        setAscending(false);
                        sort("ServiceId", false, useListCustomerShowPage);
                      } else {
                        setSortedField("ServiceId");
                        setAscending(true);
                        sort("ServiceId", true, useListCustomerShowPage);
                      }
                    }}
                  >
                    Service{" "}
                    {sortedField === "ServiceId" ? (
                      ascending === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>
                  {/* <th className="description">Username</th> */}

                  {/* <th className="description">Created Date </th> */}
                  <th className="description">Create Date</th>
                  <th
                    className="description-price"
                    onClick={() => {
                      if (sortedField === "Total" && ascending) {
                        setSortedField("Total");
                        setAscending(false);
                        sort("Total", false, useListCustomerShowPage);
                      } else {
                        setSortedField("Total");
                        setAscending(true);
                        sort("Total", true, useListCustomerShowPage);
                      }
                    }}
                  >
                    Total{" "}
                    {sortedField === "Total" ? (
                      ascending === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>

                  <th className="description">Point</th>
                  {/* <th className="description">Feedback</th> */}
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
                      {/* <td >{moment(e.CreateTime).format("MM-DD-YYYY")}
                      </td> */}
                      <td>
                        {/* {moment(e.PaymentTime).format("MM-DD-YYYY")} */}
                        {moment(e.CreateTime).format("MM-DD-YYYY")}
                      </td>
                      <td>
                      <NumberFormat className="input-type-css-order"
                          thousandsGroupStyle="thousand"
                          value= {e.Total}
                          decimalSeparator="."
                          thousandSeparator={true}
                          disabled />
                      </td>
                      <td className="point-customer">
                        {e.FeedbackPoint}✩
                      </td>
                      {/* <td className="point-customer">
                        {e.FeedbackMessage}
                      </td> */}
                      {/* <td>
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

                      </td> */}

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
          style={{ color: "#1bd1ff" }}
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
          <Button className="Cancel-button" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
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
          <Button className="Cancel-button" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#1bd1ff" }}
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

