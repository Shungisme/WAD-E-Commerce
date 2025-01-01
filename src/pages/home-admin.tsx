import DashboardProviderAdmin from "../contexts/dashboard-context-admin";
import { OverviewAnalyticsView } from "../sections/overview/view/overview-analytics-view";

export default function Page() {
  return (
    <>
      <DashboardProviderAdmin>
        <OverviewAnalyticsView />
      </DashboardProviderAdmin>
    </>
  );
}
