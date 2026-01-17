import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { DownloadSection } from "@/components/dashboard/download-section";
import { GamesStatus } from "@/components/dashboard/games-status";
import { getUserSession } from "@/lib/auth/server";

export default async function DashboardPage() {
  const session = await getUserSession();

  return (
    <div className="flex flex-col gap-6">
      <DashboardWelcome name={session.user.name} />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <DownloadSection />
        <GamesStatus />
      </div>
    </div>
  );
}
