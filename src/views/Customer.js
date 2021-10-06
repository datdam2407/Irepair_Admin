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
import { del, post, get } from "../../src/service/ReadAPI";

export default function Customer() {
  const [CustomerDelete, setCustomerDelete] = useState(null);
  const [modalDelete, setCustomerModalDelete] = useState(false);
  const toggleDelete = () => setCustomerModalDelete(!modalDelete);
  //edit
  const [CustomerEdit, setCustomerEdit] = useState(null);
  const [modalEdit, setCustomerModalEdit] = useState(false);
  const toggleEdit = () => setCustomerModalEdit(!modalEdit)

  const [modalCreate, setCustomerModalCreate] = useState(false);
  const toggleCreate = () => setCustomerModalCreate(!modalCreate)

  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [customer_Name, setcustomer_Name] = useState("");
  const [address, setaddress] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();


  const [useListCustomerShow, setUseListCustomerShow] = useState([]);
  const [useListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerListID, setCustomerListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);

  useEffect(() => {
    getCustomerList();
    get("/api/v1.0/customer/get-all").then(
      (res) => {
        if (res && res.status === 200) {
          var temp = res.data;
          setCustomerList(temp);
          setUseListCustomerShow(temp);
          setUseListCustomerShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
          setTotalNumberPage(Math.ceil(temp.length / 5));
        }
      });
  }, []);
  function getCustomerList() {
    get("/api/v1.0/customer/get-all").then((res) => {
      var temp = res.data;
      // setName(temp.name);
      // setDescription(temp.description);
      // setImage(temp.picture);
      // setIsDeleted(temp.is_Delete);
     
    }).catch((err) => {
      console.log(err);
    });
  }

  function getCustomerListID() {
    get("/api/v1.0/customer/get-by-id" + CustomerEdit).then((res) => {
      var temp = res.data;
      setCustomerListID(temp);
    }).catch((err) => {
      console.log(err);
    });
  }


  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 5));
  }
  // create form 
  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/api/v1.0/customer/create",
      {
        customer_Name: e.target.customer_Name.value,
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
          window.location = "/admin/Customer";
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

  function handleCustomerDetele() {
    // console.log("abc" , CustomerDelete);
    post("/Customer/" + CustomerDelete,
      {
        is_Online: 0,
        is_Delete: 1,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          // window.location = "/admin/Customer";
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
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Manage Customer</Card.Title>
                {/* <Link to="/admin/create/customer">
                  
                  
                </Link> */}
                <Button

                  onClick={() => {
                    // setCustomerEdit(e.Id);
                    // getCustomerListID();
                    // handleSubmit(e);
                    setCustomerModalCreate(true);
                  }}>
                  Create new Customer
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Avatar</th>
                      <th className="border-0">Phone </th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Usernam</th>
                      <th className="border-0">Create Date</th>
                      <th className="border-0">FullName</th>
                      <th className="border-0">Uid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListCustomerShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {e.Id}
                          </td>
                          <td>
                            {e.Avatar}
                          </td>
                          <td>
                            {e.Phone_Number}
                          </td>
                          <td>
                            {e.Email}
                          </td>
                          <td>
                            {e.Username}
                          </td>
                          <td>
                            {e.Create_Date}
                          </td>
                          <td>
                            {e.Full_Name}
                          </td>
                          <td>
                            {e.Uid}
                          </td>
                          
                          <td>
                            <Media
                              src={editIcon}
                              onClick={() => {
                                setCustomerEdit(e.Id);
                                getCustomerListID();
                                setCustomerModalEdit(true);
                              }}
                            />
                          </td>
                          <td>
                            <Media
                              src={deleteIcon}
                              onClick={() => {
                                setCustomerDelete(e.Id);
                                setCustomerModalDelete(true);
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
                </Row>
              </Card.Body>
            </Card>
          </Col>
      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}
        >
          <ModalTitle>Do you want to edit Customer</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                name="customer_Name"
                id="customer_Name"
                placeholder="Name"
                onChange={customer_Name}
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
          <Button color="danger" onClick={() => { // handleCustomerDetele();

            setCustomerModalEdit(false);
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
        <ModalBody>Do you want to delete this customer</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleCustomerDetele();
              setCustomerModalDelete(false);
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

