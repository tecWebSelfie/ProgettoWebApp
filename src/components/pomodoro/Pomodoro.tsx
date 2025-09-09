import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import "./Pomodoro.css";
import {
  FaBrain,
  FaForwardStep,
  FaGear,
  FaPlay,
  FaPause,
  FaExpand,
  FaClockRotateLeft,
} from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PomodoroSVG from "./PomodoroSVG";

export function Pomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(5);

  const [imgAnimation, setImgAnimation] = useState("animate-bounce-pomo");

  useEffect(() => {
    let interval = setTimeout(() => {});
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (interval) clearInterval(interval);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(24);
    setSeconds(59);
  };

  const updateSteps = () => {};

  const skipForward = () => {
    resetTimer();
    updateSteps();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row justify-center items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Full Screen"
          className="size-10"
        >
          <FaExpand />
        </Button>
        <Button size="lg" aria-label="Do not disturb mode" variant="secondary">
          <FaBrain /> Focus
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="size-10"
        >
          <FaGear />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <PomodoroSVG />

        <div className="w-fit bg-red text-red text-center ">
          {`${minutes.toString()}:${seconds.toString().padStart(2, "0")}`}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row m-auto justify-center items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="size-12"
          aria-label="Reset Timer"
          onClick={resetTimer}
        >
          <FaClockRotateLeft />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            toggleTimer();
            setImgAnimation(
              isRunning ? "animate-shake-pomo" : "animate-pulse-pomo",
            );
          }}
          aria-label={isRunning ? "Pause" : "Play"}
          className="size-16"
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={skipForward}
          aria-label="Skip Forward"
          className="size-12"
        >
          <FaForwardStep />
        </Button>
      </CardFooter>
    </Card>
  );
}
