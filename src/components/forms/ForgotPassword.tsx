"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { emailSchema } from "../../validator";
import { useState, useEffect } from "react";

const formSchema = z.object({
  email: emailSchema,
});

export function ForgotPasswordForm() {
  const { toast } = useToast();

  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("forgot_pw_form_data");
    return storedData ? JSON.parse(storedData) : { email: "" };
  });

  useEffect(() => {
    localStorage.setItem("forgot_pw_form_data", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Function to send reset email
      console.log(values);
      localStorage.removeItem("forgot_pw_form_data");
      toast({
        title: "Password reset email sent. Please check your inbox.",
      });
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email*</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="mario.rossi@mail.com"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          name="email"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
