import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductDetails } from "./product-details";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      game: true,
      variants: true,
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
