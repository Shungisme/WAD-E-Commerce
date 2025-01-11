import { useContext } from "react";
import { DashboardContextAdmin } from "../contexts/dashboard-context-admin";

export default function useStatistics() {
  return useContext(DashboardContextAdmin);
}
