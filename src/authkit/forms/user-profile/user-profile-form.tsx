"use client";

import { useAuth } from "@/authkit/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useUserProfileForm } from "./use-user-profile-form";

export const UserProfileForm = () => {
  const { user } = useAuth();
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useUserProfileForm({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });
  if (!user) return null;

  const rootError = form.formState.errors.root;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <div className="grid gap-2">
          {rootError && (
            <div className="text-destructive dark:text-destructive-foreground text-center text-sm">
              {rootError.message}
            </div>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full"
                    autoComplete="name"
                    placeholder="Full name"
                    tabIndex={1}
                    {...field}
                    value={field.value ?? ""}
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
                    type="email"
                    className="mt-1 block w-full"
                    autoComplete="email"
                    placeholder="Primary email address"
                    tabIndex={1}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  If you change your email address, you will no longer be able
                  to access the dashboard until the new address is verified.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant={"outline"} disabled={isPending}>
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
