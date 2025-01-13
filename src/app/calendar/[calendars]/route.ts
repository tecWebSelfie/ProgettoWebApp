import { ICalendar } from "datebook";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(NextReq: NextRequest, res: NextApiResponse) {
  const cal = new ICalendar({
    title: "Meeting",
    start: new Date(2024, 9, 20, 10, 0, 0),
    end: new Date(2024, 9, 20, 11, 0, 0),
  });

  res.setHeader("Content-Type", "text/calendar");
  res.statusCode = 200;
  res.send(cal.render());
}
