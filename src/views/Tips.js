import React, { useState, useEffect } from "react";

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

} from "reactstrap";
import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
export default function Tips() {

  const storge = firebase.storage();
  const [dataBase , setDataBase] = useState([]);
  const [tips , setTips] = useState([]);
  const [loadDataBase, setLoadDatabase] = useState(true);
  const ref = firebase.firestore().collection("tips");

const [data, setData] = useState({
  content : "",
  imageUrl : null,
  title : ""
});
function handleChange(e){
  e.preventDefault();
  const {name , value} = e.target;
  setData((prev) => {
    return {...prev ,[name]:value}
  })
}

 
  const createTips = (e) => {
    // e.preventDefault();
    // const uploadTask = storge.bucket().file('/path/to/file');
    const uploadTask = storge.ref("tips/"+ data.imageUrl.name).put(data.imageUrl)
    uploadTask.on(
      "stage_change",
      (snapshot) =>{
        let progess;
        progess =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("progess image" ,progess);
      },
      (err) =>{
        console.log(err);
      },
      ()=>{
        storge.ref("tips")
        .child(data.imageUrl.name)
        .getDownloadURL()
        .then((url)=>{
        db.collection("tips")
        .doc(data.content)
        .set({
          content : content,
          imageUrl : url,
          title : title
        }).then(()=>{
          setData({
            content : "",
            imageUrl : null,
            title : ""
          })
          
        })
        })
      }
    )
    // ref.add({
    //   content : content,
    //   imageUrl : data.imageUrl.name,
    //   title : title
    // }).then((res) => console.log("tips created"))
  }

React.useEffect(() =>{
const fetchData = async () => {

const db = firebase.firestore();
const data = await db.collection("tips").get()
setTips(data.docs.map(doc => doc.data()))
}
fetchData()
},[])
 
  return (
    <>
      <Container fluid>
        <Row>
        <Col xl="12">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                  </div>
                  {/* <div className="col text-right"> */}
                    {/* <Button
                      onClick={() =>setTipsModalCreate(true)}
                    >
                      Create
                    </Button> */}
                  
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Content</th>
                    <th scope="col">Description</th>
                    <th scope="col">Title</th>
                  </tr>
                </thead>
                <tbody>
                
                  {tips.map((e,index) => {
                    return (
                      <tr >
                        <th scope="row">{index+1}</th>
                      <td><img className="avatar-repairman" src={e.imageUrl} /></td>  
                        <td>{e.content} </td>
                        <td>
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

     
    </>
  );
}

