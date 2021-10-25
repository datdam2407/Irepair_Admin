import React, { useState, useEffect } from "react";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";
import NumberFormat from 'react-number-format';
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  ModalTitle,
} from "react-bootstrap";
import "../../assets/css/customSize.css"

import { del, put, getWithToken, getWithTokenParams, putWithToken } from "../../service/ReadAPI";
import FilterState from "../MajorFields/FilterState";
import { makeStyles } from '@material-ui/core/styles';

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
function ManageSevice() {
  //delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);

  //Edit service
  const [serviceEdit, setserviceEdit] = useState(null);
  const [modalEdit, setserviceModalEdit] = useState(false);
  const toggleEdit = () => setserviceModalEdit(!modalEdit)
  //Delete service
  const [serviceDelete, setserviceDelete] = useState(null);
  const [modalserviceDelete, setserviceModalDelete] = useState(false);
  const toggleserviceDelete = () => setserviceModalDelete(!modalserviceDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectservice, setSelectservice] = useState();
  //
  const [majorApprove, setMajorApprove] = useState(null);
  const [modalApprove, setModalApprove] = useState(false);
  const toggleApprove = () => setModalApprove(!modalApprove)

  //service List
  const [useListserviceShow, setUseListserviceShow] = useState([]);
  const [useListserviceShowPage, setUseListserviceShowPage] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [serviceListID, setserviceListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [companyId, setCompanyID] = useState("");
  const [fieldID, setFieldID] = useState("");
  const [serviceID, setserviceID] = useState("");
  const [fieldSelect, setfieldSelect] = useState("")
  const [data1, setData1] = useState({ array: [] });
  const [FieldSelectID, setFieldSelectID] = useState(-1)



  const [listField, setListField] = useState([]);
  //filter 
  const listStates = [
    "New",
    "Approved",
    "Deleted",
    "Updating",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const [CompanyDelete, setCompanyDelete] = useState(null);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);
  //sort
  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);

  const [searchName, setSearchName] = useState("");

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

    },
    name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
    },
    Status: {
      fontWeight: '700',
      width: '71px',
      fontSize: '0.76rem',
      color: 'white',
      backgroundColor: 'green',
      borderRadius: 8,
      textAlign: 'center',
      padding: '3px 10px',
      display: 'inline-block'
    }
  }));

  const classes = useStyles();
  async function handleChooseState(e, id) {
    let newListState = [];
    if (id === -1) {
      if (e.target.checked) {
        newListState = listStates.reduce(
          (state, index) => [...state, listStates.indexOf(index)],
          []
        );
      }
    } else {
      if (e.target.checked) newListState = [...stateListFilter, id];
      else newListState = stateListFilter.filter((item) => item !== id);
    }
    //console.log(newListState);
    setstateListFilter(newListState);
    getserviceList(newListState);
  }

  console.log("field", FieldSelectID)

  // update
  async function handleEditSubmit2() {
    await putWithToken(
      `/api/v1.0/services?serviceId=${CompanyDelete}`,
      {
        id: "String",
        ServiceName: "String",
        description: "String",
        FieldId: "String",
        companyId: "String",
        Price: 0,
        ImageUrl: "String",
        status: 0,
      }, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleEditSubmit(e) {
    await put(
      `/api/v1.0/services`,
      {
        id: serviceID,
        ServiceName: name,
        description: description,
        FieldId: FieldSelectID,
        companyId: companyId,
        Price: price,
        ImageUrl: picture,
        status: 1,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnchangeSelectedAsset(e, value) {
    //console.log(e.target,value);
    setfieldSelect(e.target.fieldId);
    setFieldSelectID(value.value);
  }

  // /api/v1.0/service/{id}
  //delete fc
  function deleteserviceByID() {
    del(`/api/v1.0/services/${serviceDelete}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";

        }
      }).catch((err) => {
        console.log(err);
      });
  }
  //Load service
  useEffect(() => {
    getserviceList();
  }, []);
  function getserviceList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {
      getWithTokenParams(`/api/v1.0/services`, params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setserviceList(temp);
        setUseListserviceShow(temp);
        setUseListserviceShowPage(temp.slice(numberPage * 8 - 8, numberPage * 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));
        setCount(count);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(useListserviceShow.slice(number * 8 - 8, number * 8));
    setTotalNumberPage(Math.ceil(useListserviceShow.length / 8));
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
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      1: "Approved",
      0: "New",
      2: "Deleted",
      3: "Updating"
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function displayCompanyName(type) {
    const stateValue = {
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "e427ae66-4f89-47c9-8032-0cca6577b28f": "Cty sửa chữa xe máy PHÁT THÀNH VINH 10",
      "0e9ceddf-9796-478a-87fc-132567a68116": "Tiệm Sửa Xe Đinh Thành",
      "a9f6fc01-3033-4b57-93eb-13fbc04d4e42": "Tiệm Sửa Xe Trường",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "e5260446-f254-4d8c-a2a8-366748f11068": "Tiệm Sửa Xe Khoa Tay Ga",
      "99e14380-7924-4522-91d5-69533f247258": "Tiệm Sửa Xe Thanh Long",
      "473274b9-8345-4d0d-b765-87daf43a9bf7": "Sửa xe Tuấn 195 Bạch Đằng",
      "033c9453-18a7-4066-b40e-923f685071ae": "Tiệm Sửa Xe Thành Trung",
      "2e0a4a57-7ff9-4f0c-859e-9c6ef6228ca2": "Trung Tâm Kĩ Thuật Xe Máy Hải Dương",
      "b7153746-4f68-47fb-83e5-e5f1ecbed192": "Sửa xe máy Hoài Thu",
      "c2dc1cf0-24c1-4e52-9504-f1dad032f6e9": "Sửa xe Đinh Nguyễn 77",


    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/services?Name=` + searchName,

        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setserviceList(temp);
        sort(sortedField, ascending, temp);
        setNumberPage(1);
        setUseListserviceShow(temp);
        setUseListserviceShowPage(temp.slice(0, 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));

      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/services", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setserviceList(temp2);
            setUseListserviceShow(temp2);
            setUseListserviceShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
            setTotalNumberPage(Math.ceil(temp2.length / 8));
          }
        })
    }
  }//sort
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
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table">
              <div className="header-form">
                <Row>
                  <div className="header-body-filter">
                    <Col md={7}>
                      <Row className="fixed">
                        <InputGroup>
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={dropdownOpen}
                            toggle={toggleDropDown}
                            className="border border-gray-css"
                          >
                            <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>                      <DropdownMenu >
                              <div className="fixed" >
                                <FilterState
                                  list={filterState}
                                  onChangeCheckBox={(e, id) => {
                                    handleChooseState(e, id);
                                  }}
                                  key={filterState}
                                />
                              </div>
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>

                      </Row>
                    </Col>
                  </div>
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
                  {/* <Col md={10} align="right">
                <Button variant="contained" className="add-major-custom" color="primary" onClick={handleClickOpen}>Add service</Button>
              </Col> */}
                </Row>
              </div>
              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Id" && ascending) {
                            setSortedField("Id");
                            setAscending(false);
                            sort("Id", false, useListserviceShowPage);
                          } else {
                            setSortedField("Id");
                            setAscending(true);
                            sort("Id", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Service Name{" "}
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
                          if (sortedField === "Description" && ascending) {
                            setSortedField("Description");
                            setAscending(false);
                            sort("Description", false, useListserviceShowPage);
                          } else {
                            setSortedField("Description");
                            setAscending(true);
                            sort("Description", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Description{" "}
                        {sortedField === "Description" ? (
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
                          if (sortedField === "CompanyId" && ascending) {
                            setSortedField("CompanyId");
                            setAscending(false);
                            sort("CompanyId", false, useListserviceShowPage);
                          } else {
                            setSortedField("CompanyId");
                            setAscending(true);
                            sort("CompanyId", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Company{" "}
                        {sortedField === "CompanyId" ? (
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
                          if (sortedField === "Price" && ascending) {
                            setSortedField("Price");
                            setAscending(false);
                            sort("Price", false, useListserviceShowPage);
                          } else {
                            setSortedField("Price");
                            setAscending(true);
                            sort("Price", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Price{" "}
                        {sortedField === "Price" ? (
                          ascending === true ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </th>
                      <th className="description">Status</th>
                      <th className="viewAll">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListserviceShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <TableCell>
                            <Grid container>
                              <Grid item lg={10}>
                                <Typography className={classes.name}>{e.ServiceName}</Typography>
                                <Typography color="textSecondary" variant="body2">{e.Id}</Typography>
                                {/* <Typography color="textSecondary" variant="body2">{e.Id}</Typography> */}
                              </Grid>
                            </Grid>
                          </TableCell>
                          <td>
                            {e.Description}
                          </td>
                          <td>
                            {displayCompanyName(e.CompanyId)}
                          </td>
                          <td>
                            <NumberFormat className="input-type-css"
                              thousandsGroupStyle="thousand"
                              value={e.Price}
                              decimalSeparator="."
                              thousandSeparator={true}
                              disabled />
                          </td>
                          <TableCell>
                            <Typography
                              className={classes.Status}
                              style={{
                                backgroundColor:
                                  ((e.Status === 1 && 'rgb(34, 176, 34)')
                                    ||
                                    (e.Status === 0 && 'rgb(50, 102, 100)')
                                    ||
                                    (e.Status === 2 && 'red')
                                    ||
                                    (e.Status === 3 && '#1f0202'))
                              }}
                            >{displayStateName(e.Status)}</Typography>
                          </TableCell>
                          <td className="td-actions">
                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-960683717">
                                  Approved Service..
                                </Tooltip>
                              }
                              placement="right"
                            >
                              <Button
                                onClick={() => {
                                  setModalApprove(true);
                                  setCompanyDelete(e.Id);
                                  // setSelectservice(e);
                                }}
                                className="btn-link btn-icon"
                                type="button"
                                variant="success"
                              >
                                <i className="fas fa-check"></i>
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-960683717">
                                  View Service..
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
                  <Col md={6}>
                    <Pagination
                      aria-label="Page navigation example"
                      className="page-right"
                    >
                      <PaginationItem disabled={numberPage === 1}>
                        <PaginationLink
                          className="page"
                          previous
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#B22222" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to Appprove this service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByID();
              handleEditSubmit2();
              setModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}
          <Button color="secondary" onClick={toggleApprove}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalserviceDelete} toggle={toggleserviceDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteserviceByID();
              setserviceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleserviceDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
        >
          <ModalTitle>Do you want to edit service ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-2">
              <Form.Label>Company </Form.Label>
              <Form.Control disabled type="text" placeholder="name" value={companyId}
                onChange={e => setCompanyID(e.target.value)}
              />
            </FormGroup>
            <Form.Label>Field </Form.Label>
            <FormGroup className="mb-2">
              <Dropdown
                fluid
                search
                selection
                value={fieldSelect}
                onChange={handleOnchangeSelectedAsset}
                options={listField} />
            </FormGroup>

            <FormGroup className="mb-2">
              <Form.Label>service name</Form.Label>
              <Form.Control type="text" placeholder="Service name" value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="service name" value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            handleEditSubmit();
            setserviceModalEdit(false);
          }}
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
        >
          <h3>INFORMATION</h3>
        </ModalHeader>
        <ModalBody className="Modal-body-view-all-service">
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>Name:</Col>
            <Col className="view-item-size" md={8}>
              {selectservice !== undefined ? selectservice.ServiceName : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>Company:</Col>
            <Col className="view-item-size" md={8}>
              {selectservice !== undefined ? displayCompanyName(selectservice.CompanyId) : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>Description:</Col>
            <Col className="view-item-size" md={8}>
              {selectservice !== undefined ? selectservice.Description : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>Price:</Col>
            <Col className="view-item-size" md={8}>
              {selectservice !== undefined ? selectservice.Price : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>State:</Col>
            <Col className="view-item-size" md={8}>{selectservice !== undefined ? displayStateName(selectservice.Status) : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>


    </>
  );
}

export default ManageSevice;
