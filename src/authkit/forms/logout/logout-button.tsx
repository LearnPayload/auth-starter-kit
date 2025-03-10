"use client";

import { useLogoutForm } from "./use-logout-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle, LogOutIcon } from "lucide-react";

export const LogoutButton: typeof Button = ({ variant, className }) => {
  const {
    form,
    handleSubmitWithAction,
    action: { isPending },
  } = useLogoutForm();
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <Button
          type="submit"
          disabled={isPending}
          className={className}
          variant={variant}
        >
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          <LogOutIcon />
          Sign out
        </Button>
      </form>
    </Form>
  );
};
