import { db } from "@/lib/db";
import { ShopList } from "./shop-list";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.active, true),
    with: {
      game: true,
    },
  });

  return <ShopList products={products} />;
}
