"use client";

import { GithubIcon } from "@/authkit/components/icons/github";
import { useAuth } from "@/authkit/providers/auth-provider";
import route from "@/lib/route";
import Link from "next/link";

export const HeroButtons = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Link
          className="via-brand rounded-full bg-linear-to-r from-[#49B283] to-[#49A2B2] px-6 py-2 text-base font-semibold text-slate-900 transition hover:from-[#56c593] hover:via-[#56c7ac] hover:to-[#58b8c9] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49A2B299] active:bg-sky-500"
          href={route("app.dashboard")}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          className="via-brand rounded-full bg-linear-to-r from-[#49B283] to-[#49A2B2] px-6 py-2 text-base font-semibold text-slate-900 transition hover:from-[#56c593] hover:via-[#56c7ac] hover:to-[#58b8c9] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49A2B299] active:bg-sky-500"
          href={route("login")}
        >
          Get started
        </Link>
      )}

      <Link
        className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-slate-700 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 active:text-slate-400"
        href="https://github.com/LearnPayload/auth-starter-kit"
        target="_blank"
      >
        <GithubIcon /> View on GitHub
      </Link>
    </>
  );
};
