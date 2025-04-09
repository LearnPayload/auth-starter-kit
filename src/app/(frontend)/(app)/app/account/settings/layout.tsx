import Heading from "@/components/heading";
import { RouteLink } from "@/components/route-link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-6">
      <Heading
        title="Settings"
        description="Manage your profile and account settings"
      />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="justify-start text-left"
            >
              <RouteLink
                to={"account.settings"}
                activeClassName="bg-primary/10"
                prefetch
              >
                Profile
              </RouteLink>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              asChild
              className="justify-start text-left"
            >
              <RouteLink
                to={"account.settings.appearance"}
                activeClassName="bg-primary/10"
                prefetch
              >
                Appearance
              </RouteLink>
            </Button>
          </nav>
        </aside>

        <Separator className="my-6 md:hidden" />

        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
