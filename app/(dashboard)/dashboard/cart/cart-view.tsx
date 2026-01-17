"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiDeleteBinLine,
  RiShoppingCartLine,
  RiArrowRightLine,
  RiSecurePaymentLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types derived from what API/Server passes
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
      game: { name: string } | null; // Handle case where game might be null
    };
  };
};

type Cart = {
  id: string;
  items: CartItem[];
};

export function CartView({ initialCart }: { initialCart: Cart }) {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate totals
  const total = cart.items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0,
  );

  const handleRemove = async (itemId: number) => {
    setIsUpdating(true);
    try {
      // We need a DELETE endpoint. I'll implement it shortly.
      // For now assuming `/api/cart?itemId=...` DELETE
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.id !== itemId),
        }));
        toast.success("Item removido.");
        router.refresh();
      } else {
        toast.error("Erro ao remover item.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <RiShoppingCartLine className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
        <p className="text-muted-foreground max-w-sm">
          Parece que você ainda não adicionou nenhum macro. Dê uma olhada na
          nossa loja!
        </p>
        <Link href="/dashboard/shop">
          <Button className="mt-4 bg-cyan-500 text-black hover:bg-cyan-400 font-bold">
            Ir para a Loja
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto p-4 md:p-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <RiShoppingCartLine className="h-6 w-6 text-cyan-500" />
          Carrinho de Compras
        </h1>

        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-cyan-500/30 transition-colors"
            >
              {/* Image */}
              <div className="relative h-20 w-32 bg-muted rounded-md overflow-hidden flex-shrink-0">
                {item.variant.product.imageUrl && (
                  <Image
                    src={item.variant.product.imageUrl}
                    alt={item.variant.product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">
                        {item.variant.product.game?.name || "Game"}
                      </span>
                      <h3 className="font-bold text-lg leading-tight">
                        {item.variant.product.name}
                      </h3>
                    </div>
                    <p className="font-bold font-mono">
                      {(item.variant.price / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Plano:{" "}
                    <span className="text-foreground font-medium">
                      {item.variant.name}
                    </span>{" "}
                    ({item.variant.interval})
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-muted-foreground">
                    Quantidade: {item.quantity}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    // disabled={isUpdating} // UX choice: don't disable all removal buttons if updating one, but ideally track updating id.
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 px-2"
                  >
                    <RiDeleteBinLine className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary / Checkout */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({cart.items.length} itens)</span>
              <span>
                {(total / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Descontos</span>
              <span className="text-green-500">- R$ 0,00</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-cyan-500">
                {(total / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>

          <Button className="w-full mt-6 bg-cyan-500 text-black hover:bg-cyan-400 font-bold h-12 text-base shadow-lg transition-transform active:scale-95">
            FINALIZAR COMPRA <RiArrowRightLine className="ml-2 h-5 w-5" />
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <RiSecurePaymentLine className="h-3.5 w-3.5" />
            Pagamento Seguro via Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
