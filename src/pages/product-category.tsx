import { Helmet } from "react-helmet";
import CategoryProviderAdmin from "../contexts/category-context-admin";
import { CategoryView } from "../sections/product-category/category-view";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Manage Category</title>
        <meta name="description" content="Product Category Page" />
      </Helmet>

      <CategoryProviderAdmin>
        <CategoryView />
      </CategoryProviderAdmin>
    </>
  );
}
