/* global gapi */
import React from "react";
import moment from "moment";
import { ButtonToolbar } from "react-bootstrap";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Scheduler from "./Scheduler.js";
import list from "../../_helper/api";
import { parseJwt } from "../../_helper/functions";
import { connect } from "react-redux";
import AddAppointmentSlots from "./AddAppointmentSlots.js";
import AppointmentsSlotScheduler from "./AppointmentsSlotScheduler.js";
import TranslationContext from "../../context/translation";

class AppointmentsSlot extends React.Component {
  static contextType = TranslationContext;
  constructor(props, context) {
    super(props,context);
    this.state = { deps: [], addModalShow: false, isOpen: false };
    this.isAuthorized = false;
    this.googleAuth = null;
    this.currentApiRequest = null;

    this.state = {
      fruites: [],
      events: [],
      editEvent: {
        Title: "",
        StartDate: "",
        EndDate: "",
        patientData: null,
        physicianData: null,
        calendar: "",
      },
    };
    this.moveEvent = this.moveEvent.bind(this);
  }
  componentWillMount = () => {
    list("patient/patientSelectList?pageNumber=1&pageSize=100&QuerySearch=").then((response) => {
      this.setState({ patientData: response.data });
    });
    list("physician").then((response) => {
      this.setState({ ...this.state, physicianData: response.data });
    });
  };
  componentDidMount() {
    this.setState({ calendar: localStorage.getItem("calendar_email") });
    // console.log(this.state.calendar, "......");
  }
  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({ ...this.state, events: nextEvents });
  }
  handleChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState((state) => {
      return {
        ...state,
        editEvent: state.editEvent.map((item, i) => {
          if (i == id) {
            return value;
          } else {
            return item;
          }
        }),
      };
    });
  }
  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      ...this.state,
      events: nextEvents,
    });
  };
  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      let event = this.state.events.find((e) => e.id === data.event.id);
      event.start = start;
      event.end = end;
      return { ...state, events: state.events };
    });
  };

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.isAuthorized = true;
      if (this.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.currentApiRequest);
      }
    } else {
      this.isAuthorized = false;
    }
  };

  sendAuthorizedApiRequest = (requestDetails) => {
    this.currentApiRequest = requestDetails;
    if (this.isAuthorized) {
      this.currentApiRequest = {};
    } else {
      this.googleAuth.signIn();
    }
  };

  handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  addEvent = ({ event, start, end, allDay }) => {
    this.setState((state) => {
      return {
        ...state,
        editEvent: {
          ...state.editEvent,
          title: "",
          start: moment().toDate(),
          end: moment().toDate(),
        },
      };
    });
    this.openModal();
  };

  handleAllChecked = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
    this.setState({ ...this.state, fruites: fruites });
  };

  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => {
      if (fruite.value === event.target.value) {
        fruite.isChecked = event.target.checked;
        //debugger;
        this.setState({ ...this.state, fruites: fruites });
        //
        let event = this.state.events.find((e) => e.id === fruite.id);
        //duplicate code: Faran
        let thisEvents;
        let that = this;
        return gapi.client.calendar.events
          .list({
            calendarId: fruite.id,
          })
          .then(
            function (response) {
              thisEvents = response.result.items.map((thisEvent) => {
                //debugger;
                return {
                  id: thisEvent.id,
                  start: thisEvent.start.dateTime,
                  end: thisEvent.end.dateTime,
                  title: thisEvent.summary,
                  calendarId: thisEvent.organizer.email,
                };
              });
              if (!fruite.isChecked) {
                let calendarEvents = thisEvents;
                let indexesToRemove = calendarEvents.indexOf(fruite);
                thisEvents = that.state.events.filter(function (event) {
                  return event.calendarId !== fruite.id;
                });
                that.setState({ ...this.state, events: thisEvents });
                thisEvents.indexOf();
                var array = [...this.state.people]; // make a separate copy of the array
                var { index, e } = array.indexOf(e.target.value);
              } else {
                that.setState({
                  ...this.state,
                  events: that.state.events.concat(thisEvents),
                });
              }
            },
            function (err) {
              console.error("Execute error", err);
            }
          );
      }
    });
  };

  createEvent() {
    let that = this;
    function create() {
      window.gapi.client
        .init({
          apiKey: parseJwt().GoogleCalendarApiKey,
        })
        .then(function () {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${this.state.calendar}/events`,
            body: {
              summary: "Sample event",
              location: "Winnipeg, Manitoba, Canada",
              description: "Its a sample event.",
              start: {
                dateTime: "2020-08-10T09:00:00-07:00",
                timeZone: "Asia/Karachi",
              },
            },
            method: "POST",
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
          },
          function (reason) {
            // console.log(reason);
          }
        );
    }
    window.gapi.client
      .init({
        apiKey: parseJwt().GoogleCalendarApiKey,
      })
      .then(function () {
        gapi.client.load("calendar", "v3", function () {
          const request = gapi.client.calendar.events
            .insert({
              calendarId: this.state.calendar,
              resource: {
                summary: "Faran Test Event",
                location: "Test Location",
                description: "Test appointment",
                start: {
                  dateTime: "2020-08-09T09:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                end: {
                  dateTime: "2020-08-09T17:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                reminders: {
                  useDefault: false,
                },
              },
            })
            .then(
              (response) => {
                // console.log("Response is :", response);
              },
              function (reason) {
                // console.log(reason);
              }
            );
          request.execute(function (event) {
            this.appendPre("Event created: " + event.htmlLink);
          });
        });
      });
  }

  render() {
    const { translate } = this.context;
    const { isOpen } = this.state;
    const { deps } = this.state;
    let addModalClose = () =>
      this.setState({ ...this.state, addModalShow: false });
    // const roles = localStorage.getItem("roles");
    return (
      <React.Fragment>
        <div
          className="d-flex justify-content-end mb-3"
          data-toggle="modal"
          data-target="#addSlotsModal"
        >
          <button className="btn cc-btn">{translate("ADD_APPOINTMENT_SLOTS")}</button>
        </div>

        <div>
          <AppointmentsSlotScheduler
            patientData={this.state.patientData}
            physicianData={this.state.physicianData}
            nationalID={this.props.location.nationalID}
          />
          <ButtonToolbar />
        </div>
        <div
          className="modal fade"
          id="addSlotsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addSlotsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addSlotsModalLabel">
                {translate("ADD_APPOINTMENT_SLOTS")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddAppointmentSlots />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};
export default connect(mapStateToProps, null)(AppointmentsSlot);
