import AppLogoIcon from "./app-logo-icon";

export default function AppLogo() {
  return (
    <>
      <div>
        <AppLogoIcon size="sm" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate text-lg leading-none font-semibold">
          Payload <span className="text-brand">AuthKit</span>
        </span>
      </div>
    </>
  );
}
