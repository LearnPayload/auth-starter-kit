import { FormEventHandler, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import HeadingSmall from "@/components/heading-small";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();
    ///
  };

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will
              also be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </DialogDescription>
            <form className="space-y-6" onSubmit={deleteUser}>
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>

              <DialogFooter className="gap-2">
                <DialogClose>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>

                <Button variant="destructive" asChild>
                  <button type="submit">Delete account</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
