import Image from "next/image";

import "./styles.css";
import darkLogo from "@/public/logo-dark.svg";
export default async function HomePage() {
  return (
    <div className="dark bg-[#212828] bg-linear-to-r from-[#212828] via-[#272f2f] to-[#212828] text-text h-screen flex gap-2 items-center justify-center">
      <Image
        src={darkLogo}
        alt="Logo"
        className="hidden shrink-0 dark:flex h-24 w-24"
        width={120}
        height={120}
      />
      <h1 className="text-6xl font-bold tracking-tight text-white">
        Payload{" "}
        <span className="inline bg-linear-to-r from-accent via-[#49b288] to-accent bg-clip-text text-transparent">
          AuthKit
        </span>
      </h1>
    </div>
  );
}
