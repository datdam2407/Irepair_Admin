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
} from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  Media,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { Link } from "react-router-dom";
import { del, post, get, put, getWithToken, putWithToken } from "../../service/ReadAPI";
import "../../assets/css/customSize.css";

export default function ManageCompany() {
  const [CompanyDelete, setCompanyDelete] = useState(null);
  const [modalDelete, setCompanyModalDelete] = useState(false);
  const toggleDelete = () => setCompanyModalDelete(!modalDelete);
  //edit
  // const [CompanyEdit, setCompanyEdit] = useState(null);
  const [modalEdit, setCompanyModalEdit] = useState(false);
  const toggleEdit = () => setCompanyModalEdit(!modalEdit)

  const [modalCreate, setCompanyModalCreate] = useState(false);
  const toggleCreate = () => setCompanyModalCreate(!modalCreate)

  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();

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
    getWithToken(`/api/v1.0/companies/${Id}`,localStorage.getItem("token")).then((res) => {
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
  useEffect(() => {
    getCompanyList();
    getWithToken("/api/v1.0/companies" ,localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          setCompanyList(res.data);
          // res.data;
          console.log(res.data);
        }
      });
  }, []);

  function getCompanyList() {
    getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then((res) => {
      var temp = res.data;
      setCompanyList(temp);
      setUseListCompanyShow(temp);
      setUseListCompanyShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
      setTotalNumberPage(Math.ceil(temp.length / 5));
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
    setUseListCompanyShowPage(useListCompanyShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListCompanyShow.length / 5));
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
  function handleSubmit(e) {
    post(
      "/api/v1.0/companies",
      {
        id : null,
        companyName: name,
        address: address,
        description: description,
        email: email,
        hotline: hotline,
        imageUrl: picture,
        status: 0,
      },
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
            <Card.Header>
              <Card.Title as="h4">Manage Company</Card.Title>
              {/* <Link to="/admin/create/company">
                </Link> */}
              <Button
                onClick={() => {
                  // setCompanyEdit(e.Id);
                  // getCompanyListID();
                  // handleSubmit(e);
                  setCompanyModalCreate(true);
                }}>
                Create new Company
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table">
                <thead>
                  <tr>
                    {/* <th className="border-0">ID</th> */}
                    <th className="border-0">Name</th>
                    <th className="border-0">Address</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Hotline</th>
                    <th className="border-0">Picture</th>
                    <th className="border-0">State</th>
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
                          {e.Picture}
                        </td>
                        <td>
                          {displayStateName(e.Status)}
                        </td>
                        <td>
                          <Media
                            src={editIcon}
                            onClick={() => {
                              // setCompanyEdit(e.Id);
                              getCompanyByID(e.Id);
                              setCompanyModalEdit(true);
                            }}
                          />
                        </td>
                        <td>
                          <Media
                            src={deleteIcon}
                            onClick={() => {
                              setCompanyDelete(e.Id);
                              setCompanyModalDelete(true);
                            }}
                          />
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
    </>
  );
}

