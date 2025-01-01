import { createContext, ReactNode } from "react";
import useAuthAdmin from "../hooks/use-auth-admin";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  addProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  updateProductCategory,
} from "../services/categories";
import { CategoryProps } from "../sections/product-category/category-table-row";

interface Props {
  children: ReactNode;
}

interface CategoryContextAdminType {
  getCategories: UseQueryResult<CategoryProps[], Error> | null;
  addCategory: UseMutationResult<
    string,
    Error,
    { category: CategoryProps },
    any
  > | null;
  updateCategory: UseMutationResult<
    CategoryProps,
    Error,
    { category: CategoryProps },
    any
  > | null;
  deleteCategory: UseMutationResult<
    any,
    Error,
    { categoryId: string },
    any
  > | null;
  deleteCategories: UseMutationResult<
    any,
    Error,
    { categoryIds: string[] },
    any
  > | null;
}

const initial: CategoryContextAdminType = {
  getCategories: null,
  addCategory: null,
  updateCategory: null,
  deleteCategory: null,
  deleteCategories: null,
};

export const CategoryContextAdmin =
  createContext<CategoryContextAdminType>(initial);

export default function CategoryProviderAdmin({ children }: Props) {
  const queryClient = useQueryClient();

  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const data = await getAllProductCategories();
        console.log("categories", data?.productCategories);
        return data?.productCategories;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const addCategory = useMutation({
    mutationKey: ["add-category"],
    mutationFn: async ({ category }: { category: CategoryProps }) => {
      try {
        const data = await addProductCategory(category);
        console.log("add category", data.productCategory);
        return data.productCategory;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onMutate: async ({ category }) => {
      queryClient.cancelQueries({ queryKey: ["add-category"] });
      const previousData = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: any) => {
        if (!old) {
          return [category];
        }

        return [...old, category];
      });
      return { previousData };
    },
    onError: (error, { category }, context: any) => {
      queryClient.setQueryData(["categories"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
  });

  const updateCategory = useMutation({
    mutationKey: ["update-category"],
    mutationFn: async ({ category }: { category: CategoryProps }) => {
      if (category?._id) {
        const response = await updateProductCategory(category);
        return response?.productCategory;
      } else {
        return category;
      }
    },
    onMutate: async ({ category }) => {
      queryClient.cancelQueries({ queryKey: ["update-category"] });
      const previousData = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: any) => {
        if (!old) {
          return [category];
        }

        const newCategories = old.map((cat: CategoryProps) => {
          if (cat._id === category._id) {
            return category;
          }
          return cat;
        });

        return newCategories;
      });
      return { previousData };
    },
    onError: (error, { category }, context: any) => {
      queryClient.setQueryData(["categories"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteCategory = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async ({ categoryId }: { categoryId: string }) => {
      try {
        const data = await deleteProductCategory(categoryId);
        console.log("delete category", data);
        return data?.message;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onMutate: async ({ categoryId }) => {
      queryClient.cancelQueries({ queryKey: ["delete-category"] });
      const previousData = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old: any) => {
        if (!old) {
          return [];
        }

        const newCategories = old.filter(
          (cat: CategoryProps) => cat._id !== categoryId
        );

        return newCategories;
      });
      return { previousData };
    },
    onError: (error, { categoryId }, context: any) => {
      queryClient.setQueryData(["categories"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteCategories = useMutation({
    mutationKey: ["delete-categories"],
    mutationFn: async ({ categoryIds }: { categoryIds: string[] }) => {
      try {
        await Promise.all(
          categoryIds.map(async (categoryId) => {
            const data = await deleteProductCategory(categoryId);
            return data;
          })
        );

        return { message: "Categories deleted successfully" };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["categories"],
      });
    },
  });

  return (
    <CategoryContextAdmin.Provider
      value={{
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        deleteCategories,
      }}
    >
      {children}
    </CategoryContextAdmin.Provider>
  );
}
