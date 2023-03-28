import React from "react";
import 'moment-timezone';
import list from "../../_helper/api";
import PaginationTable from '../Components/PaginationTable';

export default class UpcomingVisits extends React.Component {
    constructor(props) {
        super(props);
        this.requestData = {
            pageNumber: 1,
            pageSize: 10,
            QuerySearch: ""
        }

        this.state = {
            Status: "",
            requestData: this.requestData,
            columnsConsultant: [

                {
                    label: "Time",
                    name: "startDateTime",
                    options: {
                        customBodyRender: (val) => (
                            <span>{new Date(val).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                        ),
                    },
                },
                {
                    label: "Doctor",
                    name: "doctorName",

                    sortable: true,
                    filter: true,
                },
                {
                    label: "Speciality",
                    name: "doctorSpeciality",

                    sortable: true,
                    filter: true,
                },
                {
                    label: "Description",
                    name: "title",
                    sortable: true,
                    filter: true,
                },
                {
                    label: "Reason ",
                    name: "summaryNotes",
                    sortable: true,
                    filter: true,
                },
                {
                    label: "Fee",
                    name: "amount",
                    sortable: true,
                    filter: true,
                }
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
        list(`patient/patientsPreviousVisits/${userId}`, requestData).then((response) => {
            $class.setState({ rowDataConsultant: response.data })
        })
    }
    componentDidMount() {
        this.handleSearchClick(null, this);
    }

    render() {

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
                        $class={this}
                        handleSearchClick={this.handleSearchClick}
                        requestData={this.state.requestData}
                    />
                </div>
            </div>
        );
    }
}
