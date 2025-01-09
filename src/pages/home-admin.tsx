import { Helmet } from "react-helmet";
import DashboardProviderAdmin from "../contexts/dashboard-context-admin";
import { OverviewAnalyticsView } from "../sections/overview/view/overview-analytics-view";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>

      <DashboardProviderAdmin>
        <OverviewAnalyticsView />
      </DashboardProviderAdmin>
    </>
  );
}
