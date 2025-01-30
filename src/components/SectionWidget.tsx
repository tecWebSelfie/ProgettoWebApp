import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// used in Home dashboard to wrap a section's widget
export const SectionWidget = ({
  children,
  footer,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  description: string;
} & React.ComponentPropsWithoutRef<typeof Card>) => {
  return (
    <Card className="w-full" {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter> {footer}</CardFooter>}
    </Card>
  );
};
