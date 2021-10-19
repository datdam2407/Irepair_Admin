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
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  PaginationItem,
  Input,
  PaginationLink,
  FormGroup,
} from "reactstrap";
import { storage } from "Firebase/firebaseConfig";
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
  ModalTitle,
} from "react-bootstrap";
import "../../assets/css/customSize.css"
import { del, put, get, postWithToken, getWithTokenParams, getWithToken, putWithToken } from "../../service/ReadAPI";
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
import FormDialog from './DialogFields';
import FilterState from "./FilterState";
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
function MajorFields() {
  //delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  //modal create
  const [modalCreate, setMajorModalCreate] = useState(false);
  const toggleCreate = () => setMajorModalCreate(!modalCreate)

  // const[MajorNameByFieldID, setMajorName] = useState("");
  //Edit Major
  const [MajorEdit, setMajorEdit] = useState(null);
  const [modalEdit, setMajorModalEdit] = useState(false);
  const toggleEdit = () => setMajorModalEdit(!modalEdit)
  //Approved
  const [majorApprove, setMajorApprove] = useState(null);
  const [modalApprove, setMajorModalApprove] = useState(false);
  const toggleApprove = () => setMajorModalApprove(!modalApprove)
  //Delete Major
  const [MajorDelete, setMajorFieldDelete] = useState(null);
  const [modalMajorFieldDelete, setMajorModalFieldDelete] = useState(false);
  const toggleMajorDelete = () => setMajorModalFieldDelete(!modalMajorFieldDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectMajor, setSelectMajor] = useState();

  const [searchName, setSearchName] = useState("");

  //Filter
  const listStates = [
    "Inactive",
    "Active",

  ];

  // custom table
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
      backgroundColor: '#FFFFFF',
      // color: theme.palette.getContrastText(theme.palette.primary.light),
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

  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);


  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  //Major List
  const [useListMajorShow, setUseListMajorShow] = useState([]);
  const [useListMajorShowPage, setUseListMajorShowPage] = useState([]);
  const [MajorList, setMajorList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [majorID, setMajorfieldID] = useState("");
  const [major, setMajor] = useState("");

  //select major 
  const [ID, setMajorID] = useState("");
  const [majorSelect, setMajorSelect] = useState("")
  const [data1, setData1] = useState({ array: [] });
  const [MajorSelectID, setMajorSelectID] = useState(ID)
  const [listSelectMajor, setListMajor] = useState([]);



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
  const url = "https://ec2-3-1-222-201.ap-southeast-1.compute.amazonaws.com/api/v1.0/major-fields"
  const columnDefs = [
    { headerName: "ID", field: "Id", },
    { headerName: "Name", field: "name", },
    { headerName: "Description", field: "description", },
    { headerName: "Major", field: "majorId", },
    { headerName: "imageUrl", field: "imageUrl" },
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
    //console.log(newListState);
    setstateListFilter(newListState);
    getMajorFieldsList(newListState);
  }

  // update

  async function handleEditSubmit2(e) {
    await putWithToken(
      `/api/v1.0/major-fields`,
      {
        id: majorID,
        name: name,
        description: description,
        majorId: major,
        imageUrl: picture,
        status: 1,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/fields";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleCreateSubmit(e) {
    await postWithToken(
      `/api/v1.0/major-fields`,
      {
        id: null,
        name: name,
        description: description,
        majorId: MajorSelectID,
        imageUrl: picture,
        status: 1,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/fields";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleEditSubmit(e) {
    await putWithToken(
      `/api/v1.0/major-fields`,
      {
        id: majorID,
        name: name,
        description: description,
        majorId: MajorSelectID,
        imageUrl: picture,
        status: 1,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/fields";
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
  function checkDisableImage(state) {
    const list = [1, 3];
    if (list.includes(state)) return true;
    else return false;
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "put", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getMajorFieldsList()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "post", body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJY3YyMGVPeGVibmJsOVM3Sm00WnNsZnVUODIiLCJjZXJ0c2VyaWFsbnVtYmVyIjoiNWYxYzhkMjItNGM0ZS00MmE0LWFmYTgtODE2ZjRmZDAwNWIwIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjMzODY4MzQ0LCJleHAiOjE2MzM5NTQ3NDQsImlhdCI6MTYzMzg2ODM0NH0.UGHIVGarMnVEevVMIKNw-2Qd0lcJV7eAEuL_XwOgDfw`,
          "Content-type": "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getMajorFieldsList()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }
  function displayMajorName(type) {
    const nameMajor = {
      "a037b04c-51b3-4650-b369-0ea7ee869821": "Điện Tử",
      "27429af0-6de4-4fed-9e25-3a6835ae7c3b": "Xe máy",
      "a7fd5dbf-585b-40f4-acbc-495592de7116": "Điện lạnh",
      "a2bdd6ec-d60c-476e-b53c-7d92900c3bb3": "Xe ô tô",
      "ae54f939-d711-41bc-ab4b-7fa65af9c17b": "Khóa",
      "6b80588f-eeb2-4f68-94e0-e245b79be801": "Ống nước",
      "45d74304-09cf-4dc7-859d-e464a4a7e053": "Đồ gia dụng",
      "bd3ee5ea-9cea-4df6-99e0-03b4f46bc25e": "Sửa đồ gỗ",
      "11fedcef-5113-4fb8-8854-42622e68cac6": "Sửa điện lạnh",
      "3d38e346-ba11-4f70-b18d-ea2515752ab8": "Keys",
    };
    return nameMajor[type] ? nameMajor[type] : "";
  }
  function handleOnchangeSelectdmajor(e, value) {
    //console.log(e.target,value);
    setMajorSelect(e.target.MajorID);
    setMajorSelectID(value.value);
  }
  console.log("aaaa", MajorSelectID)
  // console.log("majornam", MajorNameByFieldID)
  useEffect(() => {
    let params = {};
    let currentField = {};
    let MajorID = "";
    // let MajorNameByFieldID = "";
    getWithToken(
      `/api/v1.0/majors`, localStorage.getItem("token")
    ).then((res) => {
      MajorID = res.data.Id
      // MajorNameByFieldID = res.data.name
      console.log(res.data)
      currentField['text'] = `${res.data.Name}`;
      currentField['value'] = res.data.Id;
      currentField['key'] = res.data.Id;
      setMajorID(MajorID);
      // setMajorName(MajorNameByFieldID);

    }).then(() => {
    });

    params['Status'] = [1].reduce((f, s) => `${f},${s}`);
    getWithTokenParams("/api/v1.0/majors", params, localStorage.getItem("token")
    ).then(res => {
      setData1(res.data);
      const newlistMajor = res.data.reduce((list, item) => [...list,
      {
        text: `${item.Name}`,
        value: item.Id,
        key: item.Id
      }], [])
      setListMajor(
        [currentField, ...newlistMajor],
      );
    })
  }, []);


  function getMajorFieldsByID(Id) {

    getWithToken(`/api/v1.0/major-fields/${Id}`, localStorage.getItem("token")).then((res) => {
      setMajorfieldID(Id);
      setName(res.data.value.name);
      setDescription(res.data.value.description);
      setMajor(res.data.value.majorId);
      setImage(res.data.value.imageUrl);
      setStatus(res.data.value.status);
    }).catch((err) => {
      console.log(err);
    });
  }

  // /api/v1.0/major/{id}
  //delete fc
  function deleteMajorFieldsByID() {
    del(`/api/v1.0/major-fields/${MajorDelete}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/fields";
          alert("Delete Successfully")
        }
      }).catch((err) => {
        console.log(err);
      });
  }
  //Load major
  useEffect(() => {
    getMajorFieldsList();
  }, []);
  function getMajorFieldsList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    getWithTokenParams(`/api/v1.0/major-fields`, params, localStorage.getItem("token")).then((res) => {
      var temp = res.data.filter((x) => x.state !== "Completed");
      setMajorList(temp);
      setUseListMajorShow(temp);
      setUseListMajorShowPage(temp.slice(numberPage * 6 - 6, numberPage * 6));
      setTotalNumberPage(Math.ceil(temp.length / 6));
      setCount(count);
    }).catch((err) => {
      console.log(err);
    });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListMajorShowPage(useListMajorShow.slice(number * 6 - 6, number * 6));
    setTotalNumberPage(Math.ceil(useListMajorShow.length / 6));
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
      0: "Inactive",
      1: "Active",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  // upload img
  // handleImageupload = (e) =>{
  //   if (target.files[0]){
  //     const image = (e.target.files[0]);
  //     const uploadTask = storage.ref(`image/${image.name}`).put(image)
  //     uploadTask.on('change_stage', 
  //     (snapshot) => {
  //       console.log(snapshot)
  //     },
  //     (err) => {
  //       console.log(err);
  //     }, () =>{
  //       storage.ref('image').child(image.name).getDowLoadUrl().then(url => {
  //         this.setState(url);
  //       })
  //     }
  //     )
  //   }
  // }

  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/major-fields?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setMajorList(temp);
        setNumberPage(1);
        setUseListMajorShow(temp);
        setUseListMajorShowPage(temp.slice(0, 6));
        setTotalNumberPage(Math.ceil(temp.length / 6));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/major-fields", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setMajorList(temp2);
            setUseListMajorShow(temp2);
            setUseListMajorShowPage(temp2.slice(numberPage * 6 - 6, numberPage * 6));
            setTotalNumberPage(Math.ceil(temp2.length / 6));
          }
        })
    }
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
                            <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>                            <DropdownMenu>
                              <div className="fixed">
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
                  <Col>
                    <Col align="right">
                      <Button variant="contained" className="add-major-custom" onClick={() => { setMajorModalCreate(true); }}>Add MajorField</Button>
                    </Col>
                  </Col>
                </Row>
              </div>
              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="description" >Major Field</th>
                      <th className="description" >Major</th>
                      <th className="description">Description</th>
                      <th className="description">Status</th>
                      <th className="viewAll">Actions</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListMajorShowPage.map((e, index) => {
                      return (
                        <tr key={index}>

                          <TableCell>
                            <Grid container>
                              <Tooltip html={(
                                <div style={{ width: 700, height: 300 }}>
                                  <strong>
                                    <ModalHeader
                                      style={{ color: "yellow" }}
                                    >
                                      Detailed Major Information
                                    </ModalHeader>
                                    <ModalBody >
                                      <Row>
                                        <Col md={2}> Major Name:</Col>
                                        <Col md={3}> {e.Name}</Col>
                                      </Row>
                                      <Row>
                                        <Col md={2}>Description:</Col>
                                        <Col md={3}>
                                          {e.Description}
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col md={3} ><img className="text-left-topic-toolpi" src={e.ImageUrl} /></Col>
                                      </Row>

                                    </ModalBody>
                                  </strong>
                                </div>
                              )}
                              >
                                <Grid item lg={2}>
                                  <Avatar src={e.ImageUrl} className={classes.avatar}>
                                    <img src="string" />

                                  </Avatar>
                                </Grid>
                              </Tooltip>
                              <Grid item lg={10}>
                                <Typography className={classes.name}>{e.Name}</Typography>
                                <Typography color="textSecondary" variant="body2">{e.Id}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>

                          <TableCell>
                            <Typography color="black" fontSize="0.80rem" >{displayMajorName(e.MajorId)}
                              {/* <Typography color="black" fontSize="0.80rem" >{MajorNameByFieldID} */}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="black" fontSize="0.80rem">{e.Description}</Typography>
                            {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                          </TableCell>

                          <TableCell onClick={() => {
                            getMajorFieldsByID(e.Id);
                            setMajorModalApprove(true)
                          }}>
                            <Typography
                              className={classes.Status}
                              style={{
                                backgroundColor:
                                  ((e.Status === 1 && 'rgb(34 176 34)')
                                    ||
                                    (e.Status === 0 && 'red')
                                    ||
                                    (e.Status === 2 && 'red'))
                              }}
                            >{displayStateName(e.Status)} </Typography>
                          </TableCell>
                          <td className="td-actions">
                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-960683717">
                                  <br />
                                  <br />
                                  View Post..
                                </Tooltip>
                              }
                              placement="right"
                            >
                              <Button
                                onClick={() => {
                                  setModalStatus(true);
                                  setSelectMajor(e);
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
                                  <br />
                                  <br />
                                  Edit Post..
                                </Tooltip>
                              }
                              placement="right"
                            >
                              <Button
                                // onClick={() => handleUpdate(e.data)}
                                // onGridReady={onGridReady}

                                onClick={() => {
                                  // setMajorEdit(e.Id);
                                  getMajorFieldsByID(e.Id);
                                  setMajorModalEdit(true);
                                }}

                                className="btn-link btn-icon"
                                type="button"
                                variant="success"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>


                            {/* <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-436082023">
                                  <br />
                                  <br />
                                  APPROVE..
                                </Tooltip>
                              }
                              placement="right"
                            >

                              <Button
                                // onClick={() => handleUpdate(e.data)}
                                // onGridReady={onGridReady}

                                onClick={() => {
                                  // setMajorEdit(e.Id);
                                  setMajorModalApprove(true);
                                }}

                                className="btn-link btn-icon"
                                type="button"
                                variant="success"
                              >
                                {checkDisableImage(e.state) ? (
                                  <i className="fas fa-undo"></i>
                                ) : (
                                  <i className="fas fa-undo"></i>
                                )}
                              </Button>
                            </OverlayTrigger> */}


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
                                  setMajorFieldDelete(e.Id);
                                  setMajorModalFieldDelete(true);
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

      <Modal isOpen={modalMajorFieldDelete} toggle={toggleMajorDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleMajorDelete)}
          toggle={toggleMajorDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this major</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteMajorFieldsByID();
              setMajorModalFieldDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleMajorDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleApprove)}
          toggle={toggleApprove}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to Appprove this major</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByID();
              handleEditSubmit2();
              setMajorModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}
          <Button color="secondary" onClick={toggleApprove}>
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
          <ModalTitle>Do you want to edit major field ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>

            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Major name" value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Major</Form.Label>
              {/* <Form.Control disabled type="text" placeholder="Major" value={major}
                onChange={e => setMajor(e.target.value)}
              /> */}
              <FormGroup className="mb-2">
                <Dropdown
                  fluid
                  search
                  selection
                  // value={majorSelect}
                  value={majorSelect}
                  onChange={handleOnchangeSelectdmajor}
                  options={listSelectMajor} />
              </FormGroup>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            handleEditSubmit();
            setMajorModalEdit(false);
          }}
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Do you want to create major field ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>

            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Major name" value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Major</Form.Label>
              {/* <Form.Control disabled type="text" placeholder="Major" value={major}
                onChange={e => setMajor(e.target.value)}
              /> */}
              <FormGroup className="mb-2">
                <Dropdown
                  fluid
                  search
                  selection
                  // value={majorSelect}
                  value={majorSelect}
                  onChange={handleOnchangeSelectdmajor}
                  options={listSelectMajor} />
              </FormGroup>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" value={picture}

                onChange={e => setImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            handleCreateSubmit();
            setMajorModalCreate(false);
          }}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggleCreate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
          className="view-item-size"
        >
          <h3> INFORMATION </h3>
        </ModalHeader>
        <ModalBody className="Modal-body-view-all-major-field">
          <Row>
            <Col md={8} >
              <Row>
                <Col className="view-item-size-main" md={4}> Major:</Col>
                <Col className="view-item-size" md={7}>
                  {selectMajor !== undefined ? displayMajorName(selectMajor.MajorId) : ""}
                </Col>
              </Row>
              <Row>
                <Col className="view-item-size-main" md={4}>Field:</Col>
                <Col className="view-item-size" md={7}>
                  {selectMajor !== undefined ? selectMajor.Name : ""}
                </Col>
              </Row>


              <Row>
                <Col className="view-item-size-main" md={4}>State:</Col>
                <Col className="view-item-size" md={7}>{selectMajor !== undefined ? displayStateName(selectMajor.Status) : ""}</Col>
              </Row>
              <Row>
                <Col className="view-item-size-main" md={4}>Description:</Col>
                <Col className="view-item-size" md={7}>
                  {selectMajor !== undefined ? selectMajor.Description : ""}
                </Col>
              </Row>
            </Col>
            <Col className="view-item-size">
              {selectMajor !== undefined ? <img className="text-left-topic" src={selectMajor.ImageUrl} /> : ""}
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />

    </>
  );
}

export default MajorFields;
