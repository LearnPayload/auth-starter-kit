import { z } from "zod";

export const githubLoginSchema = z.object({});

export type GithubUserProfile = {
  login: string;
  id: number;
  avatar_url: string;
  email: string;
  name: string;
};
