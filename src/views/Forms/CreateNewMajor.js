

import { React, useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import {post} from "../../service/ReadAPI";
import "./CreateNew.css"

import {
  Badge,
  
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function CreateNewService() {
  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [fnerror, setFnError] = useState("");
  const [lnerror, setLnError] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/Major/create",
      {
        name: e.target.majorname.value,
        description: e.target.Description.value,
        picture: e.target.picture.value,
        is_Delete: 0,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err)
       
      });
  }

  return (
    <>
      <div
        className="full-page register-page section-image"
        // data-color="orange"
        data-image={require("assets/img/bg5.jpg").default}
      >
        <div className="content align-items-center">
        <Container>
        <h3 class="logo-title">Create New Major</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col md={4}>
                  <Label>MAJOR NAME</Label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="majorname"
                    id="majorname"
                    placeholder="name"
                    onChange={fnerror}
                  />
                  <h6>{fnerror}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col md={4}>
                  <Label>Description</Label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="Description"
                    id="Description"
                    placeholder=""
                    onChange={lnerror}
                  />
                  <h6>{lnerror}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col md={4}>
                  <Label>picture</Label>
                </Col>

                <Col md={6}>
                  <Input
                    type="file"
                    name="picture"
                    id="picture"
                    placeholder="file"
                    onChange={lnerror}
                  />
                  <h6>{lnerror}</h6>
                </Col>
              </Row>
            </FormGroup>
            <div className="btn-container">
              <Row>
              <Col md={4}></Col>
                <Col md={5}>
              <Button color="danger">Save</Button>
              </Col>
              <Link to="/admin/Company">
                <Button className="danger">Cancel</Button>
              </Link>
              </Row>
            </div>
          </Form>
        </Col>
      </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg5.jpg").default + ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default CreateNewService;
