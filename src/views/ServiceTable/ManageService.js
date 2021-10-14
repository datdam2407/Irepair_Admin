import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";
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

import { del, put, get, getWithParams, getWithToken, getWithTokenParams } from "../../service/ReadAPI";
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
import FormDialog from './DialogService';
function ManageSevice() {
  //delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

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
    "Blocked",
    "Deleted",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

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

    params['Status'] = [1].reduce((f, s) => `${f},${s}`);
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


  const initialValue = { name: "", description: "", imageUrl: "", status: "1" }

  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const url = "https://ec2-3-1-222-201.ap-southeast-1.compute.amazonaws.com/api/v1.0/services"
  const columnDefs = [
    { headerName: "ID", field: "Id", },
    { headerName: "ServiceName", field: "servicename", },
    { headerName: "Description", field: "description", },
    { headerName: "Price", field: "price", },
    { headerName: "FieldId", field: "fieldid", },
    { headerName: "CompanyId", field: "companyid", },
    { headerName: "ImageUrl", field: "imageUrl" },
    {
      headerName: "Actions", field: "Id", cellRendererFramework: (params) => <div>
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ]
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
  }
  console.log("field", FieldSelectID)
  // update
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

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    console.log(oldData)
    handleClickOpen()
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "put", body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJY3YyMGVPeGVibmJsOVM3Sm00WnNsZnVUODIiLCJjZXJ0c2VyaWFsbnVtYmVyIjoiNWYxYzhkMjItNGM0ZS00MmE0LWFmYTgtODE2ZjRmZDAwNWIwIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjMzNjQwNTkzLCJleHAiOjE2MzM3MjY5OTMsImlhdCI6MTYzMzY0MDU5M30.PuqWp4m97btZUPEpI4TSqrWGrJX_Etq360G5E_OKjI4`,
          "Content-type": "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getserviceList()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "post", body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJY3YyMGVPeGVibmJsOVM3Sm00WnNsZnVUODIiLCJjZXJ0c2VyaWFsbnVtYmVyIjoiNWYxYzhkMjItNGM0ZS00MmE0LWFmYTgtODE2ZjRmZDAwNWIwIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjMzNjQwNTkzLCJleHAiOjE2MzM3MjY5OTMsImlhdCI6MTYzMzY0MDU5M30.PuqWp4m97btZUPEpI4TSqrWGrJX_Etq360G5E_OKjI4`,
          "Content-type": "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getserviceList()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }



  // Load service by ID
  // useEffect(() => {
  //   getserviceByID();
  //   get(`/service/get-by-id?id=${serviceEdit}`).then((res)=>{
  //     setName(res.data.name);
  //     setDescription(res.data.description);
  //     setImage(res.data.picture);
  //     setIsDeleted(res.data.is_Delete);
  //   });
  // }, []);
  function handleOnchangeSelectedAsset(e, value) {
    //console.log(e.target,value);
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
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
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
                  {/* <Col md={10} align="right">
                <Button variant="contained" className="add-major-custom" color="primary" onClick={handleClickOpen}>Add service</Button>
              </Col> */}
                </Row>
              </div>
              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      {/* <th className="text-left-topic">Topic</th> */}
                      {/* <th className="text-left-topic">FieldId</th> */}
                      <th className="description" >Service Name</th>
                      <th className="description">Description</th>
                      <th className="description">Company</th>
                      <th className="description">Price</th>
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
                              {/* <Grid item lg={2}>
                                <Avatar src={e.ImageUrl} className={classes.avatar}>
                                <img src="string"/>

                                </Avatar>
                              </Grid> */}
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
                            {e.Price}
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
      <Modal isOpen={modalserviceDelete} toggle={toggleserviceDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleserviceDelete)}
          toggle={toggleserviceDelete}
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
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}
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
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
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

      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />

    </>
  );
}

export default ManageSevice;
