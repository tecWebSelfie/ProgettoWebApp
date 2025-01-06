"use client";

import { Progress } from "@/src/components/ui/progress";
import { useEffect, useState } from "react";

export default function LoadingSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 10);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Progress value={progress} className="w-9/12" />
    </div>
  );
}
