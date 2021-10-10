import React, { useState, useEffect } from "react";

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

import FilterState from "../MajorFields/FilterState";

export default function ManageCompany() {
  //Filter
  const listStates = [
    "New",
    "Approved",
    "Deleted",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);


  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

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

  //check image
  function checkDisableImage(state) {
    const list = [1 , 3];
    if (list.includes(state)) return true;
    else return false;
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
  const [CompanyApprove, setCompanyApprove] = useState(null);
  const [modalApprove, setCompanyModalApprove] = useState(false);
  const toggleApprove = () => setCompanyModalApprove(!modalApprove)

  const [useList, setUseList] = useState([]);

  const [useListCompanyShow, setUseListCompanyShow] = useState([]);
  const [useListCompanyShowPage, setUseListCompanyShowPage] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyListID, setCompanyListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [hotline, setHotline] = useState("");
  const [statusCP, setCPStatus] = useState("");
  const [isOnl, setIsOnline] = useState("");
  const [companyID, setCompanyID] = useState("");

  async function getCompanyByID(Id) {
    getWithToken(`/api/v1.0/companies/${Id}`, localStorage.getItem("token")).then((res) => {
      setCompanyID(Id);
      setName(res.data.companyName);
      setAddress(res.data.address);
      setDescription(res.data.description);
      setEmail(res.data.email);
      setHotline(res.data.hotline);
      setImage(res.data.imageUrl);
      setCPStatus(res.data.status);
      // setIsDeleted(res.data.is_Delete);
    }).catch((err) => {
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
      setUseListCompanyShowPage(temp.slice(numberPage * 15 - 15, numberPage * 15));
      setTotalNumberPage(Math.ceil(temp.length / 15));
    }).catch((err) => {
      console.log(err);
    });
  }
  // update form 
  async function handleEditSubmit(e) {
    await putWithToken(
      `/api/v1.0/companies`,
      {
        Id: companyID,
        CompanyName: name,
        Address: address,
        Description: description,
        Email: email,
        Status: 3,
        Hotline: hotline,
        ImageUrl: picture,
        Uid: 1,
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/company";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCompanyShowPage(useListCompanyShow.slice(number * 15 - 15, number * 15));
    setTotalNumberPage(Math.ceil(useListCompanyShow.length / 15));
  }
  // custom state
  function displayStateName(type) {
    const stateValue = {
      0: "New",
      1: "Approved",
      2: "Blocked",
      3: "Deleted",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  console.log("cpName" ,name)
  function handleEditSubmit2(e) {
    putWithToken(
      "/api/v1.0/companies",
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
                        <Input placeholder="State" disabled />
                        <InputGroupButtonDropdown
                          addonType="append"
                          isOpen={dropdownOpen}
                          toggle={toggleDropDown}
                          className="border border-gray"
                        >
                          <DropdownToggle caret>&nbsp;</DropdownToggle>
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
                <Col>
                  <Col align="right">
                    <Button
                      onClick={() => {
                        // setCompanyEdit(e.Id);
                        // getCompanyListID();
                        // handleSubmit(e);
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
                        {/* <td>
                          {e.Picture}
                        </td> */}
                        <td>
                          {displayStateName(e.Status)}
                        </td>
                        <td>
                        <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-436082023">
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
                                  getCompanyByID(e.Id);
                                  setCompanyModalApprove(true);
                                }}

                                className="btn-link btn-icon"
                                type="button"
                                variant="success"
                              >
                                {checkDisableImage(e.state) ? (
                                <i className="fas fa-check"></i>
                                ) : (
                                  <i className="fas fa-check"></i>
                                )}
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

