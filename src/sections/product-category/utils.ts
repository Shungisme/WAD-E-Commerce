import { CategoryProps } from "./category-table-row";

type ApplyFilterProps = {
  inputData: CategoryProps[];
  filter: {
    key: keyof CategoryProps;
    value: string;
  }[];
  comparator: (a: any, b: any) => number;
};

export function applyFilter({
  inputData,
  filter,
  comparator,
}: ApplyFilterProps) {
  const stabilizedThis = inputData.map(
    (element, index) => [element, index] as const
  );

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((element) => element[0]);

  for (const { key, value } of filter) {
    if (value) {
      inputData = inputData.filter((category) => {
        if (key === "status") {
          return category[key] === value;
        }

        const categoryValue = category[key];
        return (
          typeof categoryValue === "string" &&
          categoryValue
            .toLowerCase()
            .trim()
            .indexOf(value.toLowerCase().trim()) !== -1
        );
      });
    }
  }

  return inputData;
}
