import { checkAdmin } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await checkAdmin();

  const games = await db.query.games.findMany({
    where: (games, { eq }) => eq(games.active, true),
  });

  return (
    <div className="p-4 md:p-8">
      <ProductForm games={games} />
    </div>
  );
}
