"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiDeleteBinLine,
  RiShoppingCart2Line,
  RiArrowRightLine,
  RiSecurePaymentLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
type CartItem = {
  id: number;
  quantity: number;
  variant: {
    id: number;
    name: string;
    interval: string;
    price: number;
    product: {
      name: string;
      imageUrl: string | null;
      game: { name: string } | null;
    };
  };
};

type Cart = {
  id: string;
  items: CartItem[];
};

export function CartSheet() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch cart data
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when opening
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const total =
    cart?.items.reduce(
      (acc, item) => acc + item.variant.price * item.quantity,
      0,
    ) || 0;

  const handleRemove = async (itemId: number) => {
    if (!cart) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCart({
          ...cart,
          items: cart.items.filter((item) => item.id !== itemId),
        });
        toast.success("Item removido.");
        router.refresh(); // Update other parts of UI if needed
      } else {
        toast.error("Erro ao remover item.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <RiShoppingCart2Line className="h-5 w-5" />
          {/* Badge could be added here if we global state for count */}
          <span className="sr-only">Carrinho</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <RiShoppingCart2Line className="h-5 w-5 text-cyan-500" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              Carregando...
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <RiShoppingCart2Line className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">O carrinho está vazio.</p>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="mt-2"
              >
                Ver Loja
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg border bg-card/50"
                >
                  {/* Img */}
                  <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {item.variant.product.imageUrl && (
                      <Image
                        src={item.variant.product.imageUrl}
                        alt={item.variant.product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm line-clamp-1">
                        {item.variant.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.variant.name} ({item.variant.interval})
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-sm">
                        {(item.variant.price / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        onClick={() => handleRemove(item.id)}
                      >
                        <RiDeleteBinLine className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <SheetFooter className="flex-col sm:justify-center border-t pt-4">
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-cyan-500">
                  {(total / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-bold h-12">
                CONFIRMAR PEDIDO <RiArrowRightLine className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <RiSecurePaymentLine className="h-3 w-3" />
                Pagamento Seguro via Stripe
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
