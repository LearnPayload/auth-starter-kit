"use client";

import { GoogleIcon } from "@/authkit/components/icons/google";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useGoogleLogin } from "./use-google-login";

export const GoogleLogin: typeof Button = ({ variant, className }) => {
  const {
    form,
    handleSubmitWithAction,
    action: { isPending },
  } = useGoogleLogin();
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
          <GoogleIcon />
          Google
        </Button>
      </form>
    </Form>
  );
};
