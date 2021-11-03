import React, { useState, useEffect } from "react";
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
  InputGroupButtonDropdown,
  PaginationItem,
  Input,
  PaginationLink,
  FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
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
  TableCell,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import FilterState from "./FilterState";
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
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
  //sort

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  //Filter
  const listStates = [
    "Active",
    "Inactive",
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
   color: '#1d98e0f7'
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
  //upload image
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
  function onFileChange(event) {
    //console.log(event.target.files[0].name)
    var blob = event.target.files[0].slice(0, event.target.files[0].size, 'image/png');

    const newFile = new File([blob], this.dat.imageName, { type: 'image/png' })
    //console.log(newFile)
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
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
        status: 0,
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
        status: 0,
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
      "67381e19-f761-4a4f-9520-3225290f6470": "Két sắt",
    };
    return nameMajor[type] ? nameMajor[type] : "";
  }
  function handleOnchangeSelectdmajor(e, value) {
    //console.log(e.target,value);
    setMajorSelect(e.target.MajorID);
    setMajorSelectID(value.value);
  }
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
      currentField['text'] = `${res.data.Name}`;
      currentField['value'] = res.data.Id;
      currentField['key'] = res.data.Id;
      setMajorID(MajorID);
      // setMajorName(MajorNameByFieldID);

    }).then(() => {
    });

    params['Status'] = [0].reduce((f, s) => `${f},${s}`);
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
  //delete fc is updating error 
  //BE is fixing 
  function deleteMajorFieldsByID() {
    del(`/api/v1.0/major-fields/${MajorDelete}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/fields";
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
    if (sortedField !== null) {

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
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListMajorShowPage(useListMajorShow.slice(number * 6 - 6, number * 6));
    setTotalNumberPage(Math.ceil(useListMajorShow.length / 6));
  }

  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" , backgroundColor:"white"}}
      onClick={x}
    >
      X
    </button>
  );
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      1: "Inactive",
      0: "Active",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/major-fields?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setMajorList(temp);
        sort(sortedField, ascending, temp);

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

  function cancelRepairmanByID() {
    setName("");
    setDescription("");
    setMajorfieldID("");
    setImage("");
    setMajor("");
    toggleEdit();
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
                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Id" && ascending) {
                            setSortedField("Id");
                            setAscending(false);
                            sort("Id", false, useListMajorShowPage);
                          } else {
                            setSortedField("Id");
                            setAscending(true);
                            sort("Id", true, useListMajorShowPage);
                          }
                        }}
                      >
                        Major Field{" "}
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
                          if (sortedField === "MajorId" && ascending) {
                            setSortedField("MajorId");
                            setAscending(false);
                            sort("MajorId", false, useListMajorShowPage);
                          } else {
                            setSortedField("MajorId");
                            setAscending(true);
                            sort("MajorId", true, useListMajorShowPage);
                          }
                        }}
                      >
                        Major{" "}
                        {sortedField === "MajorId" ? (
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
                            sort("Description", false, useListMajorShowPage);
                          } else {
                            setSortedField("Description");
                            setAscending(true);
                            sort("Description", true, useListMajorShowPage);
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
                                  ((e.Status === 0 && 'rgb(34 176 34)')
                                    ||
                                    (e.Status === 1 && 'red')
                                    ||
                                    (e.Status === 2 && 'red'))
                              }}
                            >{displayStateName(e.Status)} </Typography>
                          </TableCell>
                          <td className="td-actions" >
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
            style={{ color: "#1bd1ff" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to delete this major field? </h4></ModalBody>
         <ModalFooter style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={toggleMajorDelete}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              deleteMajorFieldsByID();
              setMajorModalFieldDelete(false);
            }}
          >
            Delete
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
            style={{ color: "#1bd1ff" }}
          close={closeBtn(toggleApprove)}
          toggle={toggleApprove}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to appprove this major field?</h4></ModalBody>
         <ModalFooter style={{ justifyContent: 'space-around'}}>
         <Button className="Cancel-button" onClick={toggleApprove}>
            Cancel
          </Button>
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
         
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggleEdit} centered size="lg">
        <ModalHeader
            style={{ color: "#1bd1ff" }}
        >
          <ModalTitle><h3>Do you want to edit major field ?</h3></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Major name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Major</Form.Label>
                  <FormGroup className="mb-2">
                    <Dropdown
                      fluid
                      search
                      selection
                      // value={majorSelect}
                      value={majorSelect}
                      onChange={handleOnchangeSelectdmajor}
                      options={listSelectMajor}
                    />
                  </FormGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </Form.Group>
              </Grid>

              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="file" onChange={uploadImage} />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={picture} style={{ width: "300px" }} />
                  )}
                </Form.Group>
              </Grid>
            </Grid>
          </Form>
        </ModalBody>

         <ModalFooter style={{ justifyContent: 'space-around'}}>
         <Button className="Cancel-button" onClick={() => { cancelRepairmanByID() }}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              // handleServiceDetele();
              handleEditSubmit();
              setMajorModalEdit(false);
            }}
          >
            Edit
          </Button>

        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered size="lg">
        <ModalHeader
            style={{ color: "#1bd1ff" }}
        >
          <ModalTitle><h3>Do you want to create major field ?</h3></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* <Form.Group className="mb-2"> */}
              <Grid item xs={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Major name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Major</Form.Label>
                  <FormGroup className="mb-2">
                    <Dropdown
                      fluid
                      search
                      selection
                      // value={majorSelect}
                      value={majorSelect}
                      onChange={handleOnchangeSelectdmajor}
                      options={listSelectMajor}
                    />
                  </FormGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </Form.Group>
              </Grid>

              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="file" onChange={uploadImage} />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={picture} style={{ width: "300px" }} />
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
              handleCreateSubmit();
              setMajorModalCreate(false);
            }}
          >
            Save
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
            {selectMajor !== undefined ? <img className="text-left-topic" src={selectMajor.ImageUrl} /> : ""}
          </div>
        </ModalBody>
        <ModalBody>
          <b>Major:</b> <a className="name">{selectMajor !== undefined ? displayMajorName(selectMajor.MajorId) : ""}
          </a>
          <br />
          <b>Field:</b>  <a className="name">  {selectMajor !== undefined ? selectMajor.Name : ""}</a>
          <br />
          <b>Description:</b>  <a className="name">    {selectMajor !== undefined ? selectMajor.Description : ""}
          </a>
          <br />
          <b>Status</b><a className="name"> {selectMajor !== undefined ? displayStateName(selectMajor.Status) : ""}
          </a>
          <br />
        </ModalBody>
      </Modal>
    </>
  );
}
export default MajorFields;
