import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
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
  Media,

} from "reactstrap";
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { del, post, get, put, getWithToken, putWithToken, getWithTokenParams, postWithToken } from "../../service/ReadAPI";
import "../../assets/css/customSize.css";

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

import FilterState from "../MajorFields/FilterState";
import { makeStyles } from '@material-ui/core/styles';

export default function ManageCompany() {
  //Filter
  const listStates = [
    "New",
    "Approved",
    "Blocked",
    "Deleted",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [stateListFilter, setstateListFilter] = useState([]);
  const [useList, setUseList] = useState([]);

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
      color: theme.palette.secondary.dark,

    },
    Status: {
      fontWeight: '700',
      width: '71px',
      fontSize: '0.76rem',
      color: 'white',
      backgroundColor: 'red',
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
    getCompanyList(newListState);
  }


  const [CompanyDelete, setCompanyDelete] = useState(null);
  const [modalDelete, setCompanyModalDelete] = useState(false);
  const toggleDelete = () => setCompanyModalDelete(!modalDelete);
  //edit
  // const [CompanyEdit, setCompanyEdit] = useState(null);
  const [modalEdit, setCompanyModalEdit] = useState(false);
  const toggleEdit = () => setCompanyModalEdit(!modalEdit)

  const [modalCreate, setCompanyModalCreate] = useState(false);
  const toggleCreate = () => setCompanyModalCreate(!modalCreate)

  //Approved Company 
  //Approved
  const [modalApprove, setCompanyModalApprove] = useState(false);
  const toggleApprove = () => setCompanyModalApprove(!modalApprove)


  const [useListCompanyShow, setUseListCompanyShow] = useState([]);
  const [useListCompanyShowPage, setUseListCompanyShowPage] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [hotline, setHotline] = useState("");



  useEffect(() => {
    getCompanyList();
    getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          setCompanyList(res.data);
          // res.data;
          console.log(res.data);
        }
      });
  }, []);

  function getCompanyList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    getWithTokenParams("/api/v1.0/companies", params, localStorage.getItem("token")).then((res) => {
      var temp = res.data.filter((x) => x.state !== "Completed");
      setCompanyList(temp);
      setUseListCompanyShow(temp);
      setUseListCompanyShowPage(temp.slice(numberPage * 8 - 8, numberPage * 8));
      setTotalNumberPage(Math.ceil(temp.length / 8));
    }).catch((err) => {
      console.log(err);
    });
  }

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCompanyShowPage(useListCompanyShow.slice(number * 8 - 8, number * 8));
    setTotalNumberPage(Math.ceil(useListCompanyShow.length / 8));
  }
  // custom state
  function displayStateName(type) {
    const stateValue = {
      3: "Deleted",
      0: "New",
      1: "Approved",

    };
    return stateValue[type] ? stateValue[type] : "";
  }
  console.log("cpName", name)
  function handleEditSubmit2(e) {
    putWithToken(
      `/api/v1.0/companies?companyId=${CompanyDelete}`,
      {
        id: null,
        companyName: name,
        address: address,
        description: description,
        email: email,
        hotline: hotline,
        imageUrl: picture,
        status: 1,
      },
      localStorage.getItem("token")

    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/Company";
          alert("Approved Successfully")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
  function handleCompanyDetele() {
    // console.log("abc" , CompanyDelete);
    del(`/api/v1.0/companies/${CompanyDelete}`, localStorage.getItem("token")
    ).then((res) => {
      if (res.status === 200) {
        window.location = "/admin/Company";
        alert("Deleted Successfully")

      }
    })
      .catch((err) => {
        // setErrorMessage(err.response.data.message);
        // setModalConfirm(true);
        console.log(err)
      });
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
  function onSubmitSearch(e) {
    e.preventDefault();
  
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/companies?Name=` + searchName,
        
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setCompanyList(temp);
        setNumberPage(1);
      setUseListCompanyShow(temp);
      setUseListCompanyShowPage(temp.slice(0, 8));
      setTotalNumberPage(Math.ceil(temp.length / 8));
      });
    } else if(searchName == "") {
      getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setCompanyList(temp2);
      setUseListCompanyShow(temp2);
      setUseListCompanyShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
      setTotalNumberPage(Math.ceil(temp2.length / 8));
    }})}
  }

  return (
    <>
      <Container fluid>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <div className="header-form">
              <Row>

                <div className="header-body-filter">
                  <Col md={7}>
                    <Row className="fixed">
                      <InputGroup>
                        {/* <Input placeholder="State" disabled    /> */}
                        <InputGroupButtonDropdown
                          addonType="append"
                          isOpen={dropdownOpen}
                          toggle={toggleDropDown}
                        >
                          <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>
                          <DropdownMenu>
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
                <Col>
                  <Col align="right">
                    <Button
                      onClick={() => {
                        setCompanyModalCreate(true);
                      }}>
                      Create new Company
                    </Button>
                  </Col>
                </Col>
              </Row>
            </div>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table">
                <thead>
                  <tr>
                    {/* <th className="description">ID</th> */}
                    <th className="description">Name</th>
                    <th className="description">Address</th>
                    <th className="description">Description</th>
                    <th className="description">Email</th>
                    <th className="description">Hotline</th>
                    {/* <th className="description">Picture</th> */}
                    <th className="description">State</th>
                    <th className="description">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {useListCompanyShowPage.map((e, index) => {
                    return (
                      <tr className="" key={index}>
                        {/* <td>
                            {e.Id}
                          </td> */}
                        <td className="nameSize">
                          {e.CompanyName}
                        </td>
                        <td>
                          {e.Address}
                        </td>
                        <td className="descriptionSize">
                          {e.Description}
                        </td>
                        <td className="emailSize">
                          {e.Email}
                        </td>
                        <td>
                          {e.Hotline}
                        </td>

                        <td>

                          <TableCell onClick={() => {
                            setCompanyDelete(e.Id);
                            setCompanyModalApprove(true)
                          }}>
                            <Typography
                              className={classes.Status}
                              style={{
                                backgroundColor:
                                  ((e.Status === 1 && 'green') ||
                                    (e.Status === 0 && '#119fb3') ||
                                    (e.Status === 3 && 'red')
                                  )
                              }}
                            >{displayStateName(e.Status)}</Typography>
                          </TableCell>

                        </td>
                        <td>

                          <OverlayTrigger
                            onClick={(e) => e.preventDefault()}

                            overlay={
                              <Tooltip id="tooltip-334669391">
                                Approved Company..
                              </Tooltip>
                            }
                            placement="right\"
                          >
                            <Button
                              onClick={() => {
                                setCompanyDelete(e.Id);
                                setCompanyModalApprove(true);
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
                              <Tooltip id="tooltip-334669391">
                                Delete Company..
                              </Tooltip>
                            }
                            placement="right\"
                          >
                            <Button
                              onClick={() => {
                                setCompanyDelete(e.Id);
                                setCompanyModalDelete(true);
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

      </Container>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Do you want to create new company</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
          >
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text"
                type="text"
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}

              // defaultValue={address}
              // onChange={address}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}

              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}

              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>HotLine</Form.Label>
              <Form.Control type="text" placeholder="phone"
                value={hotline}
                onChange={e => setHotline(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}

              />
            </Form.Group> */}
            {/* <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={statusCP} name="Status"/>
            </Form.Group> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) =>  // handleCompanyDetele();
            handleSubmit()
            // setCompanyModalEdit(false);
          }
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggleCreate}>
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
          <ModalTitle>Do you want to edit Company</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text"
                type="text"
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}

              // defaultValue={address}
              // onChange={address}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}

              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}

              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>HotLine</Form.Label>
              <Form.Control type="text" placeholder="phone"
                value={hotline}
                onChange={e => setHotline(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}

              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={statusCP} name="Status"/>
            </Form.Group> */}



          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) =>  // handleCompanyDetele();
            handleEditSubmit(e)
            // setCompanyModalEdit(false);
          }
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
        <ModalBody>Do you want to delete this company</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleCompanyDetele();
              setCompanyModalDelete(false);
              setCompanyModalSuccess(true);

            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
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
        <ModalBody>Do you want to appprove this Company</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByID();
              handleEditSubmit2();
              setCompanyModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}
          <Button color="secondary" onClick={toggleApprove}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

