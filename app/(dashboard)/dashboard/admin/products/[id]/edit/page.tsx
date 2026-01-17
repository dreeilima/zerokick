import { checkAdmin } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { products, productVariants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductForm } from "../../product-form";
import { VariantsManager } from "../../variants-manager";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) notFound();

  // Fetch data
  const [product, availableGames, variants] = await Promise.all([
    db.query.products.findFirst({
      where: eq(products.id, productId),
    }),
    db.query.games.findMany({
      where: (games, { eq }) => eq(games.active, true),
    }),
    db.query.productVariants.findMany({
      where: eq(productVariants.productId, productId),
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Product Details Form */}
      <ProductForm games={availableGames} product={product} />

      {/* Variants Manager (Plans) */}
      <div className="max-w-2xl mx-auto">
        <VariantsManager productId={product.id} variants={variants} />
      </div>
    </div>
  );
}
