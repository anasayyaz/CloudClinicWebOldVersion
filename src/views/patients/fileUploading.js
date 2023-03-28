import zIndex from "@material-ui/core/styles/zIndex";
import React, { useState } from "react";
import { connect } from "react-redux";
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

const FileUploader = (props) => {
  const [images, setImages] = useState([]);
  const [visitId, setvisitId] = useState(null);
  const [PatientId, setPatientId] = useState(null);
  const [ImageName, setImageName] = useState("");
  const [ImagePath, setImagePath] = useState("");
  const handleFileChange = (input) => {
    const file = input.target.files?.[0];
    if (file) {
      let newImage = {
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      };
      setImages((oldArray) => [...oldArray, newImage],()=>{console.log("in images folder",newImage)});
    }
  };

  //Create Upload
  const createUpload = async (event) => {
    let formData = new FormData();
    formData.append("body", images[0].file);
    console.log("formdata in append",formData.get("body"));
    let response = await post("UploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  //Save File On Database
  const SaveImageData = (event) => {
    let formData = new FormData();

    formData.append("body", images[0].file);
    post("LabTest", {
      "visit": null,
      "visitId": event.VisitId,
      "imagePath": event.ImagePath,
      "imageName": event.ImageName,
      "isDeleted": false,
      "patientId": event.PatientId,
      "isLatest": true,
      "createdOn": "2020-11-30T00:00:00"
    })
  };

  const postDataAsync=async ()=>{
    let id=props.match.params.id;
    let response = list(`visit/${id}`)
    response = response.data;
    console.log('resposne', response)
      return response;
  }
  const  postClientData=()=> {
    try {
     postDataAsync()
        .then(data => {
          for (let i=0;i<images.length;i++){
            console.log("selected images name",images[i].name)
            var event={
              isDeleted: false,
              ImagePath: images[i].url,
              ImageName: images[i].name,
              VisitId: data.id,
              PatientId: data.patient_NationalID,
            }
            SaveImageData(event);
            }

            createUpload();
            props.history.push(`/LabTest/visitLabTest/${props.match.params.id}`)
        });
    }
    catch (e) {
      console.log("Data Not Returned: ", e)


    }
  }
  const handleFileUploading = () => {
postClientData()
  };

  const handleDeleteRow = (index) => {
    // alert("Row Deleted");
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

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,

  };
};

export default connect(mapStateToProps)(FileUploader);
