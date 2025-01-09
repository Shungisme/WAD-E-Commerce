import { Helmet } from "react-helmet";
import ProductProviderAdmin from "../contexts/product-context-admin";
import { ProductsView } from "../sections/product/view/products-view";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Manage Products</title>
        <meta name="description" content="Admin Products" />
      </Helmet>

      <ProductProviderAdmin>
        <ProductsView />
      </ProductProviderAdmin>
    </>
  );
}
