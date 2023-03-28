import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./modal.css";
import { parseJwt } from "../../_helper/functions";
/* global gapi */

//const localizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);
export default class SchedulerService {
  GetAuthenticatedSchedulerInstance = () => {
    gapi.auth2.init({
      client_id: parseJwt().GoogleCalendarClientID,
    });
    return gapi.auth2.getAuthInstance().signIn({
      scope:
        "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
    });
  };
  LoadScheduler = () => {
    // gapi.client.setApiKey("AIzaSyBPcaCbDhJpCBWd-bt_m9NwRk-yWDXBAXQ");
    gapi.client.setApiKey(parseJwt().GoogleCalendarApiKey);

    return gapi.client.load(
      "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    );
  };

  LoadCalendarList = () => {
    return gapi.client.calendar.calendarList.list({
      maxResults: 100,
      minAccessRole: "reader",
      showDeleted: false,
      showHidden: false,
    });
  };

  LoadEventList = (calendarId) => {
    return gapi.client.calendar.events.list({
      calendarId,
    });
  };

  AddThisEvent = (event) => {
    return gapi.client.calendar.events.insert({
      calendarId: event.calendarId,
      resource: event,
    });
  };
  UpdateThisEvent = (event) => {
    return gapi.client.calendar.events.update({
      eventId: event.Id,
      calendarId: event.calendarId,
      resource: event,
    });
  };
  DeleteThisEvent = (event) => {
    return gapi.client.calendar.events.delete({
      eventId: event.Id,
      calendarId: event.calendarId,
    });
  };

  AddEvent = (event) => {
    let that = this;
    that.GetAuthenticatedSchedulerInstance().then(function () {
      that.LoadScheduler().then(function () {
        that.AddThisEvent(event);
      });
    });
  };
}
