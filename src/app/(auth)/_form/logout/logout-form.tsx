"use client";

import { useLogoutForm } from "./use-logout-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";

export const LogoutForm = () => {
  const {
    form,
    handleSubmitWithAction,
    action: { isPending },
  } = useLogoutForm();
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-6">
        <Button
          type="submit"
          className="mt-4 w-full"
          tabIndex={4}
          disabled={isPending}
        >
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Sign out
        </Button>
      </form>
    </Form>
  );
};
