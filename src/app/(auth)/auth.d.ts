import { User } from "@/payload-types";
import { NextRequest } from "next/server";

declare global {
  declare interface AuthNextRequest extends NextRequest {
    user: User | null;
  }
}
