import { SvgColor } from "../components/svg-color/svg-color";

const icon = (name: string) => (
  <SvgColor
    width="100%"
    height="100%"
    src={`/assets/icons/navbar/${name}.svg`}
  />
);

export const navData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: icon("ic-analytics"),
  },
  {
    title: "Accounts",
    path: "/admin/accounts",
    icon: icon("ic-user"),
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: icon("ic-cart"),
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: icon("ic-categories"),
  },
];
