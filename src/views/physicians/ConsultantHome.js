import React from "react";
import 'moment-timezone';
import list from "../../_helper/api";
import PaginationTable from '../Components/PaginationTable';

export default class ConsultantHome extends React.Component {
    constructor(props) {
        super(props);
        this.requestData = {
            pageNumber: 1,
            pageSize: 10,
            QuerySearch: ""
        }
        this.state = {
             modalPatientFileUpload: false,
      viewFileUploadModal: false,
            Status: "",
            requestData: this.requestData,
            columnsConsultant: [
                {
                    label: "Patient Name / ID",
                    name: "patientName",
                    sortable: true,
                    filter: true,
                },

                {
                    label: "Start Time",
                    name: "startDateTime",
                    options: {
                        customBodyRender: (val) => (
                            <span>{new Date(val).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                        ),
                    },
                },
                {
                    label: "Physician Name / ID",
                    name: "consultantName",
                    sortable: true,
                    filter: true,
                },
                  {
                    label: "Intake History",
                    name: "historystatus",
                },
                 {
                    label:"Vital Signs",
                    name:"vitalsignStatus",
                },
                {
                    label: "Meeting Type",
                    name: "meetingtype",
                },
                {
                    label: "ID",
                    hide: true,
                    name: "id",
                    button: { show: true, value: 'Start Meeting', operation: (val) => (this.start(val)), disabled: { key: "historystatus", value: "Intake History Not filled" } && { key: "vitalsignStatus", value: "VitalSigns Not filled" } }
                },
            ],
            rowSelectionConsultant: "single",
            rowDataConsultant: [],
        };
    }

    options = {
        filterType: "checkbox", selectableRows: false,
        responsive: "vertical",
    };
    handleSearch(request, $class) {
        $class.setState({ requestData: request }, () => {
            $class.handleSearchClick();
        })
    }
    handleSearchClick(request, $class) {
        let requestData = request ? request : this.state.requestData;
        let userId = JSON.parse(localStorage.getItem("user"));
        list(`visit/consultantsVisitList/${userId}`, requestData).then((response) => {
            $class.setState({ rowDataConsultant: response.data })
        })
    }
    componentDidMount() {
        this.handleSearchClick(null, this);
    }
    start(val) {

        list(`visit/${val}`)
            .then((response) => {
                this.setState({
                    Status: response.data.status
                });
            })
        setTimeout(() => {
            if (this.state.Status == 1) {
                this.props.history.push(`/meeting/guestMeeting?VisitID=${val}`);
            }
            else if (this.state.Status == 2) {
                this.props.history.push(`physician/meeting/${val}`);
            }
        }, 1000);
    }
    render() {
        let { paginationMetadata } = this.state;
        let { rowDataConsultant, columnsConsultant, requestData } = this.state;
        return (
            <div>
                <div className="tableWrapper">
                    <PaginationTable
                        title="My Appointments"
                        columns={this.state.columnsConsultant}
                        data={this.state.rowDataConsultant}
                        options={this.options}
                        onSelectionChanged={this.onSelectionChangedConsultant}
                        rowSelection={this.rowSelectionConsultant}
                        meeting={{ link: "meeting/guestMeeting?VisitID=" }}
                        $class={this}
                        handleSearchClick={this.handleSearchClick}
                        requestData={this.state.requestData}
                    />
                </div>
            </div>
        );
    }
}
