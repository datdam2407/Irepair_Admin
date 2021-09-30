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
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { Link } from "react-router-dom";
import { del, post ,get } from "../../service/ReadAPI";


function ManageCompany() {
  const [CompanyDelete, setCompanyDelete] = useState(null);
  const [modalDelete, setCompanyModalDelete] = useState(false);
  const toggleDelete = () => setCompanyModalDelete(!modalDelete);
//edit
  const [CompanyEdit, setCompanyEdit] = useState(null);
  const [modalEdit, setCompanyModalEdit] = useState(false);
  const toggleEdit = () => setCompanyModalEdit(!modalEdit)
  

  const [useListCompanyShow, setUseListCompanyShow] = useState([]);
  const [useListCompanyShowPage, setUseListCompanyShowPage] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  
  useEffect(() => {
    getCompanyList();
    get("/Company").then(
      (res) => {
        if (res && res.status === 200) {
          setCompanyList(res.data);
          // res.data;
          console.log(res.data);
        }});}, []);
  function getCompanyList(){
    get("/Company").then((res)=>{
      var temp = res.data;
      setCompanyList(temp);
      setUseListCompanyShow(temp);
      setUseListCompanyShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
      setTotalNumberPage(Math.ceil(temp.length / 5));
    }).catch((err)=>{
      console.log(err);
    });
  }

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListShowPage(useListShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListShow.length / 5));
  }

      
  //   getWithToken("api/states", localStorage.getItem("token")).then((res) => {
  //     if (res && res.status === 200) {
  //       setListFilterState(res.data);
  //     }
  //   });
  // }, []);

  function handleCompanyDetele(e) {
    post("/company/" + CompanyDelete.id,
      {
        is_Online: 0,
        is_Delete: 1,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/manageuser";
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setModalConfirm(true);
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
                <Link to="/admin/create/company">
                  Create new Company
                </Link>
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
                    {useListCompanyShowPage.map((e,index)=>{
                    return(
                      <tr key={index}>
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
              <Form.Control type="text" placeholder="Service name" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Category" />
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

export default ManageCompany;