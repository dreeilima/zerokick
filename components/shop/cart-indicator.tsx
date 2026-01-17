"use client";

import Link from "next/link";
import { RiShoppingCart2Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";

export function CartIndicator() {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="relative text-muted-foreground hover:text-foreground"
    >
      <Link href="/cart">
        <RiShoppingCart2Line className="h-5 w-5" />
        {/* <span className="absolute top-2 right-2 h-2 w-2 bg-cyan-500 rounded-full" /> Mock indicator if needed */}
        <span className="sr-only">Carrinho</span>
      </Link>
    </Button>
  );
}
