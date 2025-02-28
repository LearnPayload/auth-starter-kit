import Image from "next/image";
import darkLogo from "@/public/logo-dark.svg";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import route from "@/lib/route";
import { User } from "@/payload-types";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
      <div className="flex flex-col w-full gap-4 max-w-xl mx-auto items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <main className="flex w-full lg:flex-row">
          <div className="relative w-full shrink-0 overflow-hidden flex flex-col items-center justify-center">
            <Image
              src={darkLogo}
              alt="Logo"
              className="hidden shrink-0 dark:flex h-24 w-24"
              width={150}
              height={150}
            />
            <h1 className="text-6xl font-bold tracking-tight text-white translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-6 starting:opacity-0 flex flex-col text-center">
              Payload
              <span className="inline bg-linear-to-r from-[#49B283] via-accent to-[#49A2B2] bg-clip-text text-transparent">
                Auth Starter Kit
              </span>
            </h1>
          </div>
        </main>
        <div className="relative flex flex-col items-center justify-center">
          <p className="inline text-white font-display text-2xl text-center">
            Your complete auth starter kit for{" "}
            <span className="inline bg-linear-to-r from-[#49B283] via-accent to-[#49A2B2] bg-clip-text text-transparent border-b border-dashed">
              PayloadCMS
            </span>
          </p>
          <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
            <Link
              className="rounded-full bg-linear-to-r from-[#49B283] via-accent to-[#49A2B2] py-2 px-6 text-base font-semibold text-slate-900 hover:from-[#56c593] hover:via-[#56c7ac] hover:to-[#58b8c9] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49A2B299] active:bg-sky-500 transition"
              href={route<User>("login", { id: 1 })}
            >
              Get started
            </Link>
            <Link
              className="rounded-full bg-slate-800 py-2 px-4 text-base font-medium text-white hover:bg-slate-700 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 active:text-slate-400 transition-colors flex items-center gap-2"
              href="/"
            >
              <GithubIcon /> View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
