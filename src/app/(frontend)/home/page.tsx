import Image from "next/image";
import Link from "next/link";
import darkLogo from "@/public/logo-dark.svg";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
      <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
        <nav className="flex items-center justify-end gap-4">
          <Link
            href={"/login"}
            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
          >
            Log in
          </Link>
          <Link
            href={"/register"}
            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
          >
            Register
          </Link>
        </nav>
      </header>
      <div className="flex flex-col w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <main className="flex w-full lg:max-w-5xl lg:flex-row mb-6">
          <div className="relative w-full shrink-0 overflow-hidden flex flex-col items-center justify-center">
            <Image
              src={darkLogo}
              alt="Logo"
              className="hidden shrink-0 dark:flex h-24 w-24"
              width={150}
              height={150}
            />
            <h1 className="text-6xl font-bold tracking-tight text-white translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-6 starting:opacity-0 flex flex-col">
              Payload
              <span className="inline bg-linear-to-r from-accent via-[#49b288] to-accent bg-clip-text text-transparent">
                AuthKit
              </span>
            </h1>
          </div>
        </main>
        <h2 className="text-2xl text-white opacity-50 font-normal tracking-normal">
          Complete authentication tookit for PayloadCMS
        </h2>
      </div>
    </div>
  );
}
