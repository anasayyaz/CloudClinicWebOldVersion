import zIndex from "@material-ui/core/styles/zIndex";
import Axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import list, {post} from "../../_helper/api";
const styles = {
  container: {
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: "2rem",
    minHeight: "50vh",
    background: "#fff",
  },
};

//ComponentDidMount
const componentWillMount = () => {
  list("patient").then((response)=>{
    this.setState({ patientData: response.data });
  })
  list("visit").then((response)=>{
    this.setState({ ...this.state, visitData: response.data });
  })
};
const FileUploader = (props) => {
  const [images, setImages] = useState([]);
  const [visitData, setvisitData] = useState(null);
  const [patientData, setpatientData] = useState(null);

  const handleFileChange = (input) => {
    const file = input.target.files?.[0];
    if (file) {
      let newImage = {
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      };
      setImages((oldArray) => [...oldArray, newImage]);
    }
  };

  //Create Upload
  const createUpload = async (event) => {
    let formData = new FormData();
    formData.append("body", images[0].file);
    console.log(formData.get("body"));

    let response = await post(
      "UploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("axios repo", response);
  };
  const handleFileUploading = () => {
    createUpload();
  };

  const handleDeleteRow = (index) => {
    
  };

  return (
    <div className="container p-5">
      <div style={styles.container}>
        <div className="row">
          <div className="col-sm-3" style={{ overflow: "hidden" }}>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-primary my-5"
              disabled={images.length < 1}
              onClick={handleFileUploading}
            >
              Upload All Files
            </button>
          </div>
          <div className="col-sm-9">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Image</th>
                  <th>Image Name</th>
                  <th>Temp Path</th>
                  <th>Delete Row</th>
                </tr>
              </thead>
              <tbody>
                {images.map((x, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={x.url} width="100" />
                    </td>
                    <td>{x.name}</td>
                    <td width="25%">{x.url}</td>
                    <td className="opration">
                      <Button
                        onClick={() => {
                          console.log(index);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
