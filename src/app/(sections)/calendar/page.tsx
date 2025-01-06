"use client";

import FullCalendar from "@fullcalendar/react";
import ICalendarPlugin from "@fullcalendar/icalendar";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const cal = fetch("calendar/4").then((res) =>
    res.text().then((cal) => console.log(cal)),
  );
  return (
    <div className="w-1/2 h-1/2">
      <FullCalendar
        plugins={[dayGridPlugin, ICalendarPlugin]}
        initialView={"dayGridMonth"}
        events={{
          url: "calendar/4",
          format: "ics",
        }}
      ></FullCalendar>
    </div>
  );
}
