import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
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
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";
import "../../assets/css/customSize.css"

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
// import "../../assets/css/customSize.css"

import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken } from "../../service/ReadAPI";
import FilterState from "../MajorFields/FilterState";

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
function ManageSevice() {
  //delete modal  
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);

  //modal create
  const [modalCreate, setserviceModalCreate] = useState(false);
  const toggleCreate = () => setserviceModalCreate(!modalCreate)

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


  //service List
  const [useListserviceShow, setUseListserviceShow] = useState([]);
  const [useListserviceShowPage, setUseListserviceShowPage] = useState([]);
  const [serviceList, setserviceList] = useState([]);
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
  const [FieldSelectID, setFieldSelectID] = useState(1)

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);



  const [listField, setListField] = useState([]);
  //filter 
  const listStates = [
    "New",
    "Active",
    "Inative",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  //search name
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
      color: "#1d98e0f7",
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
  //filter
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
    setstateListFilter(newListState);
    getserviceList(newListState);
  }
  //load service
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

  //major fields
  useEffect(() => {
    let params = {};
    let currentField = {};
    let FieldId = "";
    getWithToken(
      `/api/v1.0/major-fields`, localStorage.getItem("token")
    ).then((res) => {
      FieldId = res.data.FieldId
      console.log(res.data)
      currentField['text'] = `${res.data.name}`;
      currentField['value'] = res.data.fieldId;
      currentField['key'] = res.data.fieldId;
      setFieldID(FieldId);

    }).then(() => {
    });

    params['Status'] = [0].reduce((f, s) => `${f},${s}`);
    getWithTokenParams("/api/v1.0/major-fields", params, localStorage.getItem("token")
    ).then(res => {
      setData1(res.data);
      const newlistField = res.data.reduce((list, item) => [...list,
      {
        text: `${item.Name}`,
        value: item.Id,
        key: item.Id
      }], [])
      setListField(
        [currentField, ...newlistField],
      );
    })
  }, []);

  console.log("field", FieldSelectID)
  // update fc
  async function handleEditSubmit(e) {
    await putWithToken(
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
      localStorage.getItem("token")
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
  // create fc
  async function handleSubmitCreate(e) {
    await postWithToken(
      `/api/v1.0/services`,
      {
        id: null,
        ServiceName: name,
        description: description,
        FieldId: FieldSelectID,
        companyId: localStorage.getItem("IDCompany"),
        Price: price,
        ImageUrl: picture,
        status: 0,
      },
      localStorage.getItem("token")
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
  }

  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'reactSWD')
    setLoading(true)
    const res = await fetch(
      ' https://api.cloudinary.com/v1_1/fpt-claudary/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setImage(file.secure_url)
    setLoading(false)
  }


  function handleOnchangeSelectedAsset(e, value) {
    setfieldSelect(e.target.fieldId);
    setFieldSelectID(value.value);
  }
  function getserviceByID(Id) {
    getWithToken(`/api/v1.0/services/${Id}`, localStorage.getItem("token")).then((res) => {
      setserviceID(Id);
      setName(res.data.serviceName);
      setDescription(res.data.description);
      setImage(res.data.imageUrl);
      setPrice(res.data.price);
      setCompanyID(res.data.companyId);
      setFieldID(res.data.fieldId);
    }).catch((err) => {
      console.log(err);
    });
  }
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
  function cancelServiceByID() {
    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    setCompanyID("");
    setFieldID("");
    setserviceID("");
    setFieldSelectID(-1);
    toggleEdit();
  }
  //Load service

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(useListserviceShow.slice(number * 8 - 8, number * 8));
    setTotalNumberPage(Math.ceil(useListserviceShow.length / 8));
  }
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

  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" , backgroundColor:"white", border:"1px solid white" }}
      onClick={x}
    >
      X
    </button>
  );
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      2: "Inactive",
      1: "Active",
      0: "New",
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




      "86083895-18dc-4fba-a721-a5acce6a26a8": "Xe số",
      "6eaa4097-e5e5-465e-8f15-f15f81f0e36e": "Xe tay ga",
      "813a4c08-fa29-48bb-9d76-0beaa4d133f8": "Xe đạp điện",
      "458dcfdd-d1e1-43cf-9276-176574447f61": "Xe ô tô máy xăng",
      "b65f8d53-c476-4474-9b45-268ea039ecbf": "Xe ô tô máy điện",
      "2e316c2d-153e-42cb-8ef8-bb828d8f1d4c": "Xe ô tô máy dầu",
    
    };
    return stateValue[type] ? stateValue[type] : "";
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
                  <Col md={9} align="right">
                    <Button variant="contained" className="add-major-custom" color="primary" onClick={() => { setserviceModalCreate(true); }}>Add service</Button>
                  </Col>
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
                          if (sortedField === "FieldId" && ascending) {
                            setSortedField("FieldId");
                            setAscending(false);
                            sort("FieldId", false, useListserviceShowPage);
                          } else {
                            setSortedField("FieldId");
                            setAscending(true);
                            sort("FieldId", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Major Field{" "}
                        {sortedField === "FieldId" ? (
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
                          if (sortedField === "Status" && ascending) {
                            setSortedField("Status");
                            setAscending(false);
                            sort("Status", false, useListserviceShowPage);
                          } else {
                            setSortedField("Status");
                            setAscending(true);
                            sort("Status", true, useListserviceShowPage);
                          }
                        }}
                      >
                        Status{" "}
                        {sortedField === "Status" ? (
                          ascending === true ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )}
                      </th>
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
                              </Grid>
                            </Grid>
                          </TableCell>

                          <td>
                            {e.Description}
                          </td>
                          <td>
                            {displayCompanyName(e.FieldId)}
                          </td>

                        
                          <TableCell>
                            <Typography
                              className={classes.Status}
                              style={{
                                backgroundColor:
                                  ((e.Status === 1 && 'green')
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

                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-436082023">
                                  Edit Post..
                                </Tooltip>
                              }
                              placement="right"
                            >
                              <Button
                                // onClick={() => handleUpdate(e.data)}
                                // onGridReady={onGridReady}
                                onClick={() => {
                                  // setserviceEdit(e.Id);
                                  getserviceByID(e.Id);
                                  setserviceModalEdit(true);
                                }}
                                className="btn-link btn-icon"
                                type="button"
                                variant="success"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-334669391">
                                  Remove Post..
                                </Tooltip>
                              }
                              placement="right\"
                            >
                              <Button
                                onClick={() => {
                                  setserviceDelete(e.Id);
                                  setserviceModalDelete(true);
                                }}
                                className="btn-link btn-icon"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalserviceDelete} toggle={toggleserviceDelete}>
        <ModalHeader
          style={{ color: "#1d98e0f7" }}
        >
          <h3>Are you sure?</h3>
        </ModalHeader>
        <ModalBody> <h4>Do you want to delete this service ?</h4></ModalBody>
        <ModalFooter  style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={() => { toggleserviceDelete(); }}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              deleteserviceByID();
              setserviceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
          
      <Modal isOpen={modalCreate} toggle={toggleCreate} centered size="lg" >
        <ModalHeader
          style={{ color: "#1d98e0f7" }}
        >
          <ModalTitle><h3>Do you want to create new service ?</h3></ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>

              

                <FormGroup className="mb-2">
                  <Form.Label>Service name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Service name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    options={listField}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="file" onFileChange={picture}
                    onChange={uploadImage}
                  />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={picture} style={{ width: '220px' }} />
                  )}
                </Form.Group>
              </Grid>
            </Grid>
          </Form>
        </ModalBody>
      
        <ModalFooter style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={toggleCreate}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              // handleServiceDetele();
              handleSubmitCreate();
              setserviceModalCreate(false);
            }}
          >
            Save
          </Button>
        
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggleEdit} centered size="lg" >
        <ModalHeader
          style={{ color: "#1d98e0f7" }}
        >
          <ModalTitle><h3>Do you want to edit service ?</h3></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
              <FormGroup className="mb-2">
                  <Form.Label>Service name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Service name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    options={listField}
                  />
                </FormGroup>
            
                <FormGroup className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="file" onFileChange={picture}
                    onChange={uploadImage}
                  />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={picture} style={{ width: '220px' }} />
                  )}
                </Form.Group>
              </Grid>
            </Grid>
          </Form>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={() => { cancelServiceByID(); }}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              // handleServiceDetele();
              handleEditSubmit();
              setserviceModalEdit(false);
            }}
          >
            Update
          </Button>
          
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
          close={closeBtn(toggleDetails)}
          toggle={toggleDetails}>
          <h3>INFORMATION</h3>
        </ModalHeader>
        <ModalBody>
          <div className="img-container">
            {selectservice !== undefined ? <img className="text-left-topic" src={selectservice.ImageUrl} /> : ""}
          </div>
        </ModalBody>
        <ModalBody>
        <a className="name" style={{color:"#1d98e0f7"}}>Name:</a> <a className="name"> {selectservice !== undefined ? selectservice.ServiceName : ""}</a>
          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Description:</a>  <a className="name">{selectservice !== undefined ? selectservice.Description : ""}</a>

          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>MajorField:</a>  <a className="name">{selectservice !== undefined ? displayCompanyName(selectservice.FieldId) : ""}</a>

          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Status</a><a className="name"> {selectservice !== undefined ? displayStateName(selectservice.Status) : ""}</a>
          <br />
        </ModalBody>

      </Modal>



    </>
  );
}

export default ManageSevice;