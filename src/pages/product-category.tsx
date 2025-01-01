import CategoryProviderAdmin from "../contexts/category-context-admin";
import { CategoryView } from "../sections/product-category/category-view";

export default function Page() {
  return (
    <CategoryProviderAdmin>
      <CategoryView />
    </CategoryProviderAdmin>
  );
}
