import { products } from '../../../lib/products';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductLayout({ children }) {
  return <>{children}</>;
}
