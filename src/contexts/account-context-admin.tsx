import { createContext, ReactNode } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  addUserApi,
  deleteUserApi,
  getUsersApi,
  updateUserApi,
} from "../services/auth";
import { AccountProps } from "../sections/account/account-table-row";

type Props = {
  children: ReactNode;
};

type AccountContextType = {
  getAccounts: UseQueryResult<AccountProps[], Error> | null;
  addAccount: UseMutationResult<
    string,
    Error,
    { account: AccountProps },
    any
  > | null;
  updateAccount: UseMutationResult<
    AccountProps,
    Error,
    { account: AccountProps },
    any
  > | null;
  deleteAccount: UseMutationResult<any, Error, { userId: string }, any> | null;
  deleteAccounts: UseMutationResult<
    any,
    Error,
    { userIds: string[] },
    any
  > | null;
};

export const AccountContext = createContext<AccountContextType>({
  getAccounts: null,
  addAccount: null,
  updateAccount: null,
  deleteAccount: null,
  deleteAccounts: null,
});

export default function AccountManagerProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const getAccounts = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      try {
        const data = await getUsersApi();
        console.log("users", data?.users);
        return data?.users;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const addAccount = useMutation({
    mutationKey: ["add-account"],
    mutationFn: async ({ account }: { account: AccountProps }) => {
      try {
        const response = await addUserApi(account);
        console.log("mutation:add acc", response);
        return response?.message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onMutate: ({ account }) => {
      queryClient.cancelQueries({ queryKey: ["add-account"] });
      const previousData = queryClient.getQueryData(["accounts"]);
      queryClient.setQueryData(["accounts"], (old: any) => {
        if (!old) {
          return [account];
        }

        return [...old, account];
      });

      return { previousData };
    },
    onError: (error, { account }, context: any) => {
      queryClient.setQueryData(["accounts"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const updateAccount = useMutation({
    mutationKey: ["update-account"],
    mutationFn: async ({ account }: { account: AccountProps }) => {
      if (account?._id) {
        const response = await updateUserApi(account);
        return response;
      } else {
        return account;
      }
    },
    onMutate: ({ account }) => {
      queryClient.cancelQueries({ queryKey: ["update-account"] });
      const previousData = queryClient.getQueryData(["accounts"]);
      queryClient.setQueryData(["accounts"], (old: any) => {
        if (!old) {
          return [];
        }
        const newAccounts = old.map((acc: AccountProps) => {
          if (acc._id === account._id) {
            return account;
          }
          return acc;
        });

        return newAccounts;
      });

      return { previousData };
    },
    onError: (error, { account }, context: any) => {
      queryClient.setQueryData(["accounts"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const deleteAccount = useMutation({
    mutationKey: ["delete-account"],
    mutationFn: async ({ userId }: { userId: string }) => {
      const response = await deleteUserApi(userId);
      return response;
    },
    onMutate: ({ userId }) => {
      queryClient.cancelQueries({ queryKey: ["delete-account"] });
      const previousData = queryClient.getQueryData(["accounts"]);
      queryClient.setQueryData(["accounts"], (old: any) => {
        if (!old) {
          return [];
        }
        const newAccounts = old.filter(
          (acc: AccountProps) => acc._id !== userId
        );

        return newAccounts;
      });

      return { previousData };
    },
    onError: (error, { userId }, context: any) => {
      queryClient.setQueryData(["accounts"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const deleteAccounts = useMutation({
    mutationKey: ["delete-accounts"],
    mutationFn: async ({ userIds }: { userIds: string[] }) => {
      try {
        await Promise.all(
          userIds.map(async (userId) => {
            const res = await deleteUserApi(userId);
            return res;
          })
        );
        return { message: "Accounts deleted successfully" };
      } catch (error) {
        throw error;
      }
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["accounts"],
      });
    },
  });

  return (
    <AccountContext.Provider
      value={{
        getAccounts,
        addAccount,
        updateAccount,
        deleteAccount,
        deleteAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
