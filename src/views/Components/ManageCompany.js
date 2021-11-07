import React, { useState, useEffect, useRef  } from "react";
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
import { IconName ,TiStar ,TiLockClosed } from "react-icons/ti";

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

import { del, post, get, put, getWithToken, putWithToken, getWithTokenParams, postWithToken } from "../../service/ReadAPI";
import "../../assets/css/customSize.css";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    "Active",
    "Inactive",
    
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

    name: {
      fontWeight: 'bold',
      color: '#292a2c',
      fontWeight: '700',
      width:'200px'

    },
    Status: {
      fontWeight: '700',
      width: '71px',
      fontSize: '0.76rem',
      color: 'white',
      textAlign: 'center',
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
  const [Status, setStatus] = useState(0);
  const [Price2, setPrice2] = useState(0);

  //sort

  const [sortedField, setSortedField] = useState("id");
  const [ascending, setAscending] = useState(true);
  // const totalPrice = useRef(0);
  useEffect(() => {
    getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          setCompanyList(res.data);
          setPrice2(res.data);
        }
      });
      getCompanyList();

  }, []);
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
  function getCompanyList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {

      getWithTokenParams("/api/v1.0/companies", params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setCompanyList(temp);
        setUseListCompanyShow(temp);
        setUseListCompanyShowPage(temp.slice(numberPage * 8 - 8, numberPage * 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));
        var totalPrice =0;
        temp.map((e, index) =>{
          totalPrice  +=  temp[index].totalMoney;
        })
        localStorage.setItem("revenus", totalPrice);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  //aprove company
  function handleSubmit(){
    postWithToken(
      `/api/v1.0/companies`,
      {
        id: null,
        companyName: name,
        address: address,
        description: description,
        email: email,
        hotline: hotline,
        imageUrl: "none",
        status: 0,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Create company successfully!!")
          setTimeout(
            function(){
              window.location = "/admin/Company";
            } , 1500);     
        }
      })
      .catch((err) => {
        console.log(err)
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
      0: "Active",
      1: "Inactive",

    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function handleEditSubmit2(e) {
    putWithToken(
      `/api/v1.0/companies?companyid=${CompanyDelete}`,
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
          toast.success("Approved company successfully!!")
          setTimeout(
            function(){
              window.location = "/admin/Company";
            } , 1500);   
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
 //delete company
  function handleCompanyDetele() {
    del(`/api/v1.0/companies/${CompanyDelete}`, localStorage.getItem("token")
    ).then((res) => {
      if (res.status === 200) {
        toast.success("Delete company successfully!!")
        setTimeout(
          function(){
            window.location = "/admin/Company";
          } , 1500);   
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
      style={{ color: "#B22222", backgroundColor: "white" }}
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
        sort(sortedField, ascending, temp);
        setUseListCompanyShow(temp);
        setUseListCompanyShowPage(temp.slice(0, 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setCompanyList(temp2);
            setUseListCompanyShow(temp2);
            setUseListCompanyShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
            setTotalNumberPage(Math.ceil(temp2.length / 8));
          }
        })
    }
  }

  return (
    <>
    <ToastContainer/>
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
                          {/* <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle> */}
                          <DropdownMenu>
                            {/* <div className="fixed">
                              <FilterState
                                list={filterState}
                                onChangeCheckBox={(e, id) => {
                                  handleChooseState(e, id);
                                }}
                                key={filterState}
                              />
                            </div> */}
                          </DropdownMenu>
                        </InputGroupButtonDropdown>
                      </InputGroup>
                    </Row>
                  </Col>

                </div>
                {/* <Col md={2}>
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
                </Col> */}
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
                    <th
                      className="description"
                      onClick={() => {
                        if (sortedField === "companyName" && ascending) {
                          setSortedField("companyName");
                          setAscending(false);
                          sort("companyName", false, useListCompanyShowPage);
                        } else {
                          setSortedField("companyName");
                          setAscending(true);
                          sort("companyName", true, useListCompanyShowPage);
                        }
                      }}
                    >
                      Name{" "}
                      {sortedField === "CompanyName" ? (
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
                        if (sortedField === "address" && ascending) {
                          setSortedField("address");
                          setAscending(false);
                          sort("address", false, useListCompanyShowPage);
                        } else {
                          setSortedField("address");
                          setAscending(true);
                          sort("address", true, useListCompanyShowPage);
                        }
                      }}
                    >
                      Address{" "}
                      {sortedField === "address" ? (
                        ascending === true ? (
                          <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </th>
                 
                    <th className="description">Human resources</th>
                    <th
                      className="description"
                      onClick={() => {
                        if (sortedField === "email" && ascending) {
                          setSortedField("email");
                          setAscending(false);
                          sort("email", false, useListCompanyShowPage);
                        } else {
                          setSortedField("email");
                          setAscending(true);
                          sort("email", true, useListCompanyShowPage);
                        }
                      }}
                    >
                      Email{" "}
                      {sortedField === "Email" ? (
                        ascending === true ? (
                          <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </th>
                    <th className="description">Revenue (Vnd)</th>
                    <th className="description">Hotline</th>
                    <th
                      className="description"
                      onClick={() => {
                        if (sortedField === "status" && ascending) {
                          setSortedField("status");
                          setAscending(false);
                          sort("status", false, useListCompanyShowPage);
                        } else {
                          setSortedField("status");
                          setAscending(true);
                          sort("status", true, useListCompanyShowPage);
                        }
                      }}
                    >
                      Status{" "}
                      {sortedField === "status" ? (
                        ascending === true ? (
                          <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretDown} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </th>
                    <th className="description">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {useListCompanyShowPage.map((e, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>
                        <img src={e.ImageUrl}/>
                          </td> */}
                        <TableCell>
                          <Grid container>
                            <Grid item lg={10}>
                              <Typography className={classes.name}>{e.companyName}</Typography>
                              <Typography color="textSecondary" variant="body2">{e.id}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <td>
                          {e.address}
                        </td>
                   
                        <td className="descriptionSize">
                          {e.totalWorker} members
                        </td>
                        <td className="emailSize">
                          {e.email}
                        </td>
                        <td>
                        <NumberFormat className="input-type-css-order"
                          thousandsGroupStyle="thousand"
                          value={e.totalMoney} 
                          decimalSeparator="."
                          locale="vn"
                          thousandSeparator={true}
                          disabled />
                      </td>
                        
                        <td>
                          {e.hotline}
                        </td>
                        
                        <TableCell onClick={() => {
                          setCompanyDelete(e.id);
                          setCompanyModalApprove(true)
                        }}>
                          <Typography
                            className={classes.Status}
                            style={{
                              backgroundColor:
                                ((e.status === 1 && 'red') ||
                                  (e.status === 0 && 'green')
                                )
                            }}
                          >{displayStateName(e.status)}</Typography>
                        </TableCell>

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
                                setCompanyDelete(e.id);
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
                                setCompanyDelete(e.id);
                                setCompanyModalDelete(true);
                              }}

                              className="btn-link btn-icon"
                              type="button"
                              variant="danger"
                              style={{fontSize:'x-large'}}
                            >
                              <TiLockClosed/>
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
          style={{ color: "#1bd1ff" }}

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
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleCreate}>
            Cancel
          </Button>
          <Button onClick={(e) =>  // handleCompanyDetele();
            handleSubmit()
            // setCompanyModalEdit(false);
          }
          >
            Save
          </Button>

        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

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
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleEdit}>
            Cancel
          </Button>
          <Button onClick={(e) =>  // handleCompanyDetele();
            handleEditSubmit(e)
            // setCompanyModalEdit(false);
          }
          >
            Edit
          </Button>

        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to delete this company ?</h4></ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleDelete}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              handleCompanyDetele();
              setCompanyModalDelete(false);

            }}
          >
            Delete
          </Button>{" "}

        </ModalFooter>
      </Modal>
      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to appprove this company ?</h4></ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleApprove}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByid();
              handleEditSubmit2();
              setCompanyModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}

        </ModalFooter>
      </Modal>
    </>
  );
}

