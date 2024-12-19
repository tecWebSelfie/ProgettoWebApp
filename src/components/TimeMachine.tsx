import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function TimeMachine() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>change date</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar />
      </PopoverContent>
    </Popover>
  );
}
