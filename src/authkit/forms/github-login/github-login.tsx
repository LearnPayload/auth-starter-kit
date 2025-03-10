"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useGithubLogin } from "./use-github-login";
import { GithubIcon } from "../../components/icons/github";

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
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          <GithubIcon />
          Github
        </Button>
      </form>
    </Form>
  );
};
