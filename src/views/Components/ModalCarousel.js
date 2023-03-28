import React from "react";
import { withRouter } from "react-router-dom";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import Moment from "react-moment";
import Iframe from "react-iframe";
import PDFViewer from "pdf-viewer-reactjs";
import PDFModal from "../Components/PDFModal";
import ReactRoundedImage from "react-rounded-image";
let domain = localStorage.getItem("domain");
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var url;
class ModalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPDF: false,
      //    xray:'',
      //    ctscan:'',
      //    mri:'',
      //    bloodtest:'',
      pdfType: "",
      imageType: "",
    };
  }
  set(u) {
    url = u;

    this.setState({ modalPDF: true });
  }
  close() {
    this.setState({ modalPDF: false });
  }
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }
  formatDate(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  render() {
    let { images } = this.props;
    let { modalPDF } = this.state;
    console.log(images);
    return (
      <div className="row border">
        <PDFModal
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
          ]}
          show={modalPDF}
          width="75vw"
          height="75vh"
          name="modalPDf"
          content={
            <iframe
              id="pdf-js-viewer"
              src={url}
              title="webviewer"
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
          }
        />
        {Array.isArray(images) ? (
          images.map((img) => {
            console.log(1+`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`)
            {/* console.log(2+`${process.env.REACT_APP_DOCUMENTS_URL}` + `${img.imagePath}`) */}
            return (
              <div className="col-md-12">
                <div className="row px-3 py-3 border">
                  <div className="col-md-4 ">
                    <h5>{img.description}</h5>
                  </div>
                  <div className="col-md-6 ">
                    <h5>
                      {days[new Date(img.createdOn).getDay()]}{" "}
                      {month[new Date(img.createdOn).getMonth()]}{" "}
                      {img?.createdOn?.split("-")[2]?.split("T")[0]}
                      {" , "}
                      {new Date(img.createdOn).toLocaleTimeString("en", {
                        timeStyle: "short",
                        hour12: true,
                        timeZone: "UTC",
                      })}
                    </h5>
                    {/* <h5>{this.formatDate(img.createdOn)}</h5>
                     <h5>{img.createdOn}</h5> */}
                    {/* <h5>  {new Date(this.formatDate(img.createdOn)).toLocaleTimeString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</h5> */}
                  </div>

                  <div
                    className="col-md-1"
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      float: "right",
                    }}
                  >
                    {img.description == "X-Ray" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        thumbnail="avatars/xray.png"
                        image={
                          //  `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                          `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                        }
                      />
                    ) : null}
                    {img.description == "CT Scan" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        thumbnail="avatars/ctscan.png"
                        image={
                           `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                        }
                      />
                    ) : null}
                    {img.description == "MRI" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        thumbnail="avatars/mri.png"
                        image={
                           `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                        }
                      />
                    ) : null}
                    {img.description == "Lab Test" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        thumbnail="avatars/bloodtest.png"
                        image={
                           `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                        }
                      />
                    ) : null}
                    {img.description == "Ultrasound" ? (
                      <ReactFancyBox
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        thumbnail="avatars/ultrasound.png"
                        image={
                           `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                        }
                      />
                    ) : null}
                    {img.description != "X-Ray" &&
                    img.description != "CT Scan" &&
                    img.description != "Ultrasound" &&
                    img.description != "MRI" &&
                    img.description != "Lab Test" ? (
                      <>
                        <>
                          {img.imageName.split(".").pop() == "png" ||
                          img.imageName.split(".").pop() == "jpg" ||
                          img.imageName.split(".").pop() == "jpeg" ? (
                            <ReactFancyBox
                              defaultThumbnailWidth="25px"
                              defaultThumbnailHeight="25px"
                              thumbnail="avatars/others.png"
                              image={
                                `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                              }
                            />
                          ) : null}
                        </>
                        <>
                          {img.imageName.split(".").pop() == "pdf" ? (
                            <img
                              onClick={() =>
                                this.set(
                               `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Documents/${img.imagePath}`
                                )
                              }
                              style={{ wdith: "30px", height: "30px" }}
                              src="avatars/others.png"
                            />
                          ) : null}
                        </>
                      </>
                    ) : null}
                  </div>
                </div>
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

export default withRouter(ModalCarousel);
