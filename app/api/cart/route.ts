import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cart, cartItems } from "@/db/schema";
import { getOptionalUserSession } from "@/lib/auth/server";
import { eq, and } from "drizzle-orm";

export async function GET() {
  const session = await getOptionalUserSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch cart with items and product details
  const userCart = await db.query.cart.findFirst({
    where: eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          variant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    return NextResponse.json({ id: null, items: [] });
  }

  return NextResponse.json(userCart);
}

export async function POST(req: Request) {
  const session = await getOptionalUserSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { productVariantId, quantity = 1 } = body;

    if (!productVariantId)
      return NextResponse.json(
        { error: "Missing variant ID" },
        { status: 400 },
      );

    // Ensure cart exists
    let cartId;
    const userCart = await db.query.cart.findFirst({
      where: eq(cart.userId, session.user.id),
    });

    if (userCart) {
      cartId = userCart.id;
    } else {
      const newCart = await db
        .insert(cart)
        .values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          status: "active",
        })
        .returning();
      cartId = newCart[0].id;
    }

    // Check if item exists
    const existingItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, cartId),
        eq(cartItems.productVariantId, productVariantId),
      ),
    });

    if (existingItem) {
      await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      await db.insert(cartItems).values({
        cartId,
        productVariantId,
        quantity,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getOptionalUserSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
  }

  try {
    // Verify item belongs to user's cart
    // First get user's cart id
    const userCart = await db.query.cart.findFirst({
      where: eq(cart.userId, session.user.id),
    });

    if (!userCart)
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    // Delete item ensuring it belongs to this cart
    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.id, parseInt(itemId)),
          eq(cartItems.cartId, userCart.id),
        ),
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
