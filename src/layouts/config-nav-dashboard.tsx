import { SvgColor } from "../components/svg-color";

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
    path: "/",
    icon: icon("ic-analytics"),
  },
  {
    title: "User",
    path: "/user",
    icon: icon("ic-user"),
  },
  {
    title: "Product",
    path: "/products",
    icon: icon("ic-cart"),
  },
  {
    title: "Categories",
    path: "/categories",
    icon: icon("ic-categories"),
  },
];