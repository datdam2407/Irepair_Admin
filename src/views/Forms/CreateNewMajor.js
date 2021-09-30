import { React, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import {post} from "../../service/ReadAPI";

// import { postWithToken } from "../ReadAPI";
// import moment from "moment";

export default function CreateNewService() {
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
    <div className="container-createuser-form">
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
                <Col>
                  <Label>MAJOR NAME</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>Description</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>picture</Label>
                </Col>

                <Col md={8}>
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
              <Button color="danger">Save</Button>
              <Link to="/admin/service">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}