import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  Dropdown,
  InputGroupButtonDropdown,
  PaginationItem,
  Input,
  PaginationLink,
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
import { del, put, get, getWithParams } from "../../service/ReadAPI";

import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from '@material-ui/core'
import FormDialog from './DialogFields';
import FilterState from "./FilterState";

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

  //Edit Major
  const [MajorEdit, setMajorEdit] = useState(null);
  const [modalEdit, setMajorModalEdit] = useState(false);
  const toggleEdit = () => setMajorModalEdit(!modalEdit)
  //Delete Major
  const [MajorDelete, setMajorFieldDelete] = useState(null);
  const [modalMajorFieldDelete, setMajorModalFieldDelete] = useState(false);
  const toggleMajorDelete = () => setMajorModalFieldDelete(!modalMajorFieldDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectMajor, setSelectMajor] = useState();

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
  const [stateListFilter, setstateListFilter] = useState([]);


  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  //Major List
  const [useListMajorShow, setUseListMajorShow] = useState([]);
  const [useListMajorShowPage, setUseListMajorShowPage] = useState([]);
  const [MajorList, setMajorList] = useState([]);
  const [MajorListID, setMajorListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [majorID, setMajorfieldID] = useState("");
  const [major, setMajor] = useState("");


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
  const url = "https://ec2-3-1-222-201.ap-southeast-1.compute.amazonaws.com/api/v1.0/major-field"
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
  async function handleEditSubmit(e) {
    await put(
      `/api/v1.0/major-field`,
      {
        id: majorID,
        name: name,
        description: description,
        majorId: major,
        imageUrl: picture,
        status: 1,
      },
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
  // function getMajorFieldsList() {
  //   get("/api/v1.0/major").then((res) => {
  //     var temp = res.data;
  //     // setName(temp.name);
  //     // setDescription(temp.description);
  //     // setImage(temp.picture);
  //     // setIsDeleted(temp.is_Delete);
  //     setMajorList(temp);
  //     setUseListMajorShow(temp);
  //     setUseListMajorShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
  //     setTotalNumberPage(Math.ceil(temp.length / 5));
  //     setCount(count);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

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
        method: "post", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
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
    };
    return nameMajor[type] ? nameMajor[type] : "";
  }



  // Load major by ID
  // useEffect(() => {
  //   getMajorByID();
  //   get(`/Major/get-by-id?id=${MajorEdit}`).then((res)=>{
  //     setName(res.data.name);
  //     setDescription(res.data.description);
  //     setImage(res.data.picture);
  //     setIsDeleted(res.data.is_Delete);
  //   });
  // }, []);
  function getMajorFieldsByID(Id) {
    get(`/api/v1.0/major-field/${Id}`).then((res) => {
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
    del(`/api/v1.0/major-field/${MajorDelete}`
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
      params["status"] = stateList.reduce((f, s) => `${f},${s}`);
    getWithParams(`/api/v1.0/major-field`, params).then((res) => {
      var temp = res.data.filter((x) => x.state !== "Completed");
      var temp = res.data;
      // setName(temp.name);
      // setDescription(temp.description);
      // setImage(temp.picture);
      // setIsDeleted(temp.is_Delete);
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
      1: "Approved",
      0: "New",
      2: "Blocked",
      3: "Deleted"
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table">
              <Card.Header>
                <Card.Title as="h4">Major Field</Card.Title>
                {/* <Button
                  onClick={() => {
                    // setMajorEdit(e.Id);
                    // getMajorFieldsListID();
                    // handleSubmit(e);
                    setMajorModalCreate(true);
                  }}>
                  Create new Major
                </Button> */}
                <Grid align="right">
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>Add MajorField</Button>
                </Grid>
              </Card.Header>
              <Col md={2}>
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
                        <Row className="fixed align-self-center">
                          <FilterState
                            list={filterState}
                            onChangeCheckBox={(e, id) => {
                              handleChooseState(e, id);
                            }}
                            key={filterState}
                          />
                        </Row>
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
                  </InputGroup>
                </Row>
              </Col>
              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="text-left-topic">Topic</th>
                      <th className="th-name-major" >Major</th>
                      <th className="th-name-major" >Name</th>
                      <th className="description">Description</th>
                      <th>Status</th>
                      <th className="text-center">Views</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListMajorShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img className="td-img-size" src={e.ImageUrl} />
                          </td>
                          <td>
                            {displayMajorName(e.MajorId)}
                          </td>
                          <td>
                            {e.Name}
                          </td>
                          <td>
                            {e.Description}
                          </td>
                          <td>
                            {displayStateName(e.Status)}
                          </td>
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

      {/* <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Do you want to create new Major</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => {
            handleSubmit(e);
            setMajorModalCreate(false);
          }}
          >
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                name="Name"
                id="Major_Name"
                // onChange={Major_Name}
                placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button color="danger"
            >
              Create
            </Button>
            <Button color="secondary" onClick={toggleCreate}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal> */}

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
              <Form.Control type="text" placeholder="Major" value={major}
                onChange={e => setMajor(e.target.value)}
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
      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
        >
          Detailed Field Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col></Col>
            <Col md={3}> Major</Col>
            <Col md={8}>
              {selectMajor !== undefined ? displayMajorName(selectMajor.MajorId) : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}> Name</Col>
            <Col md={8}>
              {selectMajor !== undefined ? selectMajor.Name : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Description</Col>
            <Col md={8}>
              {selectMajor !== undefined ? selectMajor.Description : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Picture</Col>
            <Col md={8}>
              {selectMajor !== undefined ? <img className="text-left-topic" src={selectMajor.ImageUrl} /> : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>{selectMajor !== undefined ? displayStateName(selectMajor.Status) : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>

      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />

    </>
  );
}

export default MajorFields;
