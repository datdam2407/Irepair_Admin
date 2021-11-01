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

function RegisterPage() {
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
           {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col sm="8">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4" left></Card.Title>
                      </Card.Header>
                    </Card.Header> 

                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <h4>SERVICE:</h4>
                            <p>Đo và cân chỉnh áp suất lốp</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h4>CUSTOMER:</h4>
                            <p>Do Duong Tam Dang</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pr-1" md="8">
                          <Form.Group>
                            <h4>ADDRESS:</h4>
                            <p>
                              211 Tây Hòa, Phước Long A, Thủ Đức, Hồ Chí Minh,
                            </p>
                          </Form.Group>
                        </Col>

                         {/* <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue="District 12"
                              placeholder="District 12"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>  */}
                      </Row>
                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h4>REPAIRMAN:</h4>
                            <p>Phạm Tấn Phát</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h4>REASON:</h4>
                            <p>Không biết</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h4>TOTAL(VNĐ):</h4>
                            <p>70.000VND</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h4>STATUS:</h4>
                            <p>Pending</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>

              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                       {/* <img
                        alt="..."
                        src={
                          require("assets/img/full-screen-image-3.jpg").default
                        }
                      ></img> */}
                    </div>
                  </Card.Header>
                </Card>
              </Col>

              {/* <Col md="8">
                
              </Col> */}

            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default RegisterPage;
