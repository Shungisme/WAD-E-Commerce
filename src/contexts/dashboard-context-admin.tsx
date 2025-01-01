import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { getStatisticsApi } from "../services/order";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

interface DashboardContextAdminType {
  getStatistics: UseQueryResult<any, unknown> | null;
  year: number | null;
  setYear: Dispatch<SetStateAction<number>>;
}

const initial: DashboardContextAdminType = {
  getStatistics: null,
  year: null,
  setYear: () => {},
};

export const DashboardContextAdmin =
  createContext<DashboardContextAdminType>(initial);

export default function DashboardProviderAdmin({ children }: Props) {
  const [year, setYear] = useState<number>(new Date().getFullYear() - 2);

  const getStatistics = useQuery({
    queryKey: ["statistics", year],
    queryFn: async () => {
      try {
        const data = await getStatisticsApi(year);
        console.log("statistics data", data);
        return {
          year: data.yearlyTotalQuantityByCategory,
          month: data.monthlyTotalQuantityByCategory,
        };
      } catch (error) {
        console.log("error at getStatistics in services");
        throw error;
      }
    },
  });

  return (
    <DashboardContextAdmin.Provider
      value={{
        getStatistics,
        year,
        setYear,
      }}
    >
      {children}
    </DashboardContextAdmin.Provider>
  );
}
