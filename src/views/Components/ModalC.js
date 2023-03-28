import React from "react";
import { withRouter } from "react-router-dom";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
let domain = localStorage.getItem("domain");
class ModalC extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { images } = this.props;
    console.log(images);
    return (
      <div className="row">
        {Array.isArray(images) ? (
          images.map((img) => {
            return (
              <div className="col-md-12 ">
                <div className="row px-2 p w-90  mb-1 ">
                  <div className="col-md-4 text-center">
                    <h5>{img.type}</h5>
                  </div>
                  <div className="col-md-4 text-center ">
                    <h5>
                      {
                        <span>
                          {new Date(img.dated).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      }
                    </h5>
                  </div>

                  <div
                    className="col-md-4 text-center"
                    style={{
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    {img.type == "X-Ray" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/xray.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                    {img.type == "CT Scan" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/ctscan.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                    {img.type == "MRI" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/mri.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                    {img.type == "Lab Test" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/bloodtest.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                    {img.type == "Ultrasound" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/ultrasound.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                    {img.type != "X-Ray" &&
                    img.type != "CT Scan" &&
                    img.type != "Ultrasound" &&
                    img.type != "MRI" &&
                    img.type != "Lab Test" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="35px"
                        defaultThumbnailHeight="35px"
                        thumbnail="avatars/others.png"
                        image={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`}
                      />
                    ) : null}
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })
        ) : (
          <h5> No Imaging / Lab Reports Available </h5>
        )}
      </div>
    );
  }
}

export default withRouter(ModalC);
