import {ProductDetail} from "@/modules/product-detail/components/product-detail";
import { getProductById } from "@/services/products/products-services";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = (await getProductById(+id)).data[0];
  console.log("product", product);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-10 py-4">
      <ProductDetail product={product} />
    </main>
  );
}
