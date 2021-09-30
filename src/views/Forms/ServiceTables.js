import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
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
import { del, post, get } from "../../service/ReadAPI";


function ServiceTables() {
  //delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  //Edit Major
  const [MajorEdit, setMajorEdit] = useState(null);
  const [modalEdit, setMajorModalEdit] = useState(false);
  const toggleEdit = () => setMajorModalEdit(!modalEdit)
  //Delete Major
  const [MajorDelete, setMajorDelete] = useState(null);
  const [modalMajorDelete, setMajorModalDelete] = useState(false);
  const toggleMajorDelete = () => setMajorModalDelete(!modalEdit)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectMajor, setSelectMajor] = useState();


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
  const [isDeleted, setIsDeleted] = useState("");


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
  // function getMajorByID(){
  //   get(`/Major/get-by-id?id=${MajorEdit}`).then((res)=>{

  //     setName(res.data.name);
  //     setDescription(res.data.description);
  //     setImage(res.data.picture);
  //     setIsDeleted(res.data.is_Delete);
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  // }
  
  //delete fc
  function deleteMajorByID(){
    post(`/Major/delete-by-id?id=${MajorDelete}`, 
      {
        is_Delete: 1,
      })  
    .then((res)=>{
      if (res.status === 200) {
        window.location = "/admin/service";

      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  //Load major
  useEffect(() => {
    getMajorList();
    get("/Major/get-all").then(
      (res) => {
        if (res && res.status === 200) {
          setMajorList(res.data);
          // res.data;
          console.log(res.data);
        }
      });
  }, []);
  function getMajorList() {
    get("/Major/get-all").then((res) => {
      var temp = res.data;
      // setName(temp.name);
      // setDescription(temp.description);
      // setImage(temp.picture);
      // setIsDeleted(temp.is_Delete);
      setMajorList(temp);
      setUseListMajorShow(temp);
      setUseListMajorShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
      setTotalNumberPage(Math.ceil(temp.length / 5));
      setCount(count);
    }).catch((err) => {
      console.log(err);
    });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListMajorShowPage(useListMajorShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListMajorShow.length / 5));
  }
  // Delete Fc
  function handleServiceDetele() {
    del("api/service/" + ServiceDelete.serviceId, localStorage.getItem("token"))
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          // var temp;
          // temp = useList.filter((x) => x.repairmanId !== ServiceDelete.repairmanId);
          // setUseListShow(temp);
          // setUseListShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
          // setTotalNumberPage(Math.ceil(temp.length / 5));
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
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      1: "Active",
      0: "Not Alaviable",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="table-with-links">
              <Card.Header>
                <Card.Title as="h4">Table with Major</Card.Title>
                <Link to="/admin/create/major">
                  Create new Major
                </Link>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Picture</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListMajorShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {e.Id}
                            {/* {count+1} */}
                          </td>
                          <td>
                            {e.Name}
                          </td>
                          <td>
                            {e.Description}
                          </td>
                          <td>
                            {e.Picture}
                          </td>
                          <td className="td-actions text-right">
                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-150479227">
                                  View Profile..
                                </Tooltip>
                              }
                            >
                              <Button
                                onClick={() => {
                                  setModalStatus(true);
                                  setSelectMajor(e);
                                }}
                                variant="info"
                                size="sm"
                                className="text-info btn-link like"
                              >
                                <i className="fa fa-heart" />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-292560270">
                                  Edit Profile..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-link btn-xs"
                                onClick={() => {
                                  setMajorEdit(e.Id);
                                  getMajorByID();
                                  setMajorModalEdit(true);
                                }}
                                variant="success"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-410038576">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-link btn-xs"
                                onClick={() => {
                                  setMajorDelete(e.Id);
                                  setMajorModalDelete(true);
                                }}
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
          <Col md="6">
            <Card className="table-with-switches">
              <Card.Header>
                <Card.Title as="h4">Old Service</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>Andrew Mike</td>
                      <td>Develop</td>
                      <td className="text-right">€ 99,225</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-1"
                          className="mb-1"
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>John Doe</td>
                      <td>Design</td>
                      <td className="text-right">€ 89,241</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-2"
                          className="mb-1"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">3</td>
                      <td>Alex Mike</td>
                      <td>Design</td>
                      <td className="text-right">€ 92,144</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-3"
                          className="mb-1"
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">4</td>
                      <td>Mike Monday</td>
                      <td>Marketing</td>
                      <td className="text-right">€ 49,990</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-4"
                          className="mb-1"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">Hot Service</Card.Title>
                <p className="card-category">A table for the best rating</p>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Topic</th>
                      <th>Service Title</th>
                      <th className="th-description">Description</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Views</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">1,225</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-2.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">Back to School Offer</td>
                      <td>
                        Design is not just what it looks like and feels like.
                        Design is how it works.
                      </td>
                      <td className="td-number">17/07/2016</td>
                      <td className="td-number">49,302</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-65578954">View Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-38536367">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-220404926">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-3.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        First Dribbble Meetup in Romania
                      </td>
                      <td>
                        A groundbreaking Retina display. All-flash architecture.
                        Fourth-generation Intel processors.
                      </td>
                      <td className="td-number">23/06/2016</td>
                      <td className="td-number">1,799</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-793736265">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-10365564">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-4.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        How we created our startup with 0$
                      </td>
                      <td>
                        A desk is a generally wooded piece of furniture and a
                        type of useful table often used in a school or office
                        setting for various academic or professional activities
                        ...
                      </td>
                      <td className="td-number">30/06/2016</td>
                      <td className="td-number">23,030</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-662605277">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-967132803">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-972344635">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        To use or not to use Bootstrap
                      </td>
                      <td>
                        The Office Chair adapts naturally to virtually every
                        body and is a permanent fixture.
                      </td>
                      <td className="td-number">10/05/2016</td>
                      <td className="td-number">13,763</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalMajorDelete} toggle={toggleMajorDelete}>
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
              deleteMajorByID();
              setMajorModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
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
          <ModalTitle>Do you want to edit major ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Major name</Form.Label>
              <Form.Control type="text" placeholder="Major name" defaultValue={name}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                defaultValue={description}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" defaultValue={picture}
/>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            setServiceModalEdit(false);
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
          Detailed Major Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col></Col>
            <Col md={3}> Major Name</Col>
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
              {selectMajor !== undefined ? selectMajor.Picture : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>{selectMajor !== undefined ? displayStateName(selectMajor.Is_Delete) : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ServiceTables;
