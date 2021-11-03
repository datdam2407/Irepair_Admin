import React, { useState, useRef, useEffect } from "react"

import { Button } from "react-bootstrap"
import { MdSearch } from "react-icons/md";
import "./ImageUpload.css"
function ImageUpload(props) {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    function pickedHandler(e) {
        let pickedFile;
        var files = e.target.files 
        if (files) {
            pickedFile = files[0];
            setFile(files[0]);
            props.setData((prev) => {
                return { ...prev, imageUrl: files[0] };
            })
        }
    }
    function pickedImageHandler() {
        filePickerRef.current.click();
    }
    return (
        <div className="form-controll center">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-uplaod ${props.center && "center"}`}>
                <div className="image-upload_preview">
                    {previewUrl && <img src={previewUrl} alt="preview" />}
                    {!previewUrl && (
                        <div className="center">
                            <Button className="image-upload-button" type="button"
                                onClick={pickedImageHandler}>+</Button>
                        </div>
                    )}
                </div>
                <div>
                    {previewUrl && (
                        <div className="center">
                            <Button className="image-upload-button" type="button"
                                onClick={pickedImageHandler}>
                                <MdSearch className="icon" ></MdSearch>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default ImageUpload;