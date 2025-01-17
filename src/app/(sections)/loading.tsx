"use client";

import { Progress } from "@/src/components/ui/progress";

export default function SectionLoading() {
  return (
    <div>
      <Progress value={33} />
    </div>
  );
}
