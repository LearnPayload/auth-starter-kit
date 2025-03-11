"use client";

import { GithubIcon } from "@/authkit/components/icons/github";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useGithubLogin } from "./use-github-login";

export const GithubLogin: typeof Button = ({ variant, className }) => {
  const {
    form,
    handleSubmitWithAction,
    action: { isPending },
  } = useGithubLogin();
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <Button
          type="submit"
          disabled={isPending}
          className={className}
          variant={variant}
        >
          {isPending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <GithubIcon size="sm" />
          )}
          Github
        </Button>
      </form>
    </Form>
  );
};
