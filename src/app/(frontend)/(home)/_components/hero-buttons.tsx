"use client";

import { GithubIcon } from "@/app/_authkit/components/icons/github";
import { useAuth } from "@/app/_authkit/providers/auth-provider";
import route from "@/lib/route";
import Link from "next/link";

export const HeroButtons = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Link
          className="rounded-full bg-linear-to-r from-[#49B283] via-brand to-[#49A2B2] py-2 px-6 text-base font-semibold text-slate-900 hover:from-[#56c593] hover:via-[#56c7ac] hover:to-[#58b8c9] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49A2B299] active:bg-sky-500 transition"
          href={route("app.dashboard")}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          className="rounded-full bg-linear-to-r from-[#49B283] via-brand to-[#49A2B2] py-2 px-6 text-base font-semibold text-slate-900 hover:from-[#56c593] hover:via-[#56c7ac] hover:to-[#58b8c9] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49A2B299] active:bg-sky-500 transition"
          href={route("login")}
        >
          Get started
        </Link>
      )}

      <Link
        className="rounded-full bg-slate-800 py-2 px-4 text-base font-medium text-white hover:bg-slate-700 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 active:text-slate-400 transition-colors flex items-center gap-2"
        href="https://github.com/LearnPayload/auth-starter-kit"
        target="_blank"
      >
        <GithubIcon /> View on GitHub
      </Link>
    </>
  );
};
