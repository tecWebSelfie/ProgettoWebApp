import { ICalendar } from "datebook";
import type { NextApiRequest, NextApiResponse } from "next";

type Params = {
  calendars: number;
};

export function GET(req: NextApiRequest, { params }: { params: Params }) {
  console.log("calendar n°" + params.calendars + " getting called");
  let mcal = {
    ...calendar,
    title: "Happy hour n+ " + params.calendars,
  };
  return new Response(mcal.render(), {
    headers: { "Content-Type": "text/calendar" },
  });
}

const calendar = new ICalendar({
  title: "Happy Hour",
  location: "The Bar, New York, NY",
  description: "Let's blow off some steam with a tall cold one!",
  start: new Date("2024-05-23T19:00:00"),
  end: new Date("2024-05-24T23:30:00"),
  attendees: [
    {
      name: "John Doe",
      email: "john@doe.com",
      icsOptions: {
        rsvp: true,
      },
    },
    {
      name: "Jane Doe",
      email: "jane@doe.com",
    },
  ],
  // an event that recurs every two weeks:
  recurrence: {
    frequency: "WEEKLY",
    interval: 2,
  },
});
