"use client";

import { ApolloClient, useApolloClient, useFragment } from "@apollo/client";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { TIME_MACHINE_FRAGMENT } from "@/localGql/localOperations";

export function TimeMachine() {
  const apolloClient = useTimeMachine();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <FaRegHourglassHalf />
          <span className="hidden md:inline">change date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar />
      </PopoverContent>
    </Popover>
  );
}

function useTimeMachine() {
  const client = useApolloClient();

  const ref = setTimeMachine(new Date(), client);

  return useFragment({ fragment: TIME_MACHINE_FRAGMENT, from: "ROOT_QUERY" });
}

function setTimeMachine(NewDate: Date, client: ApolloClient<object>) {
  return client.writeFragment({
    id: "ROOT_QUERY",
    fragment: TIME_MACHINE_FRAGMENT,
    data: {
      TimeMachine: NewDate,
    },
  });
}
