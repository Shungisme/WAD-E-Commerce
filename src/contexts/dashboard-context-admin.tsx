import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { getStatisticsApi } from "../services/order";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

interface DashboardContextAdminType {
  getStatistics: UseQueryResult<any, unknown> | null;
  getOldStatistics: UseQueryResult<any, unknown> | null;
  previousYear: number | null;
  year: number | null;
  setYear: Dispatch<SetStateAction<number>>;
  handleChangeYear: (value: number) => void;
  compareOldYear: any | null;
}

const initial: DashboardContextAdminType = {
  getStatistics: null,
  getOldStatistics: null,
  previousYear: null,
  year: null,
  setYear: () => {},
  handleChangeYear: () => {},
  compareOldYear: null,
};

export const DashboardContextAdmin =
  createContext<DashboardContextAdminType>(initial);

export default function DashboardProviderAdmin({ children }: Props) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [previousYear, setPreviousYear] = useState<number>(
    new Date().getFullYear() - 1
  );

  const handleChangeYear = useCallback((value: number) => {
    setYear(value);
    setPreviousYear(value - 1);
  }, []);

  const getStatistics = useQuery({
    queryKey: ["statistics", year],
    queryFn: async () => {
      try {
        const data = await getStatisticsApi(year);
        console.log(data);
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

  const getOldStatistics = useQuery({
    queryKey: ["statistics", previousYear],
    queryFn: async () => {
      try {
        const data = await getStatisticsApi(previousYear);

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

  const compareOldYear = useMemo(() => {
    return {
      categories: getStatistics?.data?.year.categories,
      series: [
        {
          name: year,
          data: getStatistics?.data?.year?.series,
        },
        {
          name: previousYear,
          data: getOldStatistics?.data?.year?.series,
        },
      ],
    };
  }, [getStatistics, getOldStatistics, year, previousYear]);

  return (
    <DashboardContextAdmin.Provider
      value={{
        getStatistics,
        getOldStatistics,
        previousYear,
        year,
        setYear,
        handleChangeYear,
        compareOldYear,
      }}
    >
      {children}
    </DashboardContextAdmin.Provider>
  );
}
