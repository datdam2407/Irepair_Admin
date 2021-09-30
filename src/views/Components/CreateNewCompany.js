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
// import { postWithToken } from "../ReadAPI";
// import moment from "moment";
import {post} from "../../service/ReadAPI";


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
      "/Company",
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
    <div className="container-createuser-form">
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
                <Col>
                  <Label>Name</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>Address</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>Description</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>email</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>Hotline</Label>
                </Col>

                <Col md={8}>
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
                <Col>
                  <Label>Picture</Label>
                </Col>

                <Col md={8}>
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
              <Button color="danger">Save</Button>
              <Link to="/admin/Company">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}