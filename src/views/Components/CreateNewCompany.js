import { React, useState, useEffect } from "react";
import {
  FormGroup,
  label,
  Input,
  Button,
  Row,
  Col,

} from "reactstrap";
import { Link } from "react-router-dom";
// import { postWithToken } from "../ReadAPI";
// import moment from "moment";
import {post} from "../../service/ReadAPI";

import {
  Badge,
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
 
} from "react-bootstrap";


export default function CreateNewCompany() {
  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [company_Name, setcompany_Name] = useState("");
  const [address, setaddress] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();
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
        // if (err.response.status === 400) {
        //   if (
        //     e.target.firstname.value === "" &&
        //     e.target.lastname.value === ""
        //   ) {
        //     setcompany_Name("firstName must not be blank");
        //     setaddress("lastName must not be blank");
        //   } else if (e.target.firstname.value === "") {
        //     setcompany_Name("firstName must not be blank");
        //   } else if (e.target.firstname.value === "")
        //     setaddress("lastName must not be blank");

        //   if (
        //     err.response.data.message === "Wrong date! (MM/dd/yyyy)" &&
        //     e.target.date.value === ""
        //   )
        //     setDobError("Wrong date! (MM/dd/yyyy)");

        //   if (
        //     err.response.data.message === "Wrong date! (MM/dd/yyyy)" &&
        //     e.target.joineddate.value === ""
        //   )
        //     setJoinDateError("Wrong date! (MM/dd/yyyy)");

        //   if (
        //     err.response.data.message ===
        //     "User is under 18. Please select a different date"
        //   )
        //     setDobError("User is under 18. Please select a different date");

        //   if (
        //     err.response.data.message ===
        //     "Joined date is Saturday or Sunday. Please select a different date"
        //   )
        //     setJoinDateError(
        //       "Joined date is Saturday or Sunday. Please select a different date"
        //     );

        //   if (
        //     err.response.data.message ===
        //     "Joined date is not later than Date of Birth. Please select a different date"
        //   )
        //     setJoinDateError(
        //       "Joined date is not later than Date of Birth. Please select a different date"
        //     );
        // }
      });
  }
  
  // useEffect(() => {
  //   var curr = new Date();
  //   curr.setDate(curr.getDate());
  //   var date = curr.toISOString().substr(0, 10);
  //   setCurrentDate(date);
  // }, []);


  return (
    <>
      <div
        className="full-page register-page section-image"
        // data-color="orange"
        data-image={require("assets/img/cp5.jpg").default}
      >
        <div className="content align-items-center">
        <Container>
        <h3 class="logo-title">Create New Company</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>Name</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="company_Name"
                    id="company_Name"
                    placeholder=""
                    onChange={company_Name}
                  />
                  <h6>{company_Name}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>Address</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="address"
                    id="lastname"
                    placeholder=""
                    onChange={address}
                  />
                  <h6>{address}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>Description</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="description"
                    id="lastname"
                    placeholder=""
                    onChange={address}
                  />
                  <h6>{address}</h6>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>email</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="email"
                    id="joineddate"
                  />
                  <h6>{joinDateError}</h6>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>Hotline</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="hotline"
                    id="joineddate"
                  />
                  <h6>{joinDateError}</h6>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={4}>
                  <label>Picture</label>
                </Col>

                <Col md={6}>
                  <Input
                    type="text"
                    name="picture"
                    id="joineddate"
                  />
                  <h6>{joinDateError}</h6>
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
              "url(" + require("assets/img/cp5.jpg").default + ")",
          }}
        ></div>
      </div>
    </>
  );
}

