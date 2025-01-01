import ProductProviderAdmin from "../contexts/product-context-admin";
import { ProductsView } from "../sections/product/view/products-view";

export default function Page() {
  return (
    <ProductProviderAdmin>
      <ProductsView />
    </ProductProviderAdmin>
  );
}
