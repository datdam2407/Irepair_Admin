import React, { useState, useEffect } from "react";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { del, put, get, getWithParams } from "../../service/ReadAPI";

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {Id,name,description,imageUrl,majorId}=data
//select major 
const [ID, setMajorID] = useState("");
const [majorSelect, setMajorSelect] = useState("")
const [data1, setData1] = useState({ array: [] });
const [MajorSelectID, setMajorSelectID] = useState(-1)
const [listSelectMajor, setListMajor] = useState([]);
function handleOnchangeSelectdmajor(e, value) {
  //console.log(e.target,value);
  setMajorSelect (e.target.MajorID);
  setMajorSelectID(value.value);
}
useEffect(() => {
  let params = {};
  let currentField = {};
  let MajorID = "";
  get(
    `/api/v1.0/major`,
  ).then((res) => {
    MajorID = res.data.Id
    console.log(res.data)
    currentField['text'] = `${res.data.Name}`;
    currentField['value'] = res.data.Id;
    currentField['key'] = res.data.Id;
    setMajorID(MajorID);

  }).then(() => {
  });

  params['Status'] = [1].reduce((f, s) => `${f},${s}`);
  getWithParams("/api/v1.0/major", params,
  ).then(res => {
    setData1(res.data);
    const newlistMajor = res.data.reduce((list, item) => [...list,
    {
      text: `${item.Name}`,
      value: item.Id,
      key: item.Id
    }], [])
    setListMajor(
      [currentField, ...newlistMajor],
    );
  })
}, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{Id?"Do you want to update user":"Do you want to create new majorfield"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="description" value={description} onChange={e=>onChange(e)} placeholder="Enter description" label="Description" variant="outlined" margin="dense" fullWidth />
             <Dropdown
                fluid
                search
                selection
                value={majorSelect}
                onChange={handleOnchangeSelectdmajor}
                options={listSelectMajor}/>
             <TextField id="imageUrl" value={imageUrl} onChange={e=>onChange(e)} placeholder="Enter ImageUrl" label="Image" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {Id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}