import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UserPage() {
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">Edit Profile</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>ID (disabled)</label>
                            {/* <Form.Control
                              value={localStorage.getItem("IDADMIN")}
                              disabled
                              placeholder="Company"
                              type="text"
                            ></Form.Control> */}
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>Username</label>
                            {/* <Form.Control
                              value= {localStorage.getItem("NAME")}
                              placeholder="Username"
                              type="text"
                            ></Form.Control> */}
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            {/* <Form.Control
                              placeholder="Email"
                              type="email"
                              value= {localStorage.getItem("email")}
                              disabled
                            > 
                            </Form.Control> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                               value={localStorage.getItem("ADDRESS")} 
                              placeholder="Home Address"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue="Ho CHi Minh city"
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue="District 12"
                              placeholder="District 12"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                     
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              cols="80"
                              defaultValue="Sevenn"
                              placeholder="Here can be your description"
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Update Profile
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>

              
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img
                        alt="..."
                        src={
                          require("assets/img/full-screen-image-3.jpg").default
                        }
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/new_logo.png").default}
                        ></img>
                        <Card.Title as="h5">{localStorage.getItem("email")}</Card.Title>
                      </a>
                      <p className="card-description">{localStorage.getItem("NAME")}</p>
                    </div>
                    <p className="card-description text-center">
                      Hey there! As you can see, <br></br>
                      it is already looking great.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="button-container text-center">
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-facebook-square"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-google-plus-square"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default UserPage;
