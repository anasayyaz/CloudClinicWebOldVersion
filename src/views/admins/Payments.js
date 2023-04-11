import React from "react";
import { connect } from "react-redux";
import { store } from "./../../store";
import "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Search,
    Print as PrintIcon,
    Close,
    Translate,
} from "@material-ui/icons";
import ReportPrint from "../admins/ReportPrint";
import DateTimePicker from "react-datetime-picker";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import list, { put, post } from "../../_helper/api";
import ModalCarousel from "../Components/ModalCarousel";
import PopUp from "../Components/PopUp";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import PaymentsCard from "./PaymentsCard";
import TranslationContext from "../../context/translation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
let filesubmitname, imageName;
let lid;
let confirmStatus;
let selectedValue = null;
let pid;
let choiceValue;
let descriptionType;
let image = localStorage.getItem("image");
let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;
class Payments extends React.Component {
    static contextType = TranslationContext;
    constructor(props, context) {
        super(props, context);
        this.requestData = {
            pageNumber: 1,
            pageSize: 10,
            QuerySearch: "",
            StartDate: new Date(),
            EndDate: new Date(),
            physicianid: ""
        };

        this.searchField = React.createRef();
        this.state = {
            physicianData: "",
            locationShow: false,
            sum: 0,
            doctorSum: 0,
            totalSum: 0,
            totalInPerson: 0,
            totalVirtual: 0,
            pagination: [10, 15, 20],
            id: "",
            description: "",
            otherdescription: "",
            mri: true,
            bloodtest: true,
            xray: true,
            ctscan: true,
            ultrasound: true,
            others: true,
            image: {},
            modalPatientFileUpload: false,
            viewFileUploadModal: false,
            viewModal: false,
            viewPaymentModal: false,
            requestData: this.requestData,
            // pid: "",
            count: "",

            visitId: "",
            visitstate: 0,
            columns: [
                {
                    label: "Visit ID",
                    name: "id",
                },
                {
                    label: "Patient Name / ID",
                    name: "patient",
                },
                {
                    label: "Doctor Name",
                    name: "doctorName",
                },
                {
                    label: "Start Time",
                    name: "startDateTime",
                    options: {
                        customBodyRender: (val) => (
                            <span>
                                {new Date(val).toLocaleString("en-US", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        ),
                    },
                },
                {
                    label: "Intake History",
                    name: "historystatus",
                },
                {
                    label: "Vital Signs",
                    name: "vitalsignStatus",
                },
                {
                    label: "Meeting Type",
                    name: "meetingtype",
                },
                {
                    label: "ID",
                    hide: true,
                    name: "id",
                    button: {
                        show: true,
                        value: "View Imaging / Lab Reports",
                        operation: (val) => this.getUploadedFiles(val),
                    },
                },
                {
                    label: "ID",
                    hide: true,
                    name: "id",
                    button: {
                        show: true,
                        value: "Intake History",
                        operation: (val) => this.addHistory(val),
                        disabled: { key: "historystatus", value: "Intake History filled" },
                    },
                    // button:{show:true,value:'Intake History', operation: (val) => ( this.addHistory(val)), disabled:{key:"historystatus", value:'Intake History Not filled'}},
                },
                {
                    label: "ID",
                    hide: true,
                    name: "id",
                    button: {
                        show: true,
                        value: "Add Imaging / Lab Reports",
                        operation: (val) => this.create(val),
                    },
                },
            ],
            rowSelection: "single",
            rowData: [],
        };
        this.nameInput = React.createRef(); // define ref
        this.visitfun = this.visitfun.bind(this);
        this.show = this.show.bind(this);
    }
    options = {
        filterType: "checkbox",
        selectableRows: false,
        responsive: "vertical",
    };

    create = (val) => {
        this.setState({ modalPatientFileUpload: true, id: val });
        this.state.image.url = null;
        this.state.image.name = null;
        this.state.description = null;
        this.state.otherdescription = null;
        selectedValue = null;
    };

    setPhysicianID = (val) => {
        // alert(val)
        console.log(this.state.requetsData)
        this.setState({ physicianid: val })
        this.requestData["physicianid"] = val;
        console.log(this.state.requestData)
        list("payment/GetPhysicianPayments", this.state.requestData).then((response) => {
            this.setState({ rowData: response.data.visits });
            this.setState({ sum: 0 })
            this.setState({ doctorSum: 0 })
            this.setState({ totalSum: 0 })
            this.setState({ totalInPerson: 0 })
            this.setState({ totalVirtual: 0 })
            // alert(response.data.paginationMetadata.querySearch)
            if (response.data.opening == null) {
                this.setState({ doctorSum: 0 })
            }
            else {
                this.setState({ doctorSum: response.data.opening })
            }
            console.log(response.data.visits)
            this.setState({ totalSum: response.data.visits.length })
            if (response.data.visits.length != 0) {
                console.log(response.data.visits.length)

                for (let i = 0; i < response.data.visits.length; i++) {
                    console.log(response.data.visits[i].amount)
                    this.setState({ sum: (this.state.sum + response.data.visits[i].amount) })
                    if (response.data.visits[i].meetingtype == "Virtual") {
                        this.setState({ totalVirtual: (this.state.totalVirtual + 1) })
                    }
                    if (response.data.visits[i].meetingtype == "In-Person") {
                        this.setState({ totalInPerson: (this.state.InPerson + 1) })
                    }
                }
            }

        });
    }


    handleChange(event) {
        // alert(event.target.value);

        selectedValue = event.target.value;
    }
    showUpload() {
        toast.info("Document Uploaded successfully!");
    }
    reportType(event) {
        // alert(event.target.value);

        this.setState({ description: event.target.value });
        //  alert(type);
    }
    handleOtherChange(event) {
        // alert(event.target.value);

        this.setState({ otherdescription: event.target.value });
    }
    setConfirm = (id, value) => {
        put(`/visit/confirmVisit/${id}`, {
            IsConfirm: !value,
        }).then((response) => {
            toast.success("appointment ID: " + id + " updated")
            list("patient/patientsCompletedFilter", {
                pageNumber: 1,
                pageSize: 10,
                QuerySearch: "",
                StartDate: this.requestData["StartDate"],
                EndDate: this.requestData["EndDate"],
                isConfirm: "",
                locationID: lid,
            })
                .then((response) => {
                    this.setState({ rowData: response.data });

                })
                .catch((error) => {
                    console.error("Error during service worker registration:", error);
                });
        });

        // this.getLatest("All");

        // list(
        //   "/patient/patientsCompletedFilter?pageNumber=1&pageSize=10&QuerySearch=",
        //   {
        //     pageNumber: 1,
        //     pageSize: 10,
        //     QuerySearch: "",
        //     StartDate: new Date(),
        //     EndDate: new Date(),
        //     isConfirm: "",
        //   }
        // )
        //   .then((response) => {
        //     this.setState({ rowData: response.data });
        //   })
        //   .catch((error) => {
        //     console.error("Error during service worker registration:", error);
        //   });
    };
    dataChange(event) {
        let [key, value] = [event.target.name, event.target.value];
        confirmStatus = event.target.value;

        this.getLatest(confirmStatus);
    }
    createUpload = () => {
        let userid = JSON.parse(localStorage.getItem("user"));
        let domain = localStorage.getItem("domain");
        let { image } = this.state;
        let formData = new FormData();
        let type = image.name.split(".").pop();
        imageName = userid + "_" + Date.now() + "_" + domain + "." + type;
        formData.append("body", filesubmitname, imageName);
        console.log("body" + filesubmitname + imageName);
        post("UploadFile", formData).then(() => {
            this.SaveImageData();
        });
        this.showUpload();
    };
    show() {
        this.setState({ viewPaymentModal: true })
        // setTimeout(() => {
        //     window.print();
        // }, 1000);

    }
    visitfun(visitid) {
        console.log("visit page id in disptch", visitid);
        store.dispatch({
            type: "GET_nationalid",
            payload: {
                national_id: visitid,
            },
        });
    }
    setLocation(id) {
        let x;
        if ((confirmStatus = "All")) {
            x = "";
        } else if ((confirmStatus = "Confirmed")) {
            x = true;
        } else {
            x = false;
        }

        //  alert(lid)
        list("patient/patientsCompletedFilter", {
            pageNumber: 1,
            pageSize: 10,
            QuerySearch: "",
            StartDate: this.requestData["StartDate"],
            EndDate: this.requestData["EndDate"],
            isConfirm: x,
            locationID: lid,
        }).then((response) => {
            this.setState({ rowData: response.data });
        });
    }
    // getLatest(confirmStatus) {
    //     let userId = JSON.parse(localStorage.getItem("user"));

    //     if (confirmStatus == "All") {
    //         list("visit/CompletedVisitsList", {
    //             pageNumber: 1,
    //             pageSize: 10,
    //             QuerySearch: "",
    //             StartDate: this.requestData["StartDate"],
    //             EndDate: this.requestData["EndDate"],
    //             isPaid: "",
    //         }).then((response) => {

    //             this.setState({ rowData: response.data });
    //             this.setState({ sum: 0 })
    //             for (let i = 0; i < response.data.visits.length; i++) {
    //                 this.setState({ sum: (this.state.sum + response.data.items[i].amount) })
    //             }
    //         });
    //     } else if (confirmStatus == "Paid") {
    //         list("visit/CompletedVisitsList", {
    //             pageNumber: 1,
    //             pageSize: 10,
    //             QuerySearch: "",
    //             StartDate: this.requestData["StartDate"],
    //             EndDate: this.requestData["EndDate"],
    //             isPaid: true,
    //         }).then((response) => {
    //             this.setState({ rowData: response.data });
    //             this.setState({ sum: 0 })
    //             for (let i = 0; i < response.data.visits.length; i++) {
    //                 this.setState({ sum: (this.state.sum + response.data.items[i].amount) })
    //             }
    //         });
    //     } else if (confirmStatus == "UnPaid") {
    //         list("visit/CompletedVisitsList", {
    //             pageNumber: 1,
    //             pageSize: 10,
    //             QuerySearch: "",
    //             StartDate: this.requestData["StartDate"],
    //             EndDate: this.requestData["EndDate"],
    //             isPaid: false,
    //         }).then((response) => {
    //             this.setState({ rowData: response.data });

    //             this.setState({ sum: 0 })

    //         });
    //     }
    // }
    allPages = () => {
        let [
            {
                rowData: { paginationMetadata },
                requestData,
            },
            pages,
        ] = [this.state, []];
        for (let i = 1; i < paginationMetadata.totalPages; i++) {
            pages.push(
                <li
                    key={i}
                    className={
                        paginationMetadata.currentPage === i
                            ? "page-item disabled_button"
                            : "page-item"
                    }
                    onClick={() => {
                        requestData["pageNumber"] = i;
                        this.setState({ requestData });
                        this.handleSearchClick(requestData, this.$class);
                    }}
                >
                    <a className="page-link" style={{ color: "#007bff" }}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };
    disableButtons() {
        let { paginationMetadata } = this.state.rowData;
        let nextBtn = document.getElementById("nextButton");
        let prevBtn = document.getElementById("previousButton");
        if (paginationMetadata.nextPage !== "Yes") {
            nextBtn.classList.add("disabled_button");
        } else {
            nextBtn.classList.remove("disabled_button");
        }
        if (paginationMetadata.previousPage !== "No") {
            prevBtn.classList.remove("disabled_button");
        } else {
            prevBtn.classList.add("disabled_button");
        }
    }
    handleFileChange = (input) => {
        filesubmitname = input.target.files?.[0];
        const file = input.target.files?.[0];
        let { image } = this.state;
        var d = new Date();
        if (file) {
            let n = file.name.lastIndexOf(".");
            let filename = file.name.substring(n + 1);

            image = {
                name: `${d.getTime() + "." + filename
                    }`,
                file,
                url: URL.createObjectURL(file),
            };
            this.setState({ image });
        }
    };

    SaveImageData = () => {
        let { image, rowData, visitId } = this.state;

        list(`visit/${this.state.id}`).then((response) => {
            pid = response.data.patient_NationalID;
        });

        //  alert(this.state.description);

        // alert(this.state.otherdescription);

        if (this.state.description == "Other") {
            this.setState({ description: this.state.otherdescription });
            descriptionType = "Other";
        } else {
            descriptionType = this.state.description;
        }
        setTimeout(() => {
            //  alert(pid);
            //  alert(descriptionType);
            //  alert(this.state.description);

            post("LabTest", {
                isDeleted: false,
                imagePath: imageName,
                imageName: imageName,
                visitId: this.state.id,
                patient_NationalID: pid,
                type: descriptionType,
                description: this.state.description,
            }).then((response) => {
                this.setState({ modalPatientFileUpload: false });
            });
        }, 3000);
    };
    getUploadedFiles = (val) => {
        list(`visit/${val}`).then((response) => {
            pid = response.data.patient_NationalID;

            list(
                `/LabTest/PatientLabtestsbyType/X-Ray/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ xray: true });
                })
                .catch((error) => {
                    this.setState({ xray: false });
                    console.log(error);
                    // alert(error.message);
                });

            list(
                `/LabTest/PatientLabtestsbyType/CT Scan/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ ctscan: true });
                })
                .catch((error) => {
                    this.setState({ ctscan: false });
                    console.log(error);
                    // alert(error.message);
                });

            list(
                `/LabTest/PatientLabtestsbyType/MRI/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ mri: true });
                })
                .catch((error) => {
                    this.setState({ mri: false });
                    console.log(error);
                    // alert(error.message);
                });

            list(
                `/LabTest/PatientLabtestsbyType/Lab Test/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ bloodtest: true });
                })
                .catch((error) => {
                    this.setState({ bloodtest: false });
                    console.log(error);
                    // alert(error.message);
                });

            list(
                `/LabTest/PatientLabtestsbyType/Ultrasound/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ ultrasound: true });
                })
                .catch((error) => {
                    this.setState({ ultrasound: false });
                    console.log(error);
                    // alert(error.message);
                });

            list(
                `/LabTest/PatientLabtestsbyType/Other/${response.data.patient_NationalID}`
            )
                .then((response) => {
                    this.setState({ others: true });
                })
                .catch((error) => {
                    this.setState({ others: false });
                    console.log(error);
                    // alert(error.message);
                });
        });

        list(`patient/visitById/${val}`).then((response) => {
            pid = response.data[0].patient_NationalID;
            // alert(response.data[0].patient_NationalID);
        });
        list(`LabTest/visitsLabtests/${val}`)
            .then((response) => {
                this.setState({ images: response.data, viewFileUploadModal: true });
            })
            .catch((error) => {
                toast.info("No Record Found");
                // alert(error.message);
            });
    };

    getSpecificFiles(choice) {
        // alert(pid);
        choiceValue = choice;
        if (choice == "X-Ray") {
            list(`/LabTest/PatientLabtestsbyType/X-Ray/${pid}`).then((response) => {
                this.setState({ images: response.data, viewModal: true });
            });
        } else if (choice == "CT Scan") {
            list(`/LabTest/PatientLabtestsbyType/CT Scan/${pid}`).then((response) => {
                this.setState({ images: response.data, viewModal: true });
            });
        } else if (choice == "MRI") {
            list(`/LabTest/PatientLabtestsbyType/MRI/${pid}`).then((response) => {
                this.setState({ images: response.data, viewModal: true });
            });
        } else if (choice == "Lab Test") {
            list(`/LabTest/PatientLabtestsbyType/Lab Test/${pid}`).then(
                (response) => {
                    this.setState({ images: response.data, viewModal: true });
                }
            );
        } else if (choice == "Ultrasound") {
            list(`/LabTest/PatientLabtestsbyType/Ultrasound/${pid}`).then(
                (response) => {
                    this.setState({ images: response.data, viewModal: true });
                }
            );
        } else if (choice == "Other") {
            list(`/LabTest/PatientLabtestsbyType/Other/${pid}`).then((response) => {
                this.setState({ images: response.data, viewModal: true });
            });
        }
    }
    move(val) {
        list(`patient/patientStats/${this.state.pid}`).then((response) => {
            this.setState({ count: response.data.patientmetadata.totalVisits });
        });
        setTimeout(() => {
            // alert(this.state.pid);
            //  alert(this.state.count);
            if (this.state.count == 1) {
                // alert(this.state.count)
                this.props.history.push(`/AddHistory/${val}`);
            } else {
                this.props.history.push(`/EditHistory/${val}`);
            }
        }, 1000);
    }
    addHistory(val) {
        list(`patient/visitById/${val}`).then((response) => {
            this.setState({ pid: response.data[0].patient_NationalID });
        });

        setTimeout(() => {
            this.move(val);
        }, 1000);
        //           alert(this.state.count);
        //  console.log(this.state.rData);
    }
    handleSearch(request, $class) {
        $class.setState({ requestData: request }, () => {
            $class.handleSearchClick();
        });
    }
    handleSearchClick(request, $class) {
        let requestData = request ? request : this.state.requestData;
        lid = localStorage.getItem("locationID");
        list("physician/physicianSelectList?pageNumber=1&pageSize=100&QuerySearch=").then((response) => {
            this.setState({ ...this.state, physicianData: response.data });
        });
        list("payment/GetPhysicianPayments", requestData).then((response) => {
            this.setState({ rowData: response.data.visits });


            this.setState({ sum: 0 })
            this.setState({ doctorSum: 0 })
            this.setState({ totalSum: 0 })
            this.setState({ totalInPerson: 0 })
            this.setState({ totalVirtual: 0 })

            if (response.data.opening == null) {
                this.setState({ doctorSum: 0 })
            }
            else {
                this.setState({ doctorSum: response.data.opening })
            }

            this.setState({ totalSum: response.data.visits.length })
            if (response.data.visits.length != 0) {
                console.log(response.data.visits.length)
                // console.log(response.data.visits[0].amount)
                for (let i = 0; i < response.data.visits.length; i++) {
                    console.log(response.data.visits[i].amount)
                    this.setState({ sum: (this.state.sum + response.data.visits[i].amount) })
                    if (response.data.visits[i].meetingtype == "Virtual") {
                        this.setState({ totalVirtual: (this.state.totalVirtual + 1) })
                    }
                    if (response.data.visits[i].meetingtype == "In-Person") {
                        this.setState({ totalInPerson: (this.state.InPerson + 1) })
                    }
                }
            }

        });

        // list("location").then((response) => {
        //   locationData=response.data ;
        //    this.setState({locationShow:true})
        //  });
    }
    componentWillMount = () => {
        this.handleSearchClick(null, this);
        //  this.onload();
    };
    close() {
        this.setState({ viewPaymentModal: false });
    }
    render() {
        const { translate } = this.context;
        let {
            image,
            modalPatientFileUpload,
            viewFileUploadModal,
            search,
            requestData,
            viewModal,
            viewPaymentModal,
            pagination,
            rowData: { paginationMetadata },
        } = this.state;

        paginationMetadata?.currentPage && this.disableButtons();
        return (
            <PrintProvider
                ref={(el) => (this.componentRef = el)}
                className="tableWrapper"
            >
                <ToastContainer />

                <Dialog
                    open={viewPaymentModal}
                    onClose={() => {
                        this.setState({ viewPaymentModal: false })
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="true"
                >
                    <DialogContent>
                        <div style={{ width: "90vw" }}>
                            <div className="row py-3 mx-2 d-flex align-items-center">
                                <img
                                    src={link}
                                    alt="Cloud Clinic Logo"
                                    style={{ height: "90px" }}
                                />

                            </div>
                            <div className="form-group px-3">
                                <ReportPrint totalSum={this.state.totalSum} data={this.state.rowData} sum={this.state.sum} doctorSum={this.state.doctorSum} totalVirtual={this.state.totalVirtual} totalInPerson={this.state.totalInPerson} />
                            </div>
                            <div className="row pb-3 ml-5 d-flex align-items-center">
                                <img
                                    src="https://rohanileader.com/wp-content/uploads/2020/09/tracking-icon-png-29.png"
                                    alt="Cloud Clinic Logo"
                                    style={{ height: "60px" }}
                                />
                                <div className="text-left pl-4">
                                    <span className="text-dark">123-456-7890, 444-324-3241</span>
                                    <br />
                                    <span className="text-dark">
                                        Street Address Here, City Name
                                    </span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <NoPrint>
                    <div>
                        <div
                            style={{ borderRadius: "1rem" }}
                            className=" px-2 py-2  col-md-2   border-0  float-right d-flex text-right justify-content-end"
                        >
                            <div className="col"><p>Total Amount: {this.state.sum}</p>
                                <p>Doctors Share: {this.state.doctorSum}</p></div>

                        </div>
                        <div
                            style={{ borderRadius: "1rem" }}
                            className="cc-btn px-2 py-2  col-md-3   border-0 shadow float-right"
                        >
                            {/* <span>Status</span>

                            <select
                                className="form-control font-weight-bold"
                                value={confirmStatus}
                                id="typeofconsultation"
                                name="referredTo"
                                onChange={(e) => this.dataChange(e)}
                            >
                                <option value="All">All</option>
                                <option value="Paid">Paid</option>
                                <option value="UnPaid">UnPaid</option>
                            </select> */}

                            <Autocomplete
                                options={this.state.physicianData}
                                defaultValue={{ name: "Select Physician", phone: "", speciality: "" }}
                                getOptionLabel={(physician) =>
                                    `${physician.name} - ${physician.phone} - ${physician.speciality}`
                                }
                                onChange={(event, selected) => {
                                    this.setPhysicianID(selected?.nationalID || null);
                                    // let clndr = this.state.physicianData.filter(
                                    //     (data) => data.nationalID == selected?.nationalID
                                    // );
                                    // setcalendar(clndr[0].calendarID);
                                    // getConsultantID(selected?.nationalID);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" />
                                )}
                            />
                        </div>

                        <div className="d-flex justify-content-end">

                            <div
                                style={{ borderRadius: "1rem" }}
                                className="mr-2 cc-btn px-2 py-2"
                            >
                                <span>{translate("START_DATE")} </span>
                                <DateTimePicker
                                    value={requestData["StartDate"]}
                                    format="MM-dd-yyyy"
                                    className="form-control"
                                    onChange={(event) => {
                                        requestData["StartDate"] = event;
                                        this.setState({ requestData });
                                        this.handleSearchClick(requestData, this.$class);
                                    }}
                                />
                            </div>
                            <div
                                style={{ borderRadius: "1rem" }}
                                className="mr-2 cc-btn px-2 py-2"
                            >
                                <span>{translate("END_DATE")} </span>
                                <DateTimePicker
                                    value={requestData["EndDate"]}
                                    format="MM-dd-yyyy"
                                    className="form-control"
                                    onChange={(event) => {
                                        requestData["EndDate"] = event;
                                        this.setState({ requestData });
                                        this.handleSearchClick(requestData, this.$class);
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-between">
                        <h4 className="m-0">Payments List</h4>
                        <div className="text-right">
                            <button className="btn btn-md mx-1" onClick={this.show}>
                                <span className="material-icons align-middle">
                                    <PrintIcon />
                                </span>
                            </button>
                            {/* <button className="btn btn-md mx-1">
                                <span className="material-icons align-middle">
                                    <Search
                                        onClick={() => {
                                            this.setState({ search: true }, () => {
                                                this.searchField.current.focus();
                                            });
                                        }}
                                    />
                                </span>
                            </button> */}

                            {/* <ReactToPrint
                                trigger={() => (
                                   
                                )}
                                content={() => this.componentRef}
                                bodyClass={"physicians-table"}
                            /> */}
                        </div>
                    </div>
                </NoPrint>
                <NoPrint>
                    {!search ? (
                        <div>
                            <h5 className="font-weight-light"></h5>
                        </div>
                    ) : (
                        <div>
                            <button className="btn btn-md mx-1">
                                <span className="material-icons align-middle">
                                    <Close
                                        onClick={() => {
                                            requestData["QuerySearch"] = "";
                                            this.setState({ search: false, requestData });
                                            this.handleSearchClick(requestData, this.$class);
                                        }}
                                    />
                                </span>
                            </button>
                            <button className="btn btn-md mx-1">
                                <span>
                                    <input
                                        aria-invalid="false"
                                        type="text"
                                        ref={this.searchField}
                                        aria-label="Search"
                                        className="MuiInputBase-input MuiInput-input"
                                        value={requestData["QuerySearch"]}
                                        onChange={(e) => {
                                            requestData["QuerySearch"] = e.target.value;
                                            this.setState({ requestData });
                                        }}
                                        style={{
                                            border: "none",
                                            borderBottom: "2PX solid rgb(31 134 219)",
                                            width: "15rem",
                                            background: "none",
                                        }}
                                    />
                                </span>
                            </button>
                            <button
                                className="startMeeting btn btn-sm btn-primary border-0 px-3"
                                onClick={() => {
                                    this.handleSearchClick(requestData, this.$class);
                                }}
                            >
                                <span>{Translate("SEARCH")}</span>
                            </button>
                        </div>
                    )}
                </NoPrint>
                <Print>
                    <PaymentsCard
                        title="TODAY_VISIT"
                        data={this.state.rowData}
                        click={this.addHistory}
                        uploadVitalSigns={this.showGuide}
                        uploadDocuments={this.create}
                        getDocuments={this.getUploadedFiles}
                        showAge="false"
                        setConfirm={this.setConfirm}
                    />
                </Print>
                <NoPrint>
                    <div className="row float-right pr-5 mt-3 pb-5">
                        <label
                            htmlFor="exampleFoFrmControlSelect1"
                            className="pt-1 pr-2 m-0"
                        >
                            {translate("ROW_PER_PAGE")}:{" "}
                        </label>
                        <>
                            <div className="form-group mr-3">
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    onClick={(e) => {
                                        requestData["pageSize"] = e.target.value;
                                        this.setState({ requestData });
                                        this.handleSearchClick(requestData, this.$class);
                                    }}
                                >
                                    {pagination?.map((length, index) => {
                                        return <option key={`option${index}`}>{length}</option>;
                                    })}
                                </select>
                            </div>
                        </>
                        <ul className="pagination text-dark">
                            <li
                                id="previousButton"
                                className="page-item text-dark"
                                onClick={() => {
                                    requestData["pageNumber"] =
                                        paginationMetadata.currentPage - 1;
                                    this.setState({ requestData });
                                    this.handleSearchClick(requestData, this.$class);
                                }}
                            >
                                <a className="page-link" style={{ color: "#007bff" }}>
                                    {translate("PREVIOUS")}
                                </a>
                            </li>
                            {paginationMetadata?.currentPage && this.allPages()}
                            <li
                                id="nextButton"
                                className={"page-item"}
                                onClick={() => {
                                    requestData["pageNumber"] =
                                        paginationMetadata.currentPage + 1;
                                    this.setState({ requestData });
                                    this.handleSearchClick(requestData, this.$class);
                                }}
                            >
                                <a className="page-link" style={{ color: "#007bff" }}>
                                    {translate("NEXT")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </NoPrint>
            </PrintProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
    };
};

export default connect(mapStateToProps)(Payments);
