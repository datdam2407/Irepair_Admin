import React, { useState, useEffect } from "react";
import ImageUpload from "./Upload/ImageUpload.js";

import 'react-tippy/dist/tippy.css'
// react-bootstrap components
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  TableCell,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  Form,
  ModalTitle,
  Tooltip,
} from "react-bootstrap";
import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
export default function Tips() {

  const storge = firebase.storage();
  const [dataBase, setDataBase] = useState([]);
  const [tips, setTips] = useState([]);
  const [loadDataBase, setLoadDatabase] = useState(true);
  const ref = firebase.firestore().collection("tips");
  const [content , setcontent] = useState("");
  const [title, settitle] = useState("");
  const [modalCreate, setTipsModalCreate] = useState(false);
  const toggleCreate = () => setTipsModalCreate(!modalCreate)
  const [data, setData] = useState({
    content: "",
    imageUrl: null,
    title: ""
  });
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const createTips = (e) => {
    ref.add({
      content: content,
      imageUrl: localStorage.getItem("urlUpload"),
      title: title
    }).then((res) => window.location = "/admin/tip")

  }

  // ref.add({
  //   content : content,
  //   imageUrl : data.imageUrl.name,
  //   title : title
  // }).then((res) => console.log("tips created"))


  React.useEffect(() => {
    const fetchData = async () => {

      const db = firebase.firestore();
      const data = await db.collection("tips").get()
      setTips(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col md 1">
                  </div>
                  <div style={{ marginRight: '30px' }}>
                    <Button
                      color="primary"
                      href="#pablo"

                      onClick={() => setTipsModalCreate(true)}
                    >
                      Create new tips
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead >
                  <tr>
                    <th className="description">#</th>
                    <th className="description">Content</th>
                    <th className="description">Description</th>
                    <th className="description">Title</th>
                  </tr>
                </thead>
                <tbody>

                  {tips.map((e, index) => {
                    return (
                      <tr >
                        <th scope="row">{index + 1}</th>
                        <td><img className="avatar-repairman" src={e.imageUrl} /></td>
                        <td style={{width:"1150px"}}>{e.content} </td>
                        <td style={{paddingTop:'35px'}}>
                          {e.title}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered size="lg">
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          <ModalTitle><h3>Do you want to create new tips?</h3></ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* <Form.Group className="mb-2"> */}
              <Grid item xs={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text"
                    placeholder="Name"
                    name="title"
                    onChange={e => settitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text"
                    placeholder="Content"
                    as="textarea"

                    onChange={e => setcontent(e.target.value)}
                    // onChange={name}
                    rows={3}

                  />
                </Form.Group>
              </Grid>

              <Grid item xs={6}>
                <Form.Label>Image</Form.Label>
                <ImageUpload setData={setData} />
              </Grid>
            </Grid>
          </Form>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleCreate}>
            Cancel
          </Button>
          <Button color="primary" onClick={(e) =>  // handleCompanyDetele();
            createTips()
          }
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

