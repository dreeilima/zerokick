"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiShoppingCart2Line,
  RiCheckLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiArrowLeftLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
type Variant = {
  id: number;
  name: string;
  type: string;
  interval: string;
  price: number;
  stripePriceId: string | null;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  game?: { name: string };
  variants: Variant[];
};

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();

  // Default to first variant or specific one if needed
  // We sort variants by price or logic?
  // Let's assume passed variants are valid.
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] || null,
  );
  const [deviceType, setDeviceType] = useState("universal");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productVariantId: selectedVariant.id,
          quantity: 1,
        }),
      });

      if (res.ok) {
        toast.success("Produto adicionado ao carrinho!");
        router.refresh(); // Refresh to update cart count if we have one
      } else {
        if (res.status === 401) {
          toast.error("Você precisa estar logado!");
          router.push("/login");
        } else {
          toast.error("Erro ao adicionar ao carrinho.");
        }
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard/shop"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm font-medium"
        >
          <RiArrowLeftLine className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Gallery / Media */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-card shadow-sm">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                  <span className="text-primary font-bold tracking-widest uppercase">
                    Preview do Produto
                  </span>
                </div>
              )}

              {/* Simulated "LIVE" status */}
              <div className="absolute top-4 right-4 animate-pulse">
                <Badge variant="destructive" className="font-bold">
                  LIVE DEMO
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-card border border-border hover:border-primary/50 cursor-pointer transition-all"
                />
              ))}
            </div>
          </div>

          {/* Right: Details & Purchase */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mb-2">
                {product.game?.name}
              </h2>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Features (Static for now, could be dynamic later) */}
            <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-y-2 gap-x-4">
              {[
                "Indetectável (Driver Universal)",
                "Humanização Avançada",
                "Updates Automáticos",
                "Suporte 24/7",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <RiCheckLine className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            <Separator />

            {/* Selection Area */}
            <div className="space-y-6 bg-card/40 p-6 rounded-xl border border-border">
              {/* Device Type Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold uppercase text-muted-foreground">
                    Versão do Driver
                  </label>
                  <span className="text-xs text-green-500 flex items-center gap-1 font-medium">
                    <RiShieldCheckLine className="h-3 w-3" /> Undetected
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["universal", "logitech", "razer"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDeviceType(type)}
                      className={cn(
                        "px-3 py-2 rounded-md border text-xs md:text-sm font-bold uppercase transition-all",
                        deviceType === type
                          ? "bg-cyan-500 text-black border-cyan-500 ring-2 ring-cyan-500/20"
                          : "bg-background border-input text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection (Variants) */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase text-muted-foreground">
                  Plano de Acesso
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "relative flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all",
                        selectedVariant?.id === variant.id
                          ? "bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500"
                          : "bg-background border-border hover:bg-muted/50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center",
                            selectedVariant?.id === variant.id
                              ? "border-cyan-500"
                              : "border-muted-foreground",
                          )}
                        >
                          {selectedVariant?.id === variant.id && (
                            <div className="h-2 w-2 rounded-full bg-cyan-500" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            selectedVariant?.id === variant.id
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {variant.name}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                          ({variant.interval})
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-base text-foreground">
                          {(variant.price / 100).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase font-bold">
                    Total
                  </p>
                  <p className="text-3xl font-black text-foreground">
                    {selectedVariant
                      ? (selectedVariant.price / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "---"}
                  </p>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || isLoading}
                  className="w-full sm:w-auto h-12 px-8 text-base font-bold shadow-lg transition-transform active:scale-95 bg-cyan-500 text-black hover:bg-cyan-400"
                >
                  <RiShoppingCart2Line className="mr-2 h-5 w-5" />
                  {isLoading ? "ADICIONANDO..." : "ADICIONAR AO CARRINHO"}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                <RiTimeLine className="h-3.5 w-3.5" />
                <span>Entrega automática imediata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
