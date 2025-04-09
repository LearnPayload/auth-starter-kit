"use client";

import { GithubIcon } from "@/authkit/components/icons/github";
import { GoogleIcon } from "@/authkit/components/icons/google";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import route from "@/lib/route";
import { ChevronRightIcon, LoaderCircle } from "lucide-react";
import { useCreateAccountForm } from "./use-form";
export const CreateAccountForm = () => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useCreateAccountForm({
    email: "hello@example.com",
    password: "1234",
    name: "John Doe",
  });

  const rootError = form.formState.errors.root;
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="grid grid-flow-col gap-2">
              <Button variant={"outline"}>
                <GoogleIcon size="sm" /> Google
              </Button>
              <Button variant={"outline"}>
                <GithubIcon size="sm" /> Github
              </Button>
            </div>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background text-muted-foreground px-2">
                  or
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <span
                      id="email-optional"
                      className="text-xs/6 leading-none text-gray-500"
                    >
                      Optional
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      autoFocus
                      tabIndex={1}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoFocus
                      tabIndex={2}
                      autoComplete="email"
                      placeholder="email@example.com"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />

                  {rootError && (
                    <div className="text-destructive text-center text-sm">
                      {rootError.message}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoFocus
                      tabIndex={3}
                      autoComplete="current-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-4 w-full gap-4"
            tabIndex={4}
            disabled={isPending}
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            <span>Continue</span> <ChevronRightIcon size={12} />
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <TextLink href={route("login")} tabIndex={5}>
            Sign in
          </TextLink>
        </div>
      </form>
    </Form>
  );
};
