import { db } from "@/lib/db";
import { cart } from "@/db/schema";
import { getOptionalUserSession } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { CartView } from "./cart-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const session = await getOptionalUserSession();

  if (!session?.user) {
    redirect("/login");
  }

  const userCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          variant: {
            with: {
              product: {
                with: {
                  game: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // If no cart, pass empty structure
  const cartData = userCart || { id: "temp", items: [] };

  return <CartView initialCart={cartData as any} />;
}
