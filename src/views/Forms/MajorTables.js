import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
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
import FilterState from "../MajorFields/FilterState"
import { del, getWithTokenParams, getWithToken, putWithToken, postWithToken } from "../../service/ReadAPI";
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
function MajorTables() {
  //delete modal  
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [searchName, setSearchName] = useState("");
  //modal create
  const [modalCreate, setMajorModalCreate] = useState(false);
  const toggleCreate = () => setMajorModalCreate(!modalCreate)
  //Edit Major
  const [modalEdit, setMajorModalEdit] = useState(false);
  const toggleEdit = () => setMajorModalEdit(!modalEdit)
  //Delete Major
  const [MajorDelete, setMajorDelete] = useState(null);
  const [modalMajorDelete, setMajorModalDelete] = useState(false);
  const toggleMajorDelete = () => setMajorModalDelete(!modalMajorDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectMajor, setSelectMajor] = useState();
  //Approved
  const [modalApprove, setMajorModalApprove] = useState(false);
  const toggleApprove = () => setMajorModalApprove(!modalApprove)
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
  const [isDeleted, setIsDeleted] = useState("");
  const [majorID, setMajorID] = useState("");
  //sort
  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  //filterState
  const listStates = [
    "Inactive",
    "Actice",
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
      backgroundColor: '#FFFFFF',
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
      textAlign: 'center',
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
    getMajorList(newListState);
  }
  // update
  async function handleEditSubmit2(e) {
    await putWithToken(
      `/api/v1.0/majors`,
      {
        id: majorID,
        name: name,
        description: description,
        imageUrl: picture,
        status: 0,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/major";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleCreate(e) {
    await postWithToken(
      `/api/v1.0/majors`,
      {
        id: null,
        name: name,
        description: description,
        imageUrl: picture,
        status: 0,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/major";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleEditSubmit(e) {
    await putWithToken(
      `/api/v1.0/majors`,
      {
        id: majorID,
        name: name,
        description: description,
        imageUrl: picture,
        status: 0,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/major";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    var blob = event.target.files[0].slice(0, event.target.files[0].size, 'image/png');
    const newFile = new File([blob], this.dat.imageName, { type: 'image/png' })
  }
  // get major by ID
  function getMajorByID(Id) {
    getWithToken(`/api/v1.0/majors/${Id}`, localStorage.getItem("token")).then((res) => {
      setMajorID(Id);
      setName(res.data.name);
      setDescription(res.data.description);
      setImage(res.data.imageUrl);
      setStatus(res.data.status);
    }).catch((err) => {
      console.log(err);
    });
  }

  //delete fc
  function deleteMajorByID() {
    del(`/api/v1.0/majors/${MajorDelete}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/major";

        }
      }).catch((err) => {
        console.log(err);
      });
  }
  //Load major
  useEffect(() => {
    getMajorList();
  }, []);
  function getMajorList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {
      getWithTokenParams(`/api/v1.0/majors`, params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setMajorList(temp);
        setUseListMajorShow(temp);
        setUseListMajorShowPage(temp.slice(numberPage * 7 - 7, numberPage * 7));
        setTotalNumberPage(Math.ceil(temp.length / 7));
        setCount(count);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListMajorShowPage(useListMajorShow.slice(number * 7 - 7, number * 7));
    setTotalNumberPage(Math.ceil(useListMajorShow.length / 7));
  }
  // close button
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
        `/api/v1.0/majors?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setMajorList(temp);
        sort(sortedField, ascending, temp);
        setNumberPage(1);
        setUseListMajorShow(temp);
        setUseListMajorShowPage(temp.slice(0, 7));
        setTotalNumberPage(Math.ceil(temp.length / 7));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/majors", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setMajorList(temp2);
            setUseListMajorShow(temp2);
            setUseListMajorShowPage(temp2.slice(numberPage * 7 - 7, numberPage * 7));
            setTotalNumberPage(Math.ceil(temp2.length / 7));
          }
        })
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

  function cancelRepairmanByID() {
    setName("");
    setDescription("");
    setImage("");
    setMajorID("");
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
                            <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>                        <DropdownMenu>
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
                        <Input onChange={e => setSearchName(e.target.value)} placeholder="Search name..." ></Input>
                        <Button className="dropdown-filter-css" >
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </Button>
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col align="right">
                    <Button className="add-major-custom" variant="contained" color="primary" onClick={() => { setMajorModalCreate(true); }}>Add Major</Button>
                  </Col>
                </Row>
              </div>
              <Card.Body className="table">
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
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
                          Name{" "}
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
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
                                      <ModalBody>
                                        <Row>
                                          <Col md={2}> Major Name:</Col>
                                          <Col md={3}>  {e.Name}</Col>
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
                                    <Avatar src={e.ImageUrl} className={classes.avatar} >
                                      <img src="none" />
                                    </Avatar>
                                  </Grid>
                                </Tooltip>

                                <Grid item lg={10}>
                                  <Typography className={classes.name}>{e.Name}</Typography>
                                  <Typography color="textSecondary" variant="body2">{e.Id}</Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell>
                              <Typography color="black" fontSize="0.80rem">{e.Description}</Typography>
                              {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                            </TableCell>
                            <TableCell onClick={() => {
                              // setMajorEdit(e.Id);
                              getMajorByID(e.Id);
                              setMajorModalApprove(true)
                            }}>
                              <Typography
                                className={classes.Status}
                                style={{
                                  backgroundColor:
                                    ((e.Status === 1 && 'RED') ||
                                      (e.Status === 0 && 'rgb(34 176 34)'))
                                }}
                              >{displayStateName(e.Status)}</Typography>
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
                                  onClick={() => {
                                    getMajorByID(e.Id);
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
                                    setMajorDelete(e.Id);
                                    setMajorModalDelete(true);
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
                    </TableBody>
                  </Table>
                </TableContainer>
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

      <Modal isOpen={modalMajorDelete} toggle={toggleMajorDelete}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to delete this major?</h4></ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around'}}>

        <Button className="Cancel-button" onClick={toggleMajorDelete}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              deleteMajorByID();
              setMajorModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
        
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggleEdit} centered size ="lg">
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          <ModalTitle>Do you want to create new major ?</ModalTitle>
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
              <Form.Label>Major name</Form.Label>
              <Form.Control type="text" placeholder="Major name" value={name}
                onChange={e => setName(e.target.value)}
              />
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
              </Grid>

              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onFileChange={picture}
                    onChange={uploadImage}
                  />
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

        <Button className="Cancel-button" onClick={()=> {cancelRepairmanByID()}}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              handleEditSubmit();
              setMajorModalEdit(false);
            }}
          >
            Update
          </Button>
        
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered size ="lg">
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          <ModalTitle>Do you want to create new major ?</ModalTitle>
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
                <Form.Label>Major name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Major name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  <Form.Control
                    type="file"
                    onFileChange={picture}
                    onChange={uploadImage}
                  />
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
              handleCreate();
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
        <a className="name" style={{color:"#1d98e0f7"}}>Name:</a> <a className="name"> {selectMajor !== undefined ? selectMajor.Name : ""}</a>
          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Description:</a>  <a className="name">{selectMajor !== undefined ? selectMajor.Description : ""}</a>

          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Status</a><a className="name"> {selectMajor !== undefined ? displayStateName(selectMajor.Status) : ""}</a>
          <br />
        </ModalBody>

      </Modal>

      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to approve this major? </h4></ModalBody>
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
    </>
  );
}

export default MajorTables;
