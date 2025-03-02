import Image from "next/image";
import darkLogo from "@/public/logo-dark.svg";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { HeroButtons } from "./_components/hero-buttons";

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
              <span className="inline bg-linear-to-r from-[#49B283] via-brand to-[#49A2B2] bg-clip-text text-transparent">
                Auth Starter Kit
              </span>
            </h1>
          </div>
        </main>
        <div className="relative flex flex-col items-center justify-center">
          <p className="inline text-white font-display text-2xl text-center">
            Your complete auth starter kit for{" "}
            <Link
              href="https://payloadcms.com/"
              target="_blank"
              className="bg-linear-to-r from-[#49B283] via-brand to-[#49A2B2] bg-clip-text text-transparent border-b border-dashed hover:border-transparent inline-flex items-center gap-1"
            >
              <span>Payload CMS</span>
              <ExternalLinkIcon className="text-white -mt-2" size={12} />
            </Link>
          </p>
          <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
            <HeroButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
