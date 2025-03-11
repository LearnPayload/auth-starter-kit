import darkLogo from "@/public/logo-dark.svg";
import lightLogo from "@/public/logo-light.svg";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroButtons } from "./_components/hero-buttons";

export default function Page() {
  return (
    <div className="text-primary flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-white">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <main className="flex w-full lg:flex-row">
          <div className="relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden">
            <Image
              src={darkLogo}
              alt="Logo"
              className="hidden h-24 w-24 shrink-0 dark:flex"
              width={150}
              height={150}
            />

            <Image
              src={lightLogo}
              alt="Logo"
              className="flex h-24 w-24 shrink-0 dark:hidden"
              width={150}
              height={150}
            />
            <h1 className="translate-y-0 text-center text-6xl font-bold tracking-tight opacity-100 transition-all duration-750 starting:translate-y-6 starting:opacity-0">
              Payload{" "}
              <span className="via-brand inline bg-linear-to-r from-[#49B283] to-[#49A2B2] bg-clip-text text-transparent">
                AuthKit
              </span>
            </h1>
          </div>
        </main>
        <div className="relative flex flex-col items-center justify-center">
          <p className="font-display inline text-center text-2xl">
            Your complete auth starter kit for{" "}
            <Link
              href="https://payloadcms.com/"
              target="_blank"
              className="via-brand inline-flex items-center gap-1 border-b border-dashed bg-linear-to-r from-[#49B283] to-[#49A2B2] bg-clip-text text-transparent hover:border-transparent"
            >
              <span>Payload CMS</span>
              <ExternalLinkIcon className="-mt-2" size={12} />
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
