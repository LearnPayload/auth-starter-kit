import { User } from "@/payload-types";
import { z } from "zod";

export const userProfileSchema = z.custom<Pick<User, "email" | "name">>();
