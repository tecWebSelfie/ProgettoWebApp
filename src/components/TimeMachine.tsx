"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaRegHourglassHalf } from "react-icons/fa6";

export function TimeMachine() {
  const [date, setDate] = useState(new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <FaRegHourglassHalf />
          <span className="hidden md:inline">change date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          required={true}
          onSelect={(_, newDate) => setDate(newDate)}
        />
      </PopoverContent>
    </Popover>
  );
}
