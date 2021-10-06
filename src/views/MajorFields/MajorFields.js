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
import { del, post, get } from "../../service/ReadAPI";


export default function ManageCompany() {
  const [CompanyDelete, setCompanyDelete] = useState(null);
  const [modalDelete, setCompanyModalDelete] = useState(false);
  const toggleDelete = () => setCompanyModalDelete(!modalDelete);
  //edit
  const [CompanyEdit, setCompanyEdit] = useState(null);
  const [modalEdit, setCompanyModalEdit] = useState(false);
  const toggleEdit = () => setCompanyModalEdit(!modalEdit)

  const [modalCreate, setCompanyModalCreate] = useState(false);
  const toggleCreate = () => setCompanyModalCreate(!modalCreate)

  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [company_Name, setcompany_Name] = useState("");
  const [address, setaddress] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();


  const [useListCompanyShow, setUseListCompanyShow] = useState([]);
  const [useListCompanyShowPage, setUseListCompanyShowPage] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [companyListID, setCompanyListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  useEffect(() => {
    getCompanyList();
    get("/api/v1.0/company/get-all").then(
      (res) => {
        if (res && res.status === 200) {
          setCompanyList(res.data);
          // res.data;
          console.log(res.data);
        }
      });
  }, []);
  function getCompanyList() {
    get("/api/v1.0/company/get-all").then((res) => {
      var temp = res.data;
      setCompanyList(temp);
      setUseListCompanyShow(temp);
      setUseListCompanyShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
      setTotalNumberPage(Math.ceil(temp.length / 5));
    }).catch((err) => {
      console.log(err);
    });
  }

  function getCompanyListID() {
    get("/api/v1.0/company/get-by-id" + CompanyEdit).then((res) => {
      var temp = res.data;
      setCompanyListID(temp);
    }).catch((err) => {
      console.log(err);
    });
  }


  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCompanyShowPage(useListCompanyShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListCompanyShow.length / 5));
  }
  // create form 
  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/api/v1.0/company/create",
      {
        company_Name: e.target.company_Name.value,
        address: e.target.address.value,
        description: e.target.description.value,
        email: e.target.email.value,
        hotline: e.target.hotline.value,
        is_Online: 1,
        is_Delete: 0,
        picture: e.target.picture.value,
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
  // custom state
  function displayStateName(type) {
    const stateValue = {
      1: "Active",
      0: "Not Alaviable",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  function handleCompanyDetele() {
    // console.log("abc" , CompanyDelete);
    post("/Company/" + CompanyDelete,
      {
        is_Online: 0,
        is_Delete: 1,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          // window.location = "/admin/Company";
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
        <Row>
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
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">Hotline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListCompanyShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {e.Id}
                          </td>
                          <td>
                            {e.Company_Name}
                          </td>
                          <td>
                            {e.Picture}
                          </td>
                          <td>
                            {e.Address}
                          </td>
                          <td>
                            {e.Description}
                          </td>
                          <td>
                            {e.Hotline}
                          </td>
                          <td>
                            {displayStateName(e.Is_Online)}
                          </td>
                          <td>
                            <Media
                              src={editIcon}
                              onClick={() => {
                                setCompanyEdit(e.Id);
                                getCompanyListID();
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
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Hot Service </Card.Title>
                <p className="card-category">
                  This is a text
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Service Name</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
          <Form onSubmit={(e) => {
            handleSubmit(e);
            setCompanyModalCreate(false);
          }}
          >
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                name="company_Name"
                id="company_Name"
                // onChange={company_Name}
                placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text"
                type="text"
                name="address"
                // onChange={address}
                placeholder="Address" />
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
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text"
                name="email"
                id="joineddate"
                placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>HOTLINE</Form.Label>
              <Form.Control type="text" placeholder="HOTLINE" />
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
        <ModalFooter>

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
                name="company_Name"
                id="company_Name"
                placeholder="Name"
                onChange={company_Name}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text"
                type="text"
                name="Country"
                id="Country"
                placeholder="Country"
                onChange={address}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Price" step="10000" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                id="lastname"
                onChange={address}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleCompanyDetele();

            setCompanyModalEdit(false);
          }}
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

