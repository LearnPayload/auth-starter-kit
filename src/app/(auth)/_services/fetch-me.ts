import { User } from "@/payload-types";

export const fetchMe = async (): Promise<null | undefined | User> => {
  try {
    const res = await fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { errors, user } = await res.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (res.ok) {
      return user;
    }
  } catch (e: unknown) {
    throw new Error(e as string);
  }
};
