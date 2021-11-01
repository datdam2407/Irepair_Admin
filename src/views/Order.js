import React, { useState, useEffect } from "react";
import { IconName ,TiStar } from "react-icons/ti";
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
          var totalPrice = 0;
          temp.map((e, index) =>{
            totalPrice  +=  e.Total;
          })
          console.log(totalPrice);

          localStorage.setItem("revenus", totalPrice);
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
    name: {
      fontWeight: 'bold',
      color: '#1d98e0f7',
      width: '164px',
      paddingRight:'20px'
    },
    nameService: {
      fontWeight: 'bold',
      color: 'black',
      width: '194px',
      paddingRight:'5px'
    },
    repairman: {
      fontWeight: 'bold',
      color: '#e86a10f7',
      width: '194px',
    },
    Status: {
      fontWeight: '700',
      width: '121px',
    },
    StatusOrder: {
      fontWeight: '700',
      textAlign: 'center',
      width: '91px',
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
      3: "Pending",
      2: "Cancelled",
      1: "",
      0: "Compeleted",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function displayRepairName(type) {
    const stateValue = {
      "304a7d8c-735e-49ef-9ec5-004a4feb3a2f": "Lê Minh Tài",
      "3f37cd77-95c4-407d-af05-21a3498e28d9": "Nguyễn Hoàng Duy",
      "8a022b6b-95de-4430-82b4-2b2fb6e43abf": "Nguyễn Hoàng Quốc Khánh",
      "8f9cd415-da56-44af-8116-6ccbe3e3b037": "Phạm Hữu Nghĩa",
      "8634c44c-7ebc-4b85-a1a7-862fbe7d162c": "Nguyễn Lê Thuần",
      "9f5e4a52-c68b-4eab-9358-a8a90af49f3e": "Đỗ Dương Tâm Đăng",
      "ce714876-383b-4b74-82d9-acefc7061d05": "Hà Lê Phúc",
      "43b11fa5-c4a8-4618-947f-b03c086dbaef": "Đàm Tiến Đạt",
      "c1fc7c9f-84e3-4321-991f-cf29ea554fe0": "Nguyễn Minh Hoàng",
      "e0ca88d0-e18d-4127-ae93-d81863c734e0": "Phạm Tấn Phát",
      "484d58bc-991c-48a7-b6bf-d83fad176b82": "Phạm Gia Nguyên",
      "376f16ef-e4fc-4cc6-873e-fc5fd1255d86": "Lê Anh Nguyên",

      "7c172d79-7c5d-4ed5-8e71-26ba2e7bf1a3": "nguyen thuan",
      "84066527-2ba2-421a-8637-35d765b153e1": "Tam Dang",
      "b123ea59-f40d-495d-b4c8-3be7c96200ad": "Nguyễn Thuần",
      "50d2c8b8-2a11-4802-9592-4f76e92aed12": "Pham Tan Phat (K14 HCM)",
      "00c4858a-f32a-4218-9266-641088f1e373": "Do Duong Tam Dang",

      //
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  function displayServiceName(type) {
    const stateValue = {

      "d43a8be6-03c2-41e1-83fa-0311cc9045ce": "Sửa xe chết máy",
      "89b30cb7-eff1-4867-8941-03e26cd6aeec": "Sửa xe chết máy",
      "11917ecd-e0de-466d-9183-04e0b0aca256": "Vá xe",
      "acf37625-db7b-4bba-a323-07c5bc88841a": "Sửa bình điện",
      "3186167d-d125-4a9c-9ea4-1f5cf92e0ac6": "Sửa dây sên bị chùng",
      "3ffcf820-e283-4630-a933-318bd640c811": "Vá xe",
      "bf3b524b-fdbe-4fd1-9fb0-35a21e3fcbd5": "Đo và cân chỉnh áp suất lốp",
      "48623af0-6de4-4fed-9e25-3a6835ae7c3b": "Thay nhớt",
      "5b847142-764f-4d58-afd4-4259b324922a": "Thay nhớt",
      "441f3efa-6b06-442c-9fb6-4bd0ce1a1a63": "Thay nhớt",
      "6d24a554-954e-40f1-af29-53b28d41d0ce": "Vá xe",
      "c8bdbcaf-745e-496f-8f15-753a4dd34d04": "Sửa dây sên bị chùng",
      "ad42056d-9978-442b-97be-80188ea6f4fb": "Sửa dây sên bị chùng",
      "f6553513-3704-4dd4-b16f-873e483ef5d8": "Đo và cân chỉnh áp suất lốp",
      "e4c6ec3a-4c98-4b63-9ecf-92e03c66e13a": "Thay nhớt",
      "d3b8e0d8-8c55-490a-b081-ab87d4c5cdd9": "Thay nhớt",
      "1f68f6fb-3ec2-41e9-a68c-ab91cde860ad": "Sửa phanh xe",
      "29956e2a-3923-4946-a9f7-b2c8f008a766": "Sửa phanh xe",
      "94db7531-fbad-4ed9-95b7-d6937ed5ac32": "Sửa phanh xe",
      "9a5a8a2e-c7dc-439c-94c3-fe9116114f0f": "Đo và cân chỉnh áp suất lốp",

      "2": "Repairman",
      "1": "Customer",
      "0": "Customer",
      "null": "Remaining"

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

                  {/* <th className="description">Username</th> */}

                  {/* <th className="description">Created Date </th> */}
                  {/* <th className="description">Create Date</th> */}

                  {/* <th className="description">Person</th> */}
                  <th className="description">Reason</th>
                  <th className="description">Status</th>

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
                    Total (VNĐ) {" "}
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
                            <Typography className={classes.nameService}>{displayServiceName(e.ServiceId)}</Typography>
                            <Typography color="textSecondary" variant="body2">{e.Id}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>{displayRepairName(e.CustomerId)}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        {e.CustomerAddress}
                      </td>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.repairman}> {displayRepairName(e.RepairmanId)}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      {/* <td>
                        {moment(e.CreateTime).format("MM-DD-YYYY")}
                      </td> */}
                      {/* <td> */}
                      {/* {e.CancelPerson} */}
                      {/* {displayServiceName(e.CancelPerson)} */}
                      {/* </td> */}
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            color:
                              ((e.CancelReason === "Không liên hệ được thợ" && 'red') ||
                                // ((e.CancelReason === "Không liên hệ được thợ" && 'red') ||
                                (e.CancelReason === "Thời gian chờ thợ đến quá lâu" && 'red'))
                          }}
                        >{e.CancelReason}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          className={classes.StatusOrder}
                          style={{
                            backgroundColor:
                              ((e.Status === 0 && 'rgb(34, 176, 34)') ||
                                (e.Status === 3 && 'gray') ||
                                (e.Status === 2 && 'red'))
                          }}
                        >  {displayStateName(e.Status)}</Typography>
                      </TableCell>

                      <td>
                        <NumberFormat className="input-type-css-order"
                          thousandsGroupStyle="thousand"
                          value={e.Total} 
                          decimalSeparator="."
                          thousandSeparator={true}
                          disabled />
                      </td>
                      <td className="point-customer">
                        {e.FeedbackPoint} <TiStar/>
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

