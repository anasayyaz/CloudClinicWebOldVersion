import React from "react";
import PaginationTable from '../Components/PaginationTable';
import 'moment-timezone';
import list from "../../_helper/api";
import { NavLink } from "react-router-dom";
import PopUp from '../Components/PopUp';
import {Edit} from '@material-ui/icons';
import TranslationContext from "../../context/translation";
import { connect } from "react-redux";

class PhysicianHome extends React.Component {
    static contextType = TranslationContext;
    constructor(props,context) {
        super(props,context);
        this.requestData = {
            pageNumber: 1,
            pageSize: 10,
            QuerySearch: ""
        }
        this.state = {
            bulkUploadModal:false,
            requestData: this.requestData,
            language: this.context.language,
            columnsPatient: [
                // {
                //     label: this.context.translate("NATIONAL_ID"),
                //     name: "id",
                    
                //   },
                {
                    label: "Employee ID",
                    name: "employeeCode",
                },
                {
                    label: this.context.translate("FIRST_NAME"),
                    name: "firstName",
                },
                {
                    label: this.context.translate("LAST_NAME"),
                    name: "lastName",
                },
                {
                    label: this.context.translate("EMAIL"),
                    name: "email",
                },
                {
                    label: this.context.translate("USER_NAME"),
                    name: "userName",
                },
                {
                    label: this.context.translate("MOBLIE_NUMBER"),
                    name: "phoneNumber",
                },

                {
                    label: this.context.translate("ADDRESS"),
                    name: "address",
                },
                {
                    label: this.context.translate("ID"),
                    hide:true,
                    name: "id",
                    button:{show:true, value:'Edit', operation: (val) => (this.props.history.push(`/EditReceptionist/${val}`)), icon:Edit},
                  },
            ],
            rowSelectionPatient: "single",
            rowDataPatient: [],
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
        list(`accounts/usersInRole`, requestData).then((response) => {
            $class.setState({ rowDataPatient: response.data })
        })
    }
    componentDidMount() {

        this.handleSearchClick(null, this);
        //  this.onload();
    }

    onload() {
        // alert("loading");
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.language !== this.context.language) {
          this.setState({
            language: this.context.language,
            columnsPatient: [
                {
                    label: "Employee ID",
                    name: "employeeCode",
                },
                {
                    label: this.context.translate("NATIONAL_ID"),
                    name: "id",
                },
                {
                    label: this.context.translate("FIRST_NAME"),
                    name: "firstName",
                },
                {
                    label: this.context.translate("LAST_NAME"),
                    name: "lastName",
                },
                {
                    label: this.context.translate("EMAIL"),
                    name: "email",
                },
                {
                    label: this.context.translate("USER_NAME"),
                    name: "userName",
                },
                {
                    label: this.context.translate("MOBLIE_NUMBER"),
                    name: "phoneNumber",
                },

                {
                    label: this.context.translate("ADDRESS"),
                    name: "address",
                },
                {
                    label: this.context.translate("ID"),
                    hide:true,
                    name: "id",
                    button:{show:true, value:'Edit', operation: (val) => (this.props.history.push(`/EditReceptionist/${val}`)), icon:Edit},
                  },
            ],
          });
        }
      };

    render() {
        const { translate } = this.context;
        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
        let { rowDataPatient, columnsPatient, requestData,bulkUploadModal } = this.state;
        return (
            <div>
                <div className="tableWrapper">
                    <div style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}>
                        <NavLink
                              className="col-md-2 px-1 w-100 border-0 shadow btn  cc-btn"
                            to={`/AddReceptionist`} > {translate("ADD_A_NEW_RECEPTIONSIT")}
              </NavLink>
              
          <PopUp
                    $class={this}
                    buttons={[
                      { title: 'Close', className: "btn btn-secondary", action: "setState" },
                      { title: 'Save', className: "btn cc-btn", action: "setState" },
                    ]}
                    show={bulkUploadModal}
                    width="750px"
                    title="Upload Patients"
                    name="bulkUploadModal"
                    content={
                      <React.Fragment>
                      {/* {error && <h6 className="text-danger">{error}</h6>} */}
                      <input
                        type="file"
                        id="xls_input"
                        className="form-control py-1 px-1"
                        // onChange={(e) => readExcel(e.target.files[0])}
                      />
                   
                       <a className=" btn cc-btn float-left mt-1 float-right" href="avatars/PhysicianSchedule.xlsx" download>Download Sample</a>
                      
                    </React.Fragment>
                    }
                />
                    </div>
                    <PaginationTable
                        title={translate("RECEPTIONISTS")}
                        columns={columnsPatient}
                        data={rowDataPatient}
                        options={this.options}
                        search={true}
                        onSelectionChanged={this.onSelectionChangedPatient}
                        rowSelection={this.rowSelectionPatient}
                        $class={this}
                        handleSearchClick={this.handleSearchClick}
                        requestData={requestData}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      userReducer: state.userReducer,
    };
  };

export default connect(mapStateToProps, null)(PhysicianHome);
